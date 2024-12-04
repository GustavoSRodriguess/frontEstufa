import React from 'react';
import { RoasterProps } from '../../types'

const RoasterSelector: React.FC<RoasterProps> = ({ roasters, selectedRoaster, onSelect }) => {
    return (
        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
            {roasters.map((roaster) => (
                <button
                    key={roaster.id}
                    onClick={() => onSelect(roaster.id)}
                    className={`
                        px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors
                        ${selectedRoaster === roaster.id
                            ? 'bg-coffee-200 dark:bg-coffee-700 text-green-900 dark:text-green-400 border border-transparent'
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-coffee-600 dark:hover:border-coffee-500 text-gray-900 dark:text-gray-100'
                        }
                    `}
                >
                    <span className={`
                        w-2 h-2 rounded-full 
                        ${roaster.status === 'active'
                            ? 'bg-green-500 dark:bg-green-400'
                            : 'bg-gray-400 dark:bg-gray-600'
                        }
                    `} />
                    <span className={`
                        ${selectedRoaster === roaster.id
                            ? 'text-green-500 dark:text-green-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }
                    `}>
                        {roaster.name}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default RoasterSelector;