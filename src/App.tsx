import { useState } from 'react';
import StatusCard from './components/status/StatusCard';
import TemperatureChart from './components/charts/TemperatureChart';
import RoasterSelector from './components/roasters/RoasterSelector';
import { CoffeeStatus } from './types';
import AlertSystem from './components/alertsystem/AlertSystem';

interface TempData {
  temperature: number;
  humidity: number;
  status: CoffeeStatus;
}

interface Roaster {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

function App() {
  const [selectedRoaster, setSelectedRoaster] = useState('1');
  const [tempData] = useState<TempData>({
    temperature: 70,
    humidity: 65,
    status: {
      status: 'ideal',
      message: 'Condições ideais para o café'
    }
  });

  const [historyData] = useState([
    { time: '08:00', temperature: 65, humidity: 60 },
    { time: '09:00', temperature: 68, humidity: 62 },
    { time: '10:00', temperature: 70, humidity: 65 },
    { time: '11:00', temperature: 72, humidity: 63 },
    { time: '12:00', temperature: 71, humidity: 64 },
  ]);

  const [roasters] = useState<Roaster[]>([
    { id: '1', name: 'Estufa 01', status: 'active' },
    { id: '2', name: 'Estufa 02', status: 'active' },
    { id: '3', name: 'Estufa 03', status: 'inactive' },
  ]);

  const defaultThresholds = {
    temperature: {
      min: 65,
      max: 75
    },
    humidity: {
      min: 30,
      max: 70
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Monitoramento do Café</h1>
      
      <AlertSystem
        temperature={tempData.temperature}
        humidity={tempData.humidity}
        thresholds={defaultThresholds}
      />

      <RoasterSelector
        roasters={roasters}
        selectedRoaster={selectedRoaster}
        onSelect={setSelectedRoaster}
      />

      <div className="space-y-6">
        <StatusCard
          temperature={tempData.temperature}
          humidity={tempData.humidity}
          status={tempData.status}
        />

        <TemperatureChart data={historyData} />
      </div>
    </div>
  );
}

export default App;