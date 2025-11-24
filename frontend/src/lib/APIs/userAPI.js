import axios from 'axios';

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URI,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// create user/signup
export const createUser = async(userData) => {
    const response = await api.post('/api/users/signup', userData)
    return response.data
}

// signin user
export const loginUser = async(userData) => {
    const response = await api.post('/api/users/signin', userData)
    return response.data
}

// get all users
export const getUsers = async() => {
    const response = await api.get('/api/users')
    return response.data
}

// reset password
export const resetPassword = async(userData) => {
    const response = await api.post('/api/users/reset-password', userData)
    return response.data
}

//get one user
export const getUser = async(userId) => {
    const response = await api.get(`/api/users/${userId}`)
    return response.data
}


//edit user
export const editUser = async(userId, updateData) => {
    const response = await api.put(`/api/users/${userId}`, updateData)
    return response.data
}

//delete user
export const deleteUser = async(userId) => {
    const response = await api.delete(`/api/users/${userId}`)
    return response.data
}

 