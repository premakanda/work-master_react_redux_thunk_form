import React from 'react';
import s from './Paginator.module.css';

class Paginator extends React.Component {
    state = {
        portionNumber: 1
    }

    componentDidMount() {
        this.data = JSON.parse(localStorage.getItem('pagePart'));
        if (localStorage.getItem('pagePart')) {
            this.setState({
                portionNumber: this.data.portionNumber
            });
        } else {
            this.setState({
                portionNumber: 1
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('pagePart', JSON.stringify(nextState));
    }

    render() {
        let totalCount = parseInt(this.props.totalUsersCount);
        let pageCount = Math.ceil(totalCount / this.props.pageSize)
        let pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }
        let portionCount = Math.ceil(pageCount / this.props.portionSize);
        let leftPortionPageNumber = (this.state.portionNumber - 1) * this.props.portionSize + 1;
        let rightPortionPageNumber = this.state.portionNumber * this.props.portionSize;
        return <div className={s.paginator}>
            {this.state.portionNumber > 1 && <button className={s.buttonPrev} onClick={() => {
                this.setState({portionNumber: this.state.portionNumber - 1})
            }}>PREV</button>}
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((p) => {
                return <button
                    className={this.props.currentPage === p && s.pageNumber} key={p} onClick={(e) => {
                    this.props.onPageChanged(p)
                }}>{p}
                </button>
            })}
            {portionCount > this.state.portionNumber && <button className={s.buttonNext} onClick={() => {
                this.setState({portionNumber: this.state.portionNumber + 1})
            }}>NEXT</button>}
        </div>
    }


}
export default Paginator;
