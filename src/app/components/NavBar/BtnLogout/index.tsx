import React from 'react'

interface BtnLogoutProps {
    onClick: () => void;
}

export default function BtnLogout({ onClick }: BtnLogoutProps) {
    return (
        <button onClick={() => onClick()} className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
            Logout
        </button>
    )
}
