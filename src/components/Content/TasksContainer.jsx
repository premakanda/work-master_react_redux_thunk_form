import React from 'react';
import TasksPage from "./TasksPage";
import {connect} from "react-redux";
import {compose} from "redux";
import {logoutMeThunk} from "../../redux/auth-reducer";
import {
    addTaskThunk,
    setVisibleEditTask,
    setVisibleFormTaskAdd,
    getTasksThunk,
    EditTaskThunk,
    setSortDirection
} from "../../redux/tasks-reducer";

class TasksContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    addTask = (val) => {
        this.props.setVisibleFormTaskAdd(val)
    }

    onSubmitForEdit = (data) => {
        if (this.props.tasks.length > 0) {
            this.props.tasks.map(t => {
                if (t.id === this.props.tasksForEdit.id) {
                    if (t.text !== data.text || t.status !== data.status) {
                        this.props.EditTaskThunk(data, this.props.currentPage);
                    }
                }
            })
        }
        this.props.setVisibleEditTask(false)
    }

    editTask = () => {
        this.props.setVisibleEditTask(false)
    }

    onSubmitForAdd = (data) => {
        this.props.addTaskThunk(data)
        this.props.setVisibleFormTaskAdd(false)
        this.props.getTasksThunk(this.props.currentPage, this.props.sortDirection, this.props.sortedValue);
    }

    onSubmitSortDirection = (sortDirection, sortedValue) => {
        this.props.getTasksThunk(this.props.currentPage, sortDirection, sortedValue);
    }

    render() {
        return (
            <div className='app-wrapper'>
                <TasksPage setSortDirection={this.props.setSortDirection} editTask={this.editTask} {...this.props}
                           addTask={this.addTask}
                           onSubmit={this.onSubmitForAdd}
                           onSubmitForEdit={this.onSubmitForEdit} onSubmitSortDirection={this.onSubmitSortDirection}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        tasks: state.tasks.tasks,
        sortDirection: state.tasks.sortDirection,
        sortedValue: state.tasks.sortedValue,
        currentPage: state.tasks.currentPage,
        isAuth: state.auth.isAuth,
        visibleTaskAddForm: state.tasks.visibleTaskAddForm,
        visibleTaskEditForm: state.tasks.visibleTaskEditForm,
        tasksForEdit: state.tasks.tasksForEdit,
        responseServer: state.tasks.responseServer,
        message: state.auth.message
    }
}

export default compose(
    connect(mapStateToProps, {setVisibleFormTaskAdd, logoutMeThunk, addTaskThunk, getTasksThunk, setVisibleEditTask, EditTaskThunk, setSortDirection}))(TasksContainer);


