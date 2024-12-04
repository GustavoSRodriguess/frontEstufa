export const getStatusDisplay = (temp: number, humidity: number) => {
    if (temp < 65 || temp > 75 || humidity < 30 || humidity > 70) {
        return {
            status: 'warning',
            message: temp < 65 ? 'Aumentar temperatura' :
                temp > 75 ? 'Reduzir temperatura' :
                    humidity < 30 ? 'Aumentar umidade' : 'Reduzir umidade'
        };
    }
    return {
        status: 'ideal',
        message: 'Condições ideais para o café'
    };
};