import { TaskModal } from "@/app/components/task";
import "../src/app/globals.css";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  addTask,
  deleteTask,
  getTasks,
  updateUserTask,
} from "../service/apiService";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdDoneOutline } from "react-icons/md";

interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const context = useAuth();

  const getUserTasks = async () => {
    try {
      console.log("Token:", context.token);
      const res = await getTasks(context.token);
      console.log("Tasks:", res?.data);
      setTasks(res?.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      console.log("Updated task:", updatedTask);
      await updateUserTask(updatedTask, context.token);
      await getUserTasks();
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  const markAsCompleted = (updatedTask: Task) => {
    updateTask({ ...updatedTask, completed: true });
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, status: "Completed" } : task
      )
    );
  };

  const handleOpenModal = (task: Task | null) => {
    if (task) {
      task.dueDate = task.dueDate.split("T")[0];
    }
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleSaveTask = async (task: Task) => {
    try {
      await addTask(task, context.token, context.user);
      await getUserTasks();
    } catch (error) {
      console.log("Error saving task:", error);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId, context.token);
      await getUserTasks();
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  useEffect(() => {
    getUserTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{context.user}'s Dashboard </h1>
        <button
          onClick={() => handleOpenModal(null)}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          New Task
        </button>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold">{task.name}</h2>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-gray-500">
                  Due Date: {task.dueDate.split("T")[0]}
                </p>
                <p
                  className={`text-sm ${
                    task.completed === true ? "text-green-500" : "text-red-500"
                  }`}
                >
                  Status: {task.completed ? "Completed" : "Pending"}
                </p>
              </div>
              {!task.completed && (
                <>
                  <button
                    onClick={() => markAsCompleted(task)}
                    className="mt-2 lg:mt-2 lg:mt-2 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
                  >
                    <MdDoneOutline />
                  </button>
                  <button className="mt-2 lg:mt-0 lg:ml-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500">
                    <FaRegEdit onClick={() => handleOpenModal(task)} />
                  </button>
                  <button className="mt-2 lg:mt-0 lg:ml-4 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500">
                    <MdDelete onClick={() => handleDelete(task.id)} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <TaskModal
          task={currentTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}
