import StatusCard from '../components/status/StatusCard';
import TemperatureChart from '../components/charts/TemperatureChart';
import RoasterSelector from '../components/roasters/RoasterSelector';
import AlertSystem from '../components/alertsystem/AlertSystem';
import { DashboardProps } from '../types';
import Navbar from '../components/navbar/Navbar';

const roasters = [
  { id: '1', name: 'Estufa 01', status: 'active' as const },
  { id: '2', name: 'Estufa 02', status: 'active' as const },
  { id: '3', name: 'Estufa 03', status: 'inactive' as const },
];

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

const Dashboard: React.FC<DashboardProps> = ({
  selectedRoaster,
  setSelectedRoaster,
  tempData,
  historyData
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Monitoramento do Café
        </h1>

        <RoasterSelector
          roasters={roasters}
          selectedRoaster={selectedRoaster}
          onSelect={setSelectedRoaster}
        />

        <div className="space-y-6">
          
          <AlertSystem
            temperature={tempData.temperature}
            humidity={tempData.humidity}
            thresholds={defaultThresholds}
          />

          <StatusCard
            temperature={tempData.temperature}
            humidity={tempData.humidity}
            status={tempData.status}
          />

          <TemperatureChart data={historyData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;