import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

class CoffeeFuzzySystem:
    def __init__(self):
        # Universo de discurso
        self.temp_range = np.arange(0, 100, 1)
        self.humid_range = np.arange(0, 100, 1)
        
        # Antecedentes e Consequentes
        self.temperature = ctrl.Antecedent(self.temp_range, 'temperature')
        self.humidity = ctrl.Antecedent(self.humid_range, 'humidity')
        self.quality = ctrl.Consequent(np.arange(0, 100, 1), 'quality')
        
        # Funções de pertinência para temperatura
        self.temperature['cold'] = fuzz.trimf(self.temp_range, [0, 0, 65])
        self.temperature['ideal'] = fuzz.trimf(self.temp_range, [60, 70, 80])
        self.temperature['hot'] = fuzz.trimf(self.temp_range, [75, 100, 100])
        
        # Funções de pertinência para umidade
        self.humidity['low'] = fuzz.trimf(self.humid_range, [0, 0, 30])
        self.humidity['ideal'] = fuzz.trimf(self.humid_range, [25, 45, 65])
        self.humidity['high'] = fuzz.trimf(self.humid_range, [60, 100, 100])
        
        # Funções de pertinência para qualidade
        self.quality['poor'] = fuzz.trimf(self.quality.universe, [0, 0, 50])
        self.quality['average'] = fuzz.trimf(self.quality.universe, [30, 60, 90])
        self.quality['excellent'] = fuzz.trimf(self.quality.universe, [80, 100, 100])
        
        # Regras
        self.setup_rules()
        
    def setup_rules(self):
        rule1 = ctrl.Rule(
            self.temperature['ideal'] & self.humidity['ideal'],
            self.quality['excellent']
        )
        
        rule2 = ctrl.Rule(
            (self.temperature['hot'] | self.temperature['cold']) &
            self.humidity['ideal'],
            self.quality['average']
        )
        
        rule3 = ctrl.Rule(
            (self.temperature['hot'] | self.temperature['cold']) &
            (self.humidity['high'] | self.humidity['low']),
            self.quality['poor']
        )
        
        # Sistema de controle
        self.quality_ctrl = ctrl.ControlSystem([rule1, rule2, rule3])
        self.quality_simulator = ctrl.ControlSystemSimulation(self.quality_ctrl)
    
    def analyze(self, temp: float, humid: float) -> dict:
        self.quality_simulator.input['temperature'] = temp
        self.quality_simulator.input['humidity'] = humid
        
        try:
            self.quality_simulator.compute()
            quality_score = float(self.quality_simulator.output['quality'])
            
            # Cálculo do risco (inverso da qualidade)
            risk = 100 - quality_score
            
            # Gerar recomendações
            recommendations = []
            
            if temp > 75:
                recommendations.append("Reduzir temperatura")
            elif temp < 65:
                recommendations.append("Aumentar temperatura")
                
            if humid > 60:
                recommendations.append("Reduzir umidade")
            elif humid < 30:
                recommendations.append("Aumentar umidade")
            
            return {
                "quality": quality_score,
                "risk": risk,
                "recommendations": recommendations
            }
            
        except:
            return {
                "quality": 0,
                "risk": 100,
                "recommendations": ["Erro na análise dos dados"]
            }