import React, { useEffect, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { AlertThresholds, Notification } from '../../types';

interface AlertSystemProps {
    temperature: number;
    humidity: number;
    thresholds: AlertThresholds;
}

const AlertSystem: React.FC<AlertSystemProps> = ({
    temperature,
    humidity,
    thresholds
}) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isEnabled, setIsEnabled] = useState<boolean>(true);

    useEffect(() => {
        if (!isEnabled) return;

        const newNotifications: Notification[] = [];

        if (temperature > thresholds.temperature.max) {
            newNotifications.push({
                id: 'temp-high',
                status: 'warning',
                title: 'Temperatura Alta',
                message: `A temperatura atual (${temperature}°C) está acima do limite recomendado.`,
                timestamp: new Date()
            });
        } else if (temperature < thresholds.temperature.min) {
            newNotifications.push({
                id: 'temp-low',
                status: 'warning',
                title: 'Temperatura Baixa',
                message: `A temperatura atual (${temperature}°C) está abaixo do limite recomendado.`,
                timestamp: new Date()
            });
        }

        if (humidity > thresholds.humidity.max) {
            newNotifications.push({
                id: 'humid-high',
                status: 'warning',
                title: 'Umidade Alta',
                message: `A umidade atual (${humidity}%) está acima do limite recomendado.`,
                timestamp: new Date()
            });
        } else if (humidity < thresholds.humidity.min) {
            newNotifications.push({
                id: 'humid-low',
                status: 'warning',
                title: 'Umidade Baixa',
                message: `A umidade atual (${humidity}%) está abaixo do limite recomendado.`,
                timestamp: new Date()
            });
        }

        setNotifications(newNotifications);
    }, [temperature, humidity, thresholds, isEnabled]);

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium dark:text-gray-300">Notificações</h3>
                <button
                    onClick={() => setIsEnabled(!isEnabled)}
                    className="p-2 rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    {isEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                </button>
            </div>

            <div className="space-y-2">
                {notifications.map(notification => (
                    <div key={notification.id} className="relative">
                        <button
                            onClick={() => deleteNotification(notification.id)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            ×
                        </button>
                        <Alert variant={notification.status}>
                            <AlertTitle>{notification.title}</AlertTitle>
                            <AlertDescription>
                                {notification.message}
                                <div className="text-sm text-gray-500 mt-1">
                                    {notification.timestamp.toLocaleTimeString()}
                                </div>
                            </AlertDescription>
                        </Alert>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlertSystem;