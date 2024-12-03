import React from 'react';
import { ThermometerSun, AlertTriangle, CheckCircle } from 'lucide-react';
import { StatusCardProps } from '../../types';

const StatusCard: React.FC<StatusCardProps> = ({
    temperature,
    humidity,
    status
}) => {
    const getTemperatureColor = (temp: number): string => {
        if (temp < 65) return 'text-blue-500';
        if (temp > 75) return 'text-red-500';
        return 'text-green-500';
    };

    return (
        <div className="card-temperature">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Status Atual</h2>
                <ThermometerSun className="w-5 h-5 text-gray-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Temperatura */}
                <div className="metric-card">
                    <span className="metric-label">Temperatura</span>
                    <span className={`metric-value ${getTemperatureColor(temperature)}`}>
                        {temperature}°C
                    </span>
                </div>

                {/* Umidade */}
                <div className="metric-card">
                    <span className="metric-label">Umidade</span>
                    <span className="metric-value text-blue-500">
                        {humidity}%
                    </span>
                </div>

                {/* Status */}
                <div className="metric-card">
                    <span className="metric-label">Status</span>
                    <div className="flex items-center gap-2">
                        {status.status === 'ideal' ? (
                            <>
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="status-badge status-badge-ideal">
                                    {status.message}
                                </span>
                            </>
                        ) : (
                            <>
                                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                                <span className={`status-badge ${status.status === 'critical'
                                        ? 'status-badge-critical'
                                        : 'status-badge-warning'
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