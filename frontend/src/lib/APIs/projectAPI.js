import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URI,
    withCredentials: true
});

// create project
export const createProject = async (projectData) => {
    const res = await api.post("/api/projects", projectData)
    return res.data
}

// default project
export const defaultProject = async () => {
    const res = await api.post("/api/projects/default")
    return res.data
}

// get all projects
export const fetchProjects = async () => {
    const res = await api.get("/api/projects")
    return res.data
}

//get one project
export const fetchProject = async(projectId) => {
    const res = await api.get(`/api/project/${projectId}`)
}
// edit project
export const editProject = async (projectId, updateData) => {
    const res = await api.put(`/api/projects/${projectId}`, updateData)
    return res.data
}

// delete project
export const deleteProject = async (projectId) =>{
    const res = await api.delete(`api/projects/${projectId}`)
    return res.data
}