from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .services.firebase_service import FirebaseService
from .services.fuzzy import CoffeeFuzzySystem
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

firebase = FirebaseService()
fuzzy_system = CoffeeFuzzySystem()

@app.get("/analyze")
async def analyze_data():
    try:
        logger.info("Iniciando análise dos dados")
        
        current_data = firebase.get_latest_data()
        
        historical_data = firebase.get_historical_data()
        
        try:
            analysis = fuzzy_system.analyze(
                temp=current_data['temperature'],
                humid=current_data['humidity']
            )
        except Exception as e:
            logger.error(f"Erro na análise fuzzy: {str(e)}")
            analysis = {
                "quality": 0,
                "risk": 100,
                "recommendations": ["Erro ao processar análise"]
            }
        
        return {
            "current": current_data,
            "analysis": analysis,
            "history": historical_data
        }
        
    except Exception as e:
        logger.error(f"Erro geral: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "ok"}