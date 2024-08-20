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
    const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
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
    const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
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
    const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
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
    <ul className={`flex flex-col items-center list-none w-9/12 min-h-36 ${bgColor} `}>
      <h4 className='text-2xl'>
        {status}
      </h4>
      {listOfTasks.map((task) => (
        <li key={task.id} className='flex items-center justify-between bg-slate-900 w-3/5 p-2'>
          {task.title}
          <section className='flex items-center'>
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
