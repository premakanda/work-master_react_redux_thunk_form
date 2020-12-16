import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import Task from "./Task";
import style from '../Login/Login.module.css'

class Tasks extends React.Component {
    render(){
        return (
            <div>
                <div className={style.isLoginedCheck}>{this.props.isLogined}</div>
                <Paginator currentPage={this.props.currentPage} onPageChanged={this.props.onPageChanged}
                           totalUsersCount={this.props.totalUsersCount}
                           pageSize={this.props.pageSize}{...this.props} portionSize={this.props.portionSize}/>
                <div>
                    {this.props.tasks.map((t, i) => <Task visibleTaskAddForm={this.props.visibleTaskAddForm}  task={t} key={t.id} isAuth={this.props.isAuth} onEditTask={this.props.onEditTask}/>)}
                </div>
            </div>
        )
    }
}
export default Tasks;
