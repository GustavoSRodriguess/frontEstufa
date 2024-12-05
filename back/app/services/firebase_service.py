import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime, timedelta
import json
import os
from pathlib import Path
import random

class FirebaseService:
    def __init__(self):
        try:

            service_account_str = os.getenv('FIREBASE_SERVICE_ACCOUNT')

            if service_account_str:
                service_account = json.loads(service_account_str)
                cred = credentials.Certificate(service_account)
            else:
                base_path = Path(__file__).parent.parent.parent
                service_account_path = os.path.join(base_path, 'app', 'services', 'serviceAccountKey.json')
                if not os.path.exists(service_account_path):
                    raise FileNotFoundError(f"Arquivo de credenciais não encontrado em: {service_account_path}")
                cred = credentials.Certificate(service_account_path)            
            
            if not firebase_admin._apps:
                firebase_admin.initialize_app(cred, {
                    'databaseURL': 'https://estufa-iot-41176-default-rtdb.firebaseio.com/'
                })
            
            self.db = db.reference()
            print("Conexão com Firebase estabelecida com sucesso")
            
        except Exception as e:
            print(f"Erro na inicialização do Firebase: {str(e)}")
            raise e

    def _generate_fake_history(self, current_temp, current_humid, points=20):
        """Gera histórico fake baseado nos valores atuais"""
        history = {}
        now = datetime.now()
        
        # Variação máxima para temperatura e umidade
        temp_variation = 3
        humid_variation = 5
        
        for i in range(points):
            time = now - timedelta(minutes=5*(points-i))
            # Gera valores que convergem para os valores atuais
            progress = i / points  # 0 a 1
            base_temp = current_temp - (random.uniform(-temp_variation, temp_variation) * (1-progress))
            base_humid = current_humid - (random.uniform(-humid_variation, humid_variation) * (1-progress))
            
            history[time.isoformat()] = {
                "temperature": round(base_temp, 1),
                "humidity": round(base_humid, 1),
                "timestamp": time.isoformat()
            }
        
        return history

    def get_latest_data(self):
        try:
            machine_data = self.db.child('machine').get()
            
            if not machine_data:
                return {
                    "temperature": 0,
                    "humidity": 0,
                    "timestamp": datetime.now().isoformat()
                }
            
            current_data = {
                "temperature": float(machine_data.get('temperature', 0)),
                "humidity": float(machine_data.get('humidity', 0)),
                "timestamp": datetime.now().isoformat()
            }
            
            # Salvar no histórico
            self._save_to_history(current_data)
            
            return current_data
            
        except Exception as e:
            print(f"Erro ao ler dados: {str(e)}")
            return {
                "temperature": 0,
                "humidity": 0,
                "timestamp": datetime.now().isoformat(),
                "error": str(e)
            }

    def _save_to_history(self, data: dict):
        try:
            timestamp = datetime.now().isoformat()
            history_ref = self.db.child('history')
            history_ref.child(timestamp).set(data)
            
            # Limitar o histórico a 50 registros
            history = history_ref.get() or {}
            if len(history) > 50:
                sorted_times = sorted(history.keys())[:-50]
                for old_time in sorted_times:
                    history_ref.child(old_time).delete()
            
        except Exception as e:
            print(f"Erro ao salvar no histórico: {str(e)}")

    def get_historical_data(self, limit: int = 50):
        try:
            history = self.db.child('history').get() or {}
            current_data = self.get_latest_data()
            
            # Se não houver histórico suficiente, gera fake
            if len(history) < 20:
                fake_history = self._generate_fake_history(
                    current_data['temperature'],
                    current_data['humidity']
                )
                # Combina histórico real com fake, priorizando o real
                history = {**fake_history, **history}
            
            # Ordenar e limitar
            history_items = sorted(history.items(), key=lambda x: x[0])[-limit:]
            return dict(history_items)
            
        except Exception as e:
            print(f"Erro ao ler histórico: {str(e)}")
            return {}

    def debug_database_structure(self):
        try:
            data = self.db.get()
            return data
        except Exception as e:
            print(f"Erro no debug: {str(e)}")
            return {"error": str(e)}