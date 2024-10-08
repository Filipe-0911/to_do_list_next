"use client";
import React, { useEffect, useState } from 'react';
import BtnGreen from '../NavBar/BtnGreen';
import BtnRed from '../NavBar/BtnRed';
import BtnYellow from '../BtnYellow';

interface ListOfTasksProps {
  listOfTasks: Array<Task>;
  updateTaskStatus: (updateTaskId: number, newStatus: string) => void;
  deleteTaskFromState: (deleteTaskId: number) => void;
  status: string;
}

export default function ListOfTasks({ listOfTasks, status, updateTaskStatus, deleteTaskFromState }: ListOfTasksProps): JSX.Element {

  async function setTaskConcluded(task: Task) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, status: "concluded" }),
    });

    const data = await response.json();

    if (data.error) {
      console.log(data.error);
      return;
    }
    updateTaskStatus(task.id, "concluded")
  }

  async function deleteTask(task: Task): Promise<void> {
    console.log(task)
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tasks/${task.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (data.error) {
      console.log(data.error);
      return;
    }
    deleteTaskFromState(task.id)
  }

  async function startTask(task: Task): Promise<void> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, status: "in_progress" }),
    });

    const data = await response.json();

    if (data.error) {
      console.log(data.error);
      return;
    }
    updateTaskStatus(task.id, "in_progress")
  }
  const bgColor = status === "concluded" ? "bg-green-900" : status === "in_progress" ? "bg-yellow-600" : "bg-red-900";

  return (
    <ul className={`flex flex-col items-center list-none w-9/12 min-h-36 ${bgColor} my-5 py-5 rounded-lg`}>
      <h4 className='text-2xl text-wrap'>
        {status === "concluded" ? "Concluído" : status === "in_progress" ? "Em progresso" : "Pendentes"}
      </h4>
      {listOfTasks.map((task) => (
        <li key={task.id} className='flex items-center justify-between bg-slate-900 w-11/12 p-2 rounded-lg'>
          <p className='max-w-72'>{task.title}</p>
          <section className='flex items-center gap-4'>
            <BtnGreen onClick={() => setTaskConcluded(task)}>
              Concluir
            </BtnGreen>
            <BtnRed onClick={() => deleteTask(task)}>
              Remover
            </BtnRed>
            <BtnYellow onClick={() => startTask(task)}>
              Iniciar tarefa
            </BtnYellow>
          </section>
        </li>
      ))}
    </ul>
  )
}