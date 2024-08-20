"use client"
import React, { useEffect, useState } from 'react';
import TaskField from '../components/TaskField';
// import { headers } from 'next/headers';
import ListOfTasks from '../components/ListOfTasks';

async function getUserTasks() {
  const response = await fetch("http://localhost:3000/api/tasks")
  const data = await response.json();
  return data.tasks as Array<Task>;
}

export default function page() {
  const [userTasks, setUserTasks] = useState<Array<Task>>([])

  useEffect(() => {
    getUserTasks().then(response => setUserTasks(response));
  }, [])


  function deleteTaskFromState(deleteTaskId: number) {
    setUserTasks(userTasks.filter(task => task.id !== deleteTaskId));
  }

  function updateTaskStatus(updateTaskId: number, newStatus: string) {
    setUserTasks(userTasks.map(task => task.id === updateTaskId ? { ...task, status: newStatus } : task));
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-full min-w-full my-20">
      <TaskField setUserTasks={setUserTasks} tasks={userTasks} />
      {
        userTasks.length > 0 &&
        <>
          <ListOfTasks
            listOfTasks={userTasks.filter(task => task.status === "pending")}
            status="pending"
            updateTaskStatus={updateTaskStatus}
            deleteTaskFromState={deleteTaskFromState}
          />
          <ListOfTasks
            listOfTasks={userTasks.filter(task => task.status === "in_progress")}
            status="in_progress"
            updateTaskStatus={updateTaskStatus}
            deleteTaskFromState={deleteTaskFromState}
          />
          <ListOfTasks
            listOfTasks={userTasks.filter(task => task.status === "concluded")}
            status="concluded"
            updateTaskStatus={updateTaskStatus}
            deleteTaskFromState={deleteTaskFromState}
          />
        </>
      }
    </main>
  )
}
