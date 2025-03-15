import { TaskModal } from '@/app/components/task';
import '../src/app/globals.css';
import { useContext, useState } from 'react';
import { useAuth } from './AuthContext';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description for Task 1',
    dueDate: '2025-03-01',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description for Task 2',
    dueDate: '2025-03-02',
    status: 'Pending',
  },
];


export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const context = useAuth();
  
  const markAsCompleted = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'Completed' } : task
    ));
  };

  const handleOpenModal = (task: Task | null) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleSaveTask = (task: Task) => {
    if (currentTask) {
      // Edit existing task
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      // Create new task
      setTasks([...tasks, task]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard  {context.user}</h1>
        <button
          onClick={() => handleOpenModal(null)}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          New Task
        </button>
      </div>
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold">{task.title}</h2>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-gray-500">Due Date: {task.dueDate}</p>
                <p className={`text-sm ${task.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
                  Status: {task.status}
                </p>
              </div>
              {task.status === 'Pending' && (
                <button
                  onClick={() => markAsCompleted(task.id)}
                  className="mt-2 lg:mt-0 lg:ml-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <TaskModal task={currentTask} onClose={handleCloseModal} onSave={handleSaveTask} />
      )}
    </div>
  );
}