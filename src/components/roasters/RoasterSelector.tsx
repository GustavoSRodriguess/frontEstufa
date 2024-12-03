import React from 'react';
import { RoasterProps } from '../../types'

const RoasterSelector: React.FC<RoasterProps> = ({ roasters, selectedRoaster, onSelect }) => {
    return (
        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
            {roasters.map((roaster) => (
                <button
                    key={roaster.id}
                    onClick={() => onSelect(roaster.id)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors
            ${selectedRoaster === roaster.id
                            ? 'bg-coffee-600 text-green-500'
                            : 'bg-white border hover:border-coffee-600'
                        }
          `}
                >
                    <span className={`w-2 h-2 rounded-full ${roaster.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                    <span>{roaster.name}</span>
                </button>
            ))}
        </div>
    );
};

export default RoasterSelector;