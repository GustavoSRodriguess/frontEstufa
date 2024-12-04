from typing import Dict, Any
from datetime import datetime, timedelta

class FirebaseService:
    def __init__(self):
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
                    "temperature": 68,
                    "humidity": 50,
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

    def get_latest_data(self, roaster_id: str) -> Dict[str, Any]:
        # Mock data
        if roaster_id in self.mock_data:
            return self.mock_data[roaster_id]["current"]
            
        # Firebase implementation (comentado)
        """
        return self.ref.child(f'roasters/{roaster_id}/current').get()
        """
        
        return None

    def get_historical_data(self, roaster_id: str, limit: int = 100):
        # Mock data
        if roaster_id in self.mock_data:
            history = self.mock_data[roaster_id]["history"]
            return dict(list(history.items())[:limit])
            
        # Firebase implementation (comentado)
        """
        return self.ref.child(f'roasters/{roaster_id}/history').limit_to_last(limit).get()
        """
        
        return None