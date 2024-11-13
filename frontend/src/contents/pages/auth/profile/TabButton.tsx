import React, { useState } from "react";
import { Badge } from "../../../../components/common/BadgeComponent";

const TabButton: React.FC<{
    label: string;
    value: 'products' | 'favorites' | 'settings';
    icon: React.ReactNode;
    count?: number;
    activeTab: 'products' | 'favorites' | 'settings';
    setActiveTab: (value: 'products' | 'favorites' | 'settings') => void;
}> = ({ label, value, icon, count, activeTab, setActiveTab  }) => {

    return (
        <button
            onClick={() => setActiveTab(value)}
            className={`
                flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
                transition-colors relative
                ${activeTab === value
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }
            `}
        >
            {icon}
            {label}
            {count !== undefined && (
                <Badge variant="secondary" className="ml-2">
                    {count}
                </Badge>
            )}
        </button>
    );
};

export default TabButton;