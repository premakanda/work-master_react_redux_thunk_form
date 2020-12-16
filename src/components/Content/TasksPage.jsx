import React, { useState } from 'react';
import s from './style.module.css'
import { NavLink } from "react-router-dom";
import UsersContainer from "../ViewTasks/ShowTasksContainer";
import AddTask from "./AddTask/AddTask";
import EditTask from "./EditTask/EditTask";
import SortTasks from "../common/Paginator/SortTasks";


const TaskPage = props => {
    return (
        <div className={s.taskMain}>
            <div><UsersContainer /></div>
            <div className={s.addUser}>
                <button disabled={props.visibleTaskEditForm?true:false} onClick={props.addTask}>Добавить задание</button>
            </div>
            <div className={s.errorEditForm}>{props.responseServer}</div>
            <div className={s.isLoginedAdmin}>{props.message}</div>
            <div className={s.sortDirection}> <SortTasks visibleTaskAddForm={props.visibleTaskAddForm} visibleTaskEditForm={props.visibleTaskEditForm} setSortDirection={props.setSortDirection} onSubmitSortDirection={props.onSubmitSortDirection} /></div>
            <div className={s.addTaskForm}>
                {props.visibleTaskAddForm &&
                    <AddTask onSubmit={props.onSubmit} closeTask={props.addTask} />
                }
            </div>
            <div className={s.EditTaskForm}>
                {props.visibleTaskEditForm &&
                    <EditTask initialValues={props.tasksForEdit} isAuth={props.isAuth} editTask={props.editTask} onSubmit={props.onSubmitForEdit} />
                }
            </div>
            <div className={s.loginBlock}>
                {props.isAuth ? <div>
                    <button className={s.logoutButton} onClick={props.logoutMeThunk}>Выход</button>
                </div> :
                    <NavLink to={'/login'}><button className={s.logoutButton}>Вход</button></NavLink>}
            </div>
            <div>
            </div>
        </div>
    )
}


export default TaskPage;






