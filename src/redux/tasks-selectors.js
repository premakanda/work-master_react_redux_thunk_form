import { createSelector } from 'reselect';

const getTasks = (state) => {
    return state.tasks.tasks;
}

export const getTaskSuperSelector = createSelector(getTasks, (tasks) => {
    return tasks;
})

export const getPageSize = (state) => {
    return state.tasks.pageSize;
}

export const getTotalTasksCount = (state) => {
    return state.tasks.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.tasks.currentPage;
}


