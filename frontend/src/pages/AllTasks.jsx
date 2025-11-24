import React from 'react'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import { deleteTask, editTask, fetchTask, fetchTasks, } from '@/lib/APIs/tasksAPI'
import { defaultProject } from '@/lib/APIs/projectAPI'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import TaskModal from '@/components/ui/taskModal'
import TaskCard from '@/components/ui/taskCard'
import { useEffect, useState} from 'react'
import ProjectModal from '@/components/ui/projectModal'

const AllTasks = () => {

  const [taskList, setTaskList] = useState([]);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);

  // get all tasks from backend on mount
  useEffect(() => {
    const loadTasks = async () =>{
      try {
        // Ensure default project exists
        await defaultProject();
        
        const tasks = await fetchTasks();
        setTaskList(tasks.data);
      } catch (error) {
        console.error('Unable to fetch tasks', error)
      }

    }
    loadTasks();

    // listen for clicks in the sidebar button
    const taskListener = () => setOpenTaskModal(true);
    const projectListener = () => setOpenProjectModal(true);
    window.addEventListener("openAddTaskModal", taskListener);
    window.addEventListener("openAddProjectModal", projectListener);

    return () => {
      window.removeEventListener("openAddTaskModal", taskListener);
      window.removeEventListener("openAddProjectModal", projectListener);
    };
  }, [])

  // add new task to the list
  const handleSave = (newTask) => {
    setTaskList((prev) => [...prev, newTask]);
  };

  const refreshTasks = async () => {
    try {
      const tasks = await fetchTasks();
      setTaskList(tasks.data);
    } catch (error) {
      console.error('Unable to refresh tasks', error);
    }
  };

  return (
    <> 
    <h1 className='flex justify-center mb-6 text-bold text-2xl'>All Tasks</h1>
      <div>
        {/* Task list */}
      <div className="space-y-4 px-4">
        {taskList.length > 0 ? (
          taskList.map((task) => (
            <TaskCard 
              key={task._id}
              task={task}
              refresh={refreshTasks}
            />
          ))
        ) : (
          <p className='text-gray-500 text-center mt-10'>No tasks yet</p>
        )}
      </div>
        
      </div>     
      <Dialog open={openTaskModal} onOpenChange={setOpenTaskModal}>
        <DialogContent className="w-full bg-white rounded-xl p-0">
          <TaskModal onClose={() => {
            setOpenTaskModal(false);
            refreshTasks();
          }} />
        </DialogContent>
      </Dialog>

      {/* open project modal */}
      <Dialog open={openProjectModal} onOpenChange={setOpenProjectModal}>
        <DialogContent className="w-full bg-white rounded-xl p-0">
          <ProjectModal onClose={() => {
            setOpenProjectModal(false);
          }} />
        </DialogContent>
      </Dialog>
    </>

  )
}

export default AllTasks
