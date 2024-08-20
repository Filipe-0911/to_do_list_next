"use client";
import React from "react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface TaskFieldProps {
  setUserTasks: Dispatch<SetStateAction<Task[]>>;
  tasks: Array<Task>;
}

export default function TaskField({ setUserTasks, tasks }: TaskFieldProps): JSX.Element {

  const [taskValue, setTaskValue] = useState<string>("");

  const handleChanger = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskValue(e.target.value);
  }

  const submit = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      next: { tags: ["tasks"] },
      body: JSON.stringify({ title: taskValue }),
    });

    const json = await response.json();
    if (!json.error) {
      setUserTasks([
        ...tasks,
        json.task
      ])
    }
  }
  return (
    <div className="mx-auto w-2/4 my-3 p-5 flex flex-row gap-2 rounded bg-yellow-100 shadow-xl">
      <input
        className="flex-1 border-2 border-blue-500 rounded p-2 text-black"
        type="text"
        placeholder="Nova tarefa"
        onChange={e => handleChanger(e)}
      />
      <button
        className="bg-blue-500 rounded p-2 text-white"
        onClick={() => submit()}
      >
        Adicionar
      </button>
    </div>
  );
}
