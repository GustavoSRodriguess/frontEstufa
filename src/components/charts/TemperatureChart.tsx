import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock } from 'lucide-react';
import { PropsHistory } from '../../types'

const TemperatureChart: React.FC<PropsHistory> = ({ data, title = "Histórico de Temperatura" }) => {
    return (
        <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <Clock className="w-5 h-5 text-gray-500" />
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis yAxisId="temp" />
                        <YAxis yAxisId="humid" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                            yAxisId="temp"
                            type="monotone"
                            dataKey="temperature"
                            stroke="#ef4444"
                            name="Temperatura (°C)"
                        />
                        <Line
                            yAxisId="humid"
                            type="monotone"
                            dataKey="humidity"
                            stroke="#3b82f6"
                            name="Umidade (%)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TemperatureChart;