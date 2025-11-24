import React from 'react'
import { fetchTasks, editTask, deleteTask } from '@/lib/APIs/tasksAPI'
import { useEffect, useState } from 'react'
import TaskCard from '@/components/ui/taskCard'

const Completed = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  // load completed tasks on mount
  useEffect(()=> {
    const loadTasks = async() =>{
      try {
        const data = await fetchTasks()
        console.log('All tasks:', data.data);
        console.log('First task:', data.data[0]);
        const completed = data.data.filter((task) => task.status === 'Completed');
        console.log('Completed tasks:', completed)
        setCompletedTasks(completed);
      } catch (error) {
        console.error('Unable to fetch completed tasks', error)
      }
    };
    loadTasks();
  },[])

  const refreshTasks = async () => {
    try {
      const data = await fetchTasks();
      const completed = data.data.filter((task) => task.status === 'completed');
      setCompletedTasks(completed);
    } catch (error) {
      console.error('Unable to refresh completed tasks', error);
    }
  };

  return (
    <div>
      <h1 className='flex justify-center mb-6 text-bold text-2xl'>Completed Tasks</h1>
      <div className="space-y-4 px-4">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <TaskCard 
              key={task._id}
              task={task}
              refresh={refreshTasks}
            />
          ))
        ) : (
          <p className='text-gray-500 text-center mt-10'>No completed tasks yet</p>
        )}
      </div>
    </div>
  )
}

export default Completed
