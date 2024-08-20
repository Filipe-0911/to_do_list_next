import TaskController from "@/app/lib/TaskController";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import React from "react";

export default async function TaskField() {
  const session = await getServerSession();

  function addTask(taskTitle: string) {
    const task: Task = {id: 0, title: taskTitle, userId: session?.user?.email!, status: "pending"};
    TaskController.createUserTask(session?.user?.email as string, task);
  }

  return (
    <div className="mx-auto w-2/4 my-3 p-5 flex flex-row gap-2 rounded bg-yellow-100 shadow-xl">
      <input
        className="flex-1 border-2 border-blue-500 rounded p-2 text-black"
        type="text"
        placeholder="Nova tarefa"
  
      />
      <button
        className="bg-blue-500 rounded p-2 text-white"

      >
        Adicionar
      </button>
    </div>
  );
}
