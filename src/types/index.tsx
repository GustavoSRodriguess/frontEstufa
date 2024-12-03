// types/index.ts
export interface CoffeeStatus {
    status: 'ideal' | 'warning' | 'critical';
    message: string;
}

export interface StatusCardProps {
    temperature: number;
    humidity: number;
    status: CoffeeStatus;
}

export interface Roaster {
    id: string;
    name: string;
    status: 'active' | 'inactive';
}

export interface RoasterProps {
    roasters: Roaster[];
    selectedRoaster: string;
    onSelect: (id: string) => void;
}

export interface HistoryData {
    time: string;
    temperature: number;
    humidity: number;
}

export interface PropsHistory {
    data: HistoryData[];
    title?: string;
}

export interface AlertThresholds {
    temperature: {
        min: number;
        max: number;
    };
    humidity: {
        min: number;
        max: number;
    };
}

export interface Notification {
    id: number;
    status: CoffeeStatus['status']; // Usando status ao invés de type
    title: string;
    message: string;
    timestamp: Date;
}