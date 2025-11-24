import React from 'react'
import { fetchTasks, editTask, deleteTask } from '@/lib/APIs/tasksAPI'
import { useEffect, useState } from 'react'
import TaskCard from '@/components/ui/taskCard'

const Important = () => {
  const [importantTasks, setImportantTasks] = useState([]);

  // load Important tasks on mount
  useEffect(()=> {
    const loadTasks = async() =>{
      try {
        const data = await fetchTasks()
        console.log('All tasks:', data.data);
        console.log('First task:', data.data[0]);
        const important = data.data.filter((task) => task.importance === true);
        console.log('Important tasks:', important)
        setImportantTasks(important);
      } catch (error) {
        console.error('Unable to fetch Important tasks', error)
      }
    };
    loadTasks();
  },[])

  const refreshTasks = async () => {
    try {
      const data = await fetchTasks();
      const important = data.data.filter((task) => task.importance === true );
      setImportantTasks(Important);
    } catch (error) {
      console.error('Unable to refresh Important tasks', error);
    }
  };

  return (
    <div>
      <h1 className='flex justify-center mb-6 text-bold text-2xl'>Important Tasks</h1>
      <div className="space-y-4 px-4">
        {importantTasks.length > 0 ? (
          importantTasks.map((task) => (
            <TaskCard 
              key={task._id}
              task={task}
              refresh={refreshTasks}
            />
          ))
        ) : (
          <p className='text-gray-500 text-center mt-10'>No Important tasks yet</p>
        )}
      </div>
    </div>
  )
}

export default Important
