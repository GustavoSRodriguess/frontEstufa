from datetime import datetime, timedelta
import json

class FirebaseService:
    def __init__(self):
        # Removendo a inicialização do Firebase por enquanto
        print("Iniciando serviço com dados mockados")
        self.mock_data = {
            "1": {
                "current": {
                    "temperature": 72,
                    "humidity": 45,
                    "timestamp": datetime.now().isoformat()
                },
                "history": self._generate_mock_history()
            },
            "2": {
                "current": {
                    "temperature": 20,
                    "humidity": 200,
                    "timestamp": datetime.now().isoformat()
                },
                "history": self._generate_mock_history(base_temp=68)
            }
        }
        # Comentar mock e descomentar Firebase quando for usar
        """
        cred = credentials.Certificate("path/to/serviceAccountKey.json")
        firebase_admin.initialize_app(cred, {
            'databaseURL': 'your-database-url'
        })
        self.ref = db.reference('/')
        """

    def _generate_mock_history(self, base_temp=72, points=100):
        history = {}
        now = datetime.now()
        
        for i in range(points):
            time = (now - timedelta(minutes=5*i)).isoformat()
            history[time] = {
                "temperature": base_temp + ((i % 10) - 5),
                "humidity": 45 + ((i % 10) - 5),
                "timestamp": time
            }
        
        return history

    def get_latest_data(self, roaster_id: str):
        print(f"Buscando dados para roaster {roaster_id}")
        return self.mock_data.get(roaster_id, {}).get("current")

    # Firebase implementation (comentado)
    """
    return self.ref.child(f'roasters/{roaster_id}/current').get()
    """
    
    def get_historical_data(self, roaster_id: str, limit: int = 100):
        print(f"Buscando histórico para roaster {roaster_id}")
        history = self.mock_data.get(roaster_id, {}).get("history", {})
        return dict(list(history.items())[:limit])
    # Firebase implementation (comentado)
    """
    return self.ref.child(f'roasters/{roaster_id}/history').limit_to_last(limit).get()
    """