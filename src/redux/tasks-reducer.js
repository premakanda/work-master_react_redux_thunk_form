import REACT from 'react';
import {tasksAPI} from "../api/api";
const SET_VISIBLE = "SET_VISIBLE";
const SET_TASKS = "SET_TASKS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const GET_COUNT_TASKS = "GET_COUNT_TASKS"
const SAVE_TASKS_FOR_EDIT = "SAVE_TASKS_FOR_EDIT"
const SET_VISIBLE_EDIT_FORM = "SET_VISIBLE_EDIT_FORM"
const SET_SERVER_RESPONSE = "SET_SERVER_RESPONSE"
const SET_SORT_DIRECTION = "SET_SORT_DIRECTION"
const EDIT_TASKS = "EDIT_TASKS"
const ADMIN_EDITED_TASK = "ADMIN_EDITED_TASK"
const SET_TASKS_NEW = "SET_TASKS_NEW"


let stateInit = {
    visibleTaskEditForm: false,
    visibleTaskAddForm: false,
    tasks: [],
    pageSize: 3,
    totalUsersCount: 0,
    currentPage: 1,
    tasksForEdit: '',
    responseServer: '',
    sortDirection: '',
    sortedValue: '',
    portionSize: 5
}

const tasksReducer = (state = stateInit, action) => {
    switch (action.type) {
        case SET_VISIBLE:
            return {
                ...state,
                visibleTaskAddForm: action.tasksAddVisible
            }
        case SET_VISIBLE_EDIT_FORM:
            return {
                ...state,
                visibleTaskEditForm: action.tasksEditVisible
            }
        case SET_TASKS:
            return {
                ...state,
                tasks: action.tasks
            }
        case EDIT_TASKS:
            return {
                ...state,
                tasks: state.tasks.map(t => {
                    if (t.id === action.data.id) {
                        return {
                            ...t,
                            text: action.data.text,
                            status: action.data.status,
                            adminEditTask: action.data.adminEditTask
                        }
                    }
                    return t;
                })
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.CP
            }
        case GET_COUNT_TASKS:
            return {
                ...state,
                totalUsersCount: action.countTasks
            }
        case SAVE_TASKS_FOR_EDIT:
            return {
                ...state,
                tasksForEdit: action.dataForEdit,
            }
        case SET_SERVER_RESPONSE:
            return {
                ...state,
                responseServer: action.response,
            }
        case SET_SORT_DIRECTION:
            return {
                ...state,
                sortedValue: action.sortedValue
            }

        default:
            return state
    }
}

export const setVisibleFormTaskAdd = (tasksAddVisible) => ({type: SET_VISIBLE, tasksAddVisible})
export const setVisibleEditTask = (tasksEditVisible) => ({type: SET_VISIBLE_EDIT_FORM, tasksEditVisible})
export const editTaskDataActionCreater = (dataForEdit) => ({type: SAVE_TASKS_FOR_EDIT, dataForEdit})
export const setTasks = (tasks) => ({type: SET_TASKS, tasks})
export const editTasks = (data) => ({type: EDIT_TASKS, data})
export const setCurrentPage = (CP) => ({type: SET_CURRENT_PAGE, CP})
export const getCountTasks = (countTasks) => ({type: GET_COUNT_TASKS, countTasks})
export const setResponseServer = (response) => ({type: SET_SERVER_RESPONSE, response})
export const setSortDirection = ( sortedValue) => ({type: SET_SORT_DIRECTION, sortedValue})


export const getTasksThunk = (currentPage, sortDirection, sortedValue) => {
    return async (dispatch) => {
        localStorage.setItem('currentPagesSortedByValue' + currentPage, JSON.stringify(sortedValue));
        let currentPagesSortedByValue = JSON.parse(localStorage.getItem('currentPagesSortedByValue' + currentPage));
        localStorage.setItem('currentPagesSortDirectionValue' + currentPage, JSON.stringify(sortDirection));
        let currentPagesSortDirectionValue = JSON.parse(localStorage.getItem('currentPagesSortDirectionValue' + currentPage));
        localStorage.setItem('pages' + currentPage, JSON.stringify({currentPage, currentPagesSortDirectionValue, currentPagesSortedByValue}));
        let currentPagesSortedValues = JSON.parse(localStorage.getItem('pages' + currentPage));
        localStorage.setItem('currentPage', JSON.stringify(currentPagesSortedValues.currentPage));
        dispatch(setCurrentPage(currentPage));
        dispatch(setSortDirection( sortedValue));
        let responce = await tasksAPI.getTasks(currentPage, sortDirection, sortedValue);
        let mainStateTasksWithAdmitEdited = JSON.parse(localStorage.getItem('dataTasksForEdited' + currentPage));
        if (localStorage.getItem('dataTasksForEdited' + currentPage)) {
            let newData = responce.data.message.tasks.map(t => {
                if (t.id === mainStateTasksWithAdmitEdited.id) {
                    return {
                        ...t,
                        id: mainStateTasksWithAdmitEdited.id,
                        username: mainStateTasksWithAdmitEdited.username,
                        email: mainStateTasksWithAdmitEdited.email,
                        text: mainStateTasksWithAdmitEdited.text,
                        status: mainStateTasksWithAdmitEdited.status,
                        adminEditTask: true
                    }
                }
                return t;
            })
            localStorage.setItem('editedTasks' + currentPage, JSON.stringify(newData));
            let editedTasksStore = JSON.parse(localStorage.getItem('editedTasks' + currentPage));
            dispatch(setTasks(editedTasksStore));
        } else {
            localStorage.setItem('tasks' + currentPage, JSON.stringify(responce.data.message.tasks));
            let tasksStore = JSON.parse(localStorage.getItem('tasks' + currentPage));
            dispatch(setTasks(tasksStore));
        }
        dispatch(getCountTasks(responce.data.message.total_task_count));
    }
}

export const addTaskThunk = (data) => {
    return async (dispatch) => {
        let responce = await tasksAPI.addTask(data);
        if(responce.data.status ==='error'){
            dispatch(setResponseServer(responce.data.message.email));
        }else{
            dispatch(setResponseServer('Задание добавлено'));
        }
    }
}

export const EditTaskThunk = (data, currentPage) => {
    return async (dispatch) => {
        let responce = await tasksAPI.editTask(data);
        if (responce.data.status === "ok") {
            let newObjTask = {
                id: data.id,
                username: data.username,
                email: data.email,
                text: data.text,
                status: data.status,
                adminEditTask: true
            };
            localStorage.setItem('dataTasksForEdited' + currentPage, JSON.stringify(newObjTask));
            let dataTasksForEdited = JSON.parse(localStorage.getItem('dataTasksForEdited' + currentPage));
            dispatch(editTasks(dataTasksForEdited))
        } else {
            dispatch(setResponseServer(responce.data.message.id))
        }
    }
}


export default tasksReducer;