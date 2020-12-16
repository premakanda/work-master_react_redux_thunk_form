import React from 'react';
import s from './tasks.module.css';

let Task = props => {
    return (
        <div className={s.taskBlock} key={props.key}>
            <table className={s.tableShowTasks}>
                <tr>
                    <td className={s.nameColumn}>Id:</td>
                    <td className={s.contentColumn}>{props.task.id}</td>
                </tr>
                <tr>
                    <td className={s.nameColumn}>UserName:</td>
                    <td className={s.contentColumn}>{props.task.username}</td>
                </tr>
                <tr>
                    <td className={s.nameColumn}> Email:</td>
                    <td className={s.contentColumn}>{props.task.email}</td>
                </tr>
                <tr>
                    <td className={s.nameColumn}>Text:</td>
                    <td className={s.contentColumn}>{props.task.text}</td>
                    <td className={s.edited}>{props.task.adminEditTask?'Отредактировано администратором':''}</td>
                </tr>
                <tr>
                    <td className={s.nameColumn}>Status:</td>
                    <td className={s.contentColumn}>{props.task.status==0?'Не выполнено':'Выполнено'}</td>
                </tr>
                <tr>
                    <td>{props.isAuth &&
                    <button disabled={props.visibleTaskAddForm?true:false}  className={s.editButton} onClick={() => props.onEditTask(props.task)}>Редактировать</button>
                    }</td>
                    <td></td>
                </tr>
            </table>
        </div>
    )
}
export default Task;
