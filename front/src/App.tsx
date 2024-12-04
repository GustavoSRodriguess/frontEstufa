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
    const [selectedRoaster, setSelectedRoaster] = useState('1');
    const [tempData, setTempData] = useState<TempData>({
        temperature: 70,
        humidity: 65,
        status: {
            status: 'ideal',
            message: 'Condições ideais para o café'
        }
    });
    const [historyData, setHistoryData] = useState<HistoryDataPoint[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRoasterData(selectedRoaster);

                // No App.tsx ou onde você está processando os dados
                setTempData({
                    temperature: data.current.temperature,
                    humidity: data.current.humidity,
                    status: {
                        status: 'ideal', // Como quality > 70, devemos mostrar ideal
                        message: data.analysis.recommendations[0] ||
                            'Condições ideais para o café' // Mensagem padrão se não houver recomendações
                    }
                });
                console.log("Dados recebidos:", data);

                const historyArray = Object.entries(data.history).map(([time, value]: [string, any]) => ({
                    time: new Date(time).toLocaleTimeString(),
                    temperature: value.temperature,
                    humidity: value.humidity
                }));

                setHistoryData(historyArray);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchData();
    }, [selectedRoaster]);

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
                                        selectedRoaster={selectedRoaster}
                                        setSelectedRoaster={setSelectedRoaster}
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