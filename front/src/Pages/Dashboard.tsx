import StatusCard from '../components/dashboard/StatusCard';
import TemperatureChart from '../components/dashboard/TemperatureChart';
import RoasterSelector from '../components/dashboard/RoasterSelector';
import AlertSystem from '../components/dashboard/AlertSystem';
import { DashboardProps } from '../types';
import Navbar from '../components/ui/Navbar';

const roasters = [
  { id: '1', name: 'Estufa 01', status: 'active' as const },
  { id: '2', name: 'Estufa 02', status: 'inactive' as const },
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
  error,
  selectedRoaster,
  onRoasterChange,
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

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <RoasterSelector
          roasters={roasters}
          selectedRoaster={selectedRoaster}
          onSelect={onRoasterChange}
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