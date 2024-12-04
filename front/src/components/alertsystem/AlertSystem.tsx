import React, { useEffect, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { AlertThresholds, Notification, CoffeeStatus } from '../../types';

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

        const checkThresholds = () => {
            if (temperature > thresholds.temperature.max) {
                addNotification('warning', 'Temperatura Alta',
                    `A temperatura atual (${temperature}°C) está acima do limite recomendado.`);
            }

            if (temperature < thresholds.temperature.min) {
                addNotification('warning', 'Temperatura Baixa',
                    `A temperatura atual (${temperature}°C) está abaixo do limite recomendado.`);
            }

            if (humidity > thresholds.humidity.max) {
                addNotification('warning', 'Umidade Alta',
                    `A umidade atual (${humidity}%) está acima do limite recomendado.`);
            }

            if (humidity < thresholds.humidity.min) {
                addNotification('warning', 'Umidade Baixa',
                    `A umidade atual (${humidity}%) está abaixo do limite recomendado.`);
            }
        };

        checkThresholds();
    }, [temperature, humidity, thresholds, isEnabled]);

    const addNotification = (
        status: CoffeeStatus['status'], 
        title: string,
        message: string
    ): void => {
        const newNotification: Notification = {
            id: Date.now(),
            status, 
            title,
            message,
            timestamp: new Date()
        };

        setNotifications(prev => [newNotification, ...prev].slice(0, 5));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Notificações</h3>
                <button
                    onClick={() => setIsEnabled(!isEnabled)}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    {isEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                </button>
            </div>

            <div className="space-y-2">
                {notifications.map(notification => (
                    <Alert key={notification.id} variant={notification.status}>
                        <AlertTitle>{notification.title}</AlertTitle>
                        <AlertDescription>
                            {notification.message}
                            <div className="text-sm text-gray-500 mt-1">
                                {notification.timestamp.toLocaleTimeString()}
                            </div>
                        </AlertDescription>
                    </Alert>
                ))}
            </div>
        </div>
    );
};

export default AlertSystem;