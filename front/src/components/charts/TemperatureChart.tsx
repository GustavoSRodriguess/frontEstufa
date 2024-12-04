import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock } from 'lucide-react';
import { PropsHistory } from '../../types'
import { useTheme } from '../../contexts/ThemeContext';

const TemperatureChart: React.FC<PropsHistory> = ({ data, title = "Histórico de Temperatura" }) => {

    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
                <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={isDark ? '#374151' : '#e5e7eb'}
                        />
                        <XAxis
                            dataKey="time"
                            stroke={isDark ? '#9ca3af' : '#4b5563'}
                        />
                        <YAxis
                            yAxisId="temp"
                            stroke={isDark ? '#9ca3af' : '#4b5563'}
                        />
                        <YAxis
                            yAxisId="humid"
                            orientation="right"
                            stroke={isDark ? '#9ca3af' : '#4b5563'}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                color: isDark ? '#ffffff' : '#000000'
                            }}
                        />
                        <Legend />
                        <Line
                            yAxisId="temp"
                            type="monotone"
                            dataKey="temperature"
                            stroke={isDark ? '#f87171' : '#ef4444'}
                            name="Temperatura (°C)"
                        />
                        <Line
                            yAxisId="humid"
                            type="monotone"
                            dataKey="humidity"
                            stroke={isDark ? '#60a5fa' : '#3b82f6'}
                            name="Umidade (%)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TemperatureChart;