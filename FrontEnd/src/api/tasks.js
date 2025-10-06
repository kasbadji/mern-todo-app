
import api from './axios'; 

export const getTasks = () => api.get('/tasks');
export const addTask = (title) => api.post('/tasks', { title });
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
export const toggleTask = (id, completed) => api.put(`/tasks/${id}`, { completed });
export const updateTask = (id, payload) => api.put(`/tasks/${id}`, payload);
