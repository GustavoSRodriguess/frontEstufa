from pydantic import BaseModel
from typing import List

class SensorData(BaseModel):
    temperature: float
    humidity: float

class AnalysisResponse(BaseModel):
    quality: float
    risk: float
    recommendations: List[str]
