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
    id: string;
    status: CoffeeStatus['status'];
    title: string;
    message: string;
    timestamp: Date;
}

export interface AnalysisResult {
    current: {
        temperature: number;
        humidity: number;
    };
    analysis: {
        quality: number;
        risk: number;
        recommendations: string[];
    };
    history: {
        [key: string]: {
            temperature: number;
            humidity: number;
            timestamp: string;
        };
    };
}

export interface RoasterStats {
    temperature: {
        avg: number;
        max: number;
        min: number;
    };
    humidity: {
        avg: number;
        max: number;
        min: number;
    };
}

export interface ApiError {
    error: string;
}

export interface TempData {
    temperature: number;
    humidity: number;
    status: CoffeeStatus;
}

export interface HistoryDataPoint {
    time: string;
    temperature: number;
    humidity: number;
}

export interface DashboardProps {
    selectedRoaster: string;
    setSelectedRoaster: (id: string) => void;
    tempData: TempData;
    historyData: HistoryDataPoint[];
}