import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URI,
    withCredentials: true
});

// create task
export const createTask = async (taskData) => {
    const res = await api.post("/api/tasks", taskData)
    return res.data
}

// get all tasks
export const fetchTasks = async () => {
    const res = await api.get("/api/tasks")
    return res.data
}

// get tasks by project
export const fetchTasksByProject = async (projectId) => {
    const res = await api.get(`/api/tasks/project/${projectId}`)
    return res.data
}

//get one task
export const fetchTask = async(taskId) => {
    const res = await api.get(`/api/task/${taskId}`)
}
// edit task
export const editTask = async (taskId, updateData) => {
    const res = await api.put(`/api/tasks/${taskId}`, updateData)
    return res.data
}

// delete task
export const deleteTask = async (taskId) =>{
    const res = await api.delete(`api/tasks/${taskId}`)
    return res.data
}