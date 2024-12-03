// src/components/ui/alert.tsx
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface AlertProps {
    variant?: 'ideal' | 'warning' | 'critical';
    children: React.ReactNode;
    className?: string;
}

export const Alert: React.FC<AlertProps> = ({
    variant = 'ideal',
    children,
    className = ''
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'critical':
                return 'bg-red-50 border-red-200 text-red-800';
            case 'ideal':
                return 'bg-green-50 border-green-200 text-green-800';
            default:
                return 'bg-gray-50 border-gray-200 text-gray-800';
        }
    };

    const getIcon = () => {
        switch (variant) {
            case 'warning':
                return <AlertTriangle className="w-5 h-5" />;
            case 'critical':
                return <XCircle className="w-5 h-5" />;
            case 'ideal':
                return <CheckCircle className="w-5 h-5" />;
            default:
                return null;
        }
    };

    return (
        <div className={`flex gap-3 p-4 border rounded-lg ${getVariantStyles()} ${className}`}>
            {getIcon()}
            <div className="flex-1">{children}</div>
        </div>
    );
};

export const AlertTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h5 className="font-medium mb-1">{children}</h5>
);

export const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="text-sm opacity-90">{children}</div>
);

export default Alert;