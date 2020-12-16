import * as axios from "axios/index";

export const authAPI = {
    loginUser(data) {
        let form = new FormData();
        form.append("username", data.username);
        form.append("password", data.password);
        return axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=admin`, form, {headers: {'Content-Type': 'multipart/form-data'}})
    }
}

export const tasksAPI = {
    getTasks(currentPage, sortDirection, sort_field) {
        return axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=admin&page=${currentPage}&sort_direction=${sortDirection}&sort_field=${sort_field}`);
    },
    addTask(data) {
        let form = new FormData();
        form.append("username", data.username);
        form.append("email", data.email);
        form.append("text", data.text);
        form.append("status", data.status);
        return axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=admin`, form, {headers: {'Content-Type': 'multipart/form-data'}});
    },
    editTask(data) {
        let status = data.status ? 10 : 0;
        let form = new FormData();
        form.append("status", status);
        form.append("text", data.text);
        form.append("token", localStorage.getItem('token'));
        return axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${data.id}?developer=admin`, form, {headers: {'Content-Type': "application/json"}});
    }
}



