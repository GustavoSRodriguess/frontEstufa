import React from 'react';
import { ThermometerSun, AlertTriangle, CheckCircle } from 'lucide-react';
import { StatusCardProps } from '../../types';

const StatusCard: React.FC<StatusCardProps> = ({
    temperature,
    humidity,
    status
}) => {
    const getTemperatureColor = (temp: number): string => {
        if (temp < 65) return 'text-blue-500 dark:text-blue-400';
        if (temp > 75) return 'text-red-500 dark:text-red-400';
        return 'text-green-500 dark:text-green-400';
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Status Atual</h2>
                <ThermometerSun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <span className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Temperatura</span>
                    <span className={`text-2xl font-bold ${getTemperatureColor(temperature)}`}>
                        {temperature}°C
                    </span>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <span className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Umidade</span>
                    <span className="text-2xl font-bold text-blue-500 dark:text-blue-400">
                        {humidity}%
                    </span>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <span className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Status</span>
                    <div className="flex items-center gap-2">
                        {status.status === 'ideal' ? (
                            <>
                                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                                <span className="text-green-700 dark:text-green-300">
                                    {status.message}
                                </span>
                            </>
                        ) : (
                            <>
                                <AlertTriangle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                                <span className={`${status.status === 'critical'
                                        ? 'text-red-700 dark:text-red-300'
                                        : 'text-yellow-700 dark:text-yellow-300'
                                    }`}>
                                    {status.message}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusCard;