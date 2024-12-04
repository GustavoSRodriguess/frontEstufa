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
                return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300';
            case 'critical':
                return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300';
            case 'ideal':
                return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300';
            default:
                return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200';
        }
    };

    const getIconColor = () => {
        switch (variant) {
            case 'warning':
                return 'text-yellow-600 dark:text-yellow-400';
            case 'critical':
                return 'text-red-600 dark:text-red-400';
            case 'ideal':
                return 'text-green-600 dark:text-green-400';
            default:
                return 'text-gray-600 dark:text-gray-400';
        }
    };

    const getIcon = () => {
        const iconClassName = `w-5 h-5 ${getIconColor()}`;

        switch (variant) {
            case 'warning':
                return <AlertTriangle className={iconClassName} />;
            case 'critical':
                return <XCircle className={iconClassName} />;
            case 'ideal':
                return <CheckCircle className={iconClassName} />;
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
    <h5 className="font-medium mb-1 text-current">{children}</h5>
);

export const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="text-sm opacity-90 dark:opacity-80">{children}</div>
);

export default Alert;