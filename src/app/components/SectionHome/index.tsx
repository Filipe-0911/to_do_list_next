import TaskController from '@/app/lib/TaskController';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

export default async function SectionHome() {
    const session = await getServerSession();

    const numberOfTasks = TaskController.getUserTasks(session?.user?.email!).length;
    

    return (
        <div className="m-8 flex flex-col items-center justify-center">
            <h2 className="text-3xl text-gray-900 dark:text-white">
                Resumo de tarefas
            </h2>
            <section className='flex flex-col my-10'>
                {session && (
                    <>
                        <p>Olá, {session.user?.name}! Você tem { numberOfTasks } tarefa(s).</p>
                    </>
                )}
                {!session && (
                    <p className='text-red-600 text-2xl'>Você precisa estar logado!</p>
                )}
            </section>

        </div>
    )
}
