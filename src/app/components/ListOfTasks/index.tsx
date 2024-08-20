"use client";
import React, { useEffect, useState } from 'react';
import BtnGreen from '../NavBar/BtnGreen';
import BtnRed from '../NavBar/BtnRed';

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
  
  return (
    <ul className={`list-none w-full flex-col items-center justify-center ${status === "concluded" ? "bg-green-900" : status === "in_progress" ? "bg-yellow-600" : "bg-red-900"}`}>
      {listOfTasks.map((task) => (
        <li key={task.id}>
          {task.title}
          <BtnGreen onClick={() => setTaskConcluded(task)}>
            Concluir
          </BtnGreen>
          <BtnRed onClick={() => deleteTask(task)}>
            Remover
          </BtnRed>
        </li>
      ))}
    </ul>
  )
}
