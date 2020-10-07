import React from 'react';
import s from './App.module.css'
import Task from "./components/task/Task";
import AddTask from "./components/addTask/AddTask";
import {connect} from "react-redux";
import {
    addTask,
    deleteTask,
    filterByDate,
    filterByText, reset, sortBy,
    toggleTaskStatus
} from "./redux/actions";


class App extends React.Component {
    render() {
        return (
            <div className={s.wrapper}>
                <div className={s.filterWrapper}>
                    <input
                        type="text"
                        placeholder={'Filter by tasks ...'}
                        value={this.props.textInput}
                        onChange={this.props.filterByText}
                        className={s.filter}/>
                    <input
                        className={s.filter}
                        type="date"
                        value={this.props.dateInput}
                        onChange={this.props.filterByDate}/>
                    <button className={s.btn} onClick={this.props.reset}>Reset all filters</button>
                </div>
                <div className={s.sorted}>
                    <button className={s.btn} onClick={() => this.props.sortBy('date')}>Sort By Date</button>
                    <button className={s.btn} onClick={() => this.props.sortBy('title')}>Sort By Text</button>
                </div>
                <div className={s.app}>
                    <AddTask/>
                    <Task/>
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        items: state.todos.tasks,
        textInput: state.todos.textInput,
        dateInput: state.todos.dateInput,
    };
};


export default connect(
    mapStateToProps,
    {addTask, toggleTaskStatus, sortBy, deleteTask, filterByText, filterByDate, reset}
)(App);
