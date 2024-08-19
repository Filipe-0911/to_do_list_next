import React from 'react'

interface BtnLoginProps {
    onClick: () => void;
}

export default function BtnLogin({ onClick }: BtnLoginProps) {
    return (
        <button onClick={() => onClick()} className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
            Login
        </button>
    )
}
