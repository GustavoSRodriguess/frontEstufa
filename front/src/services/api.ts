const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ApiResponse {
    current: {
        temperature: number;
        humidity: number;
    };
    analysis: {
        quality: number;
        risk: number;
        recommendations: string[];
    };
    history: {
        [key: string]: {
            temperature: number;
            humidity: number;
            timestamp: string;
        };
    };
}

export const getRoasterData = async (roasterId: string): Promise<ApiResponse> => {
    try {
        console.log('Fazendo requisição para:', `${API_URL}/analyze`);
        const response = await fetch(`${API_URL}/analyze`);

        if (!response.ok) {
            console.log('Resposta não ok:', await response.text());
            throw new Error('Falha ao buscar dados');
        }

        const data = await response.json();
        console.log('Dados recebidos da API:', data);
        return data;
    } catch (error) {
        console.error(error);
        return {
            current: {
                temperature: 70,
                humidity: 65
            },
            analysis: {
                quality: 85,
                risk: 15,
                recommendations: ["Dados mockados - API indisponível"]
            },
            history: {
                [new Date().toISOString()]: {
                    temperature: 70,
                    humidity: 65,
                    timestamp: new Date().toISOString()
                }
            }
        };
    }
};

// Função para buscar estatísticas
export const getRoasterStats = async (roasterId: string) => {
    try {
        const response = await fetch(`${API_URL}/roasters/${roasterId}/stats`);
        if (!response.ok) {
            throw new Error('Falha ao buscar estatísticas');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        return null;
    }
};