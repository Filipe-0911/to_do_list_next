import React from 'react';

interface BtnYellowProps {
    onClick: () => void;
    children: React.ReactNode;
}

export default function BtnYellow({ onClick, children }: BtnYellowProps): React.ReactNode {
    return (
        <button type="button" onClick={() => onClick()} className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            {children}
        </button>
    )
}
