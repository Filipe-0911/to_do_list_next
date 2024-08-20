"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

export default function SectionHome() {
    const { data: session } = useSession();
    const [numberOfTasks, setNumberOfTasks] = useState<number>(0);

    async function getUserTasks() {
        const response = await fetch('https://task-manager-pearl-one.vercel.app/tasks')
        const data = await response.json()
        return data.tasks as Array<Task>
    }

    useEffect(() => {
        getUserTasks().then(response => setNumberOfTasks(response.length))
    }, [])
    

    return (
        <div className="m-8 flex flex-col items-center justify-center">
            <h2 className="text-3xl text-gray-900 dark:text-white">
                Resumo de tarefas
            </h2>
            <section className='flex flex-col my-10'>
                {session && (
                    <>
                        <p>Olá, {session?.user?.name}! Você tem { numberOfTasks } tarefa(s).</p>


                    </>
                )}
                {!session && (
                    <p className='text-red-600 text-2xl'>Você precisa estar logado!</p>
                )}
            </section>

        </div>
    )
}
