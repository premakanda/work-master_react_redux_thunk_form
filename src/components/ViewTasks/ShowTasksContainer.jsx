import React from 'react';
import {connect} from "react-redux";
import Tasks from "./Tasks";
import {
    editTaskDataActionCreater,
    getTasksThunk,
    setVisibleEditTask,
    setSortDirection, setTasks
} from "../../redux/tasks-reducer";
import {
    getCurrentPage, getPageSize, getTotalTasksCount,
    getTasks, getTaskSuperSelector,
} from "../../redux/tasks-selectors";
import {setCheckLogined} from '../../redux/auth-reducer';


class ShowTasksContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let currentPage = JSON.parse(localStorage.getItem('currentPage'));
        this.app = JSON.parse(localStorage.getItem('pages' + currentPage));
        let currentPagesSortDirectionValue = JSON.parse(localStorage.getItem('currentPagesSortDirectionValue' + currentPage));
        let currentPagesSortedByValue = JSON.parse(localStorage.getItem('currentPagesSortedByValue' + currentPage));
        if (localStorage.getItem('pages' + currentPage)) {
            this.props.getTasksThunk(this.app.currentPage, currentPagesSortDirectionValue, currentPagesSortedByValue);
        } else {
            let {currentPage} = this.props;
            this.props.getTasksThunk(currentPage, this.props.sortDirection, this.props.sortedValue);
        }
    }

    onEditTask = (data) => {
        if (localStorage.getItem('token')) {
            this.props.editTaskDataActionCreater(data);
            this.props.setVisibleEditTask(true);
        } else {
            this.props.setCheckLogined('Залогинься');
        }
    }

    onPageChanged = (pageNumber) => {
        let currentPagesSortDirectionValue = JSON.parse(localStorage.getItem('currentPagesSortDirectionValue' + pageNumber));
        let currentPagesSortedByValue = JSON.parse(localStorage.getItem('currentPagesSortedByValue' + pageNumber));
        this.props.getTasksThunk(pageNumber, currentPagesSortDirectionValue, currentPagesSortedByValue);
    }

    render() {
        return (
            <Tasks visibleTaskAddForm={this.props.visibleTaskAddForm} setTasks={this.props.setTasks}  {...this.props} isLogined={this.props.isLogined}
                   onPageChanged={this.onPageChanged} onEditTask={this.onEditTask}
                   setSortDirection={this.props.setSortDirection} portionSize={this.props.portionSize}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        tasks: getTaskSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalTasksCount(state),
        currentPage: getCurrentPage(state),
        sortDirection: state.tasks.sortDirection,
        sortedValue: state.tasks.sortedValue,
        portionSize: state.tasks.portionSize,
        isAuth: state.auth.isAuth,
        isLogined: state.auth.isLogined,
        visibleTaskAddForm: state.tasks.visibleTaskAddForm
    }
}

export default connect(mapStateToProps, {
    getTasksThunk, editTaskDataActionCreater, setCheckLogined, setVisibleEditTask, setTasks, setSortDirection})(ShowTasksContainer)
