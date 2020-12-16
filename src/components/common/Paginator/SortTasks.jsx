import React from 'react'
import style from './Paginator.module.css'

class SortTasks extends React.Component {
    sorted = ['id', 'username', 'email', 'status'];
    state = {
        sortDirectionASC: '',
        sortDirectionDESC: '',
        valueSelect: 'id'
    }

    setNewSortedValueASC = (e) => {
        this.setState({
            sortDirectionASC: e.currentTarget.value
        })
    }
    setNewSortedValueDESC = (e) => {
        this.setState({
            sortDirectionDESC: e.currentTarget.value
        })
    }
    changeOptionValues = (e) => {
        this.setState({valueSelect: e.currentTarget.value})
    }
    addDataToSort = () => {
        let sortDirection;
        if (this.state.sortDirectionASC.length > 0) {
            sortDirection = this.state.sortDirectionASC;
        } else if (this.state.sortDirectionDESC.length > 0) {
            sortDirection = this.state.sortDirectionDESC;
        } else {
            sortDirection = ''
        }
        let sortByValue;
        if (this.state.valueSelect.length > 0) {
            sortByValue = this.state.valueSelect;
        } else {
            sortByValue = ''
        }
        this.props.onSubmitSortDirection(sortDirection, sortByValue);
        this.setState({
            sortDirectionASC: '',
            sortDirectionDESC: '',
        })
    }

    render() {
        return (
            <div className={style.sortBlock}>
                <span>asc</span>
                <input onChange={this.setNewSortedValueASC} checked={this.state.sortDirectionASC == '' ? false : true}
                       name="changeSort" type="radio" value="asc"/>
                <span>desc</span>
                <input onChange={this.setNewSortedValueDESC} checked={this.state.sortDirectionDESC == '' ? false : true}
                       name="changeSort" type="radio" value="desc"/>
                <select onChange={this.changeOptionValues} name="select">{this.sorted.map((s, idx) =>
                    <option value={s} key={idx}>{s}</option>)}</select>
                <button disabled={this.props.visibleTaskEditForm || this.props.visibleTaskAddForm ? true : false}
                        className={style.sortButton} onClick={this.addDataToSort}>Сортировать
                </button>
            </div>
        )
    }

}

export default SortTasks;


