from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .services.fuzzy import CoffeeFuzzySystem
from .services.firebase_service import FirebaseService
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

origins = [
    "http://localhost:5173",  
    "http://localhost:3000",  
    "https://front-estufa-pac.vercel.app",  
    "*"
]

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicialização dos serviços
firebase = FirebaseService()
fuzzy_system = CoffeeFuzzySystem()

@app.get("/analyze/{roaster_id}")
async def analyze_roaster(roaster_id: str):
    try:
        logger.info(f"Recebida requisição para roaster {roaster_id}")
        
        current_data = firebase.get_latest_data(roaster_id)
        if not current_data:
            logger.warning(f"Dados não encontrados para roaster {roaster_id}")
            raise HTTPException(status_code=404, detail="Roaster não encontrado")

        logger.info(f"Dados atuais: {current_data}")
        
        historical_data = firebase.get_historical_data(roaster_id)
        
        # Análise Fuzzy
        analysis = fuzzy_system.analyze(
            temp=current_data['temperature'],
            humid=current_data['humidity']
        )
        
        logger.info(f"Análise concluída: {analysis}")
        
        return {
            "current": current_data,
            "analysis": analysis,
            "history": historical_data
        }
        
    except Exception as e:
        logger.error(f"Erro ao processar requisição: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "ok"}