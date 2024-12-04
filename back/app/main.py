# backend/app/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .services.fuzzy import CoffeeFuzzySystem
from .services.firebase_service import FirebaseService
from .models.schemas import AnalysisResponse

app = FastAPI(title="Coffee Monitoring API")

# Configuração do CORS
origins = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",  # Caso use outra porta
    # Adicionar seu domínio de produção quando necessário
]

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

@app.get("/analyze/{roaster_id}", response_model=AnalysisResponse)
async def analyze_roaster(roaster_id: str):
    current_data = firebase.get_latest_data(roaster_id)
    historical_data = firebase.get_historical_data(roaster_id)
    
    if not current_data:
        raise HTTPException(status_code=404, detail="Dados não encontrados para esta estufa")
    
    analysis = fuzzy_system.analyze(
        temp=current_data['temperature'],
        humid=current_data['humidity']
    )
    
    return {
        "current": current_data,
        "analysis": analysis,
        "history": historical_data
    }

@app.get("/roasters/{roaster_id}/stats")
async def get_roaster_stats(roaster_id: str):
    historical_data = firebase.get_historical_data(roaster_id)
    
    if not historical_data:
        raise HTTPException(status_code=404, detail="Dados históricos não encontrados")
    
    # Converter o dicionário em lista de valores
    data_list = list(historical_data.values())
    temps = [data['temperature'] for data in data_list]
    humids = [data['humidity'] for data in data_list]
    
    return {
        "temperature": {
            "avg": sum(temps) / len(temps),
            "max": max(temps),
            "min": min(temps)
        },
        "humidity": {
            "avg": sum(humids) / len(humids),
            "max": max(humids),
            "min": min(humids)
        }
    }

# Rota de healthcheck
@app.get("/health")
async def health_check():
    return {"status": "ok", "version": "1.0.0"}