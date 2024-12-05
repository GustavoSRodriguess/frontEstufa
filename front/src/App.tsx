import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { getRoasterData } from './services/api';
import LoginPage from './Pages/Login';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Dashboard from './Pages/Dashboard';
import { TempData, HistoryDataPoint } from './types';

function App() {
    const [error, setError] = useState<string | null>(null);
    const [selectedRoaster, setSelectedRoaster] = useState("1");
    const [tempData, setTempData] = useState<TempData>({
        temperature: 0,
        humidity: 0,
        status: {
            status: 'loading',
            message: 'Carregando dados...'
        }
    });
    const [historyData, setHistoryData] = useState<HistoryDataPoint[]>([]);

    const handleRoasterChange = (roasterId: string) => {
        if (roasterId !== "1") {
            setError("Sistema configurado apenas para uma máquina");
            setSelectedRoaster("1");
            return;
        }
        setError(null);
        setSelectedRoaster(roasterId);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRoasterData("1");

                setTempData({
                    temperature: data.current.temperature,
                    humidity: data.current.humidity,
                    status: {
                        status: data.analysis.quality > 70 ? 'ideal' : 'warning',
                        message: data.analysis.recommendations[0] || 'Condições ideais para o café'
                    }
                });

                const historyArray = Object.entries(data.history)
                    .map(([time, value]: [string, any]) => ({
                        time: new Date(time).toLocaleTimeString('pt-BR'),
                        temperature: value.temperature,
                        humidity: value.humidity
                    }))
                    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

                setHistoryData(historyArray);
            } catch (error) {
                setError("Erro ao carregar dados do sistema");
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 50000);
        return () => clearInterval(interval);
    }, []);

    return (
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard
                                        error={error}
                                        selectedRoaster={selectedRoaster}
                                        onRoasterChange={handleRoasterChange}
                                        tempData={tempData}
                                        historyData={historyData}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;