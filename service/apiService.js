import axios from 'axios';
import moment from 'moment';

const baseUrl = "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    maxRedirects: 3 
});

export const getTasks = async (token) => {
    try {
        const res = axios.get(baseUrl + "/api/tasks", {
            headers: {
                token
            }
        });
        return res;
    } catch (err) {
        console.log('error fetching tasks for user', err);
    }
}

export const addTask = async (task, token, user) => {
    try {
        const taskToSave = {
            id: task.id,
            name: task.name,
            description: task.description,
            createdAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
            dueDate: moment(task.dueDate).format('YYYY-MM-DDTHH:mm:ss'),
            isCompleted: false,
            username: user
        }
        const res = axios.post(baseUrl + "/api/tasks", taskToSave,{
            headers: {
                token
            }
        });
        return res;
    } catch (err) {
        console.log('error adding task', err);
    }
}

export const updateTask = async (task) => {
    try {
        const res = axios.put(baseUrl + "/api/tasks", task);
        return res;
    } catch (err) {
        console.log('error updating task', err);
    }
}

export const login = async (username, password, loginContext) => {
    const user = {
        username: username,
        password: password
    }
    console.log('user', user);
    try {
        const res = await axiosInstance.post(baseUrl + "/auth/login", user, {validateStatus: status => status >= 200 && status < 303});
        console.log('res', res.data);
        return res;
    } catch (err) {
        console.log('error logging in', err);
    }
}

export const signup = async (username, password) => {
    const user = {
        username: username,
        password: password
    }
    try {
        const res = axios.post(baseUrl + "/auth/signup", user);
        return res;
    } catch (err) {
        console.log('error signing up', err);
    }
}
