import React from 'react';
import s from './App.module.css'
import Task from "./components/task/Task";
import AddTask from "./components/addTask/AddTask";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: JSON.parse(localStorage.getItem('tasks')) || [],
            textInput: '',
            dateInput: '',
            order: true
        };
    };

    toggleTaskStatus = id => {
        const items = this.state.items.map(task => {
            if (task.id === id) {
                return {
                    id: task.id,
                    title: task.title,
                    date: task.date,
                    checked: !task.checked
                }
            } else {
                return task;
            }
        })
        this.setState({items});
    };

    addTaskToState = (title, date) => {
        const items = [...this.state.items];
        items.push({
            id: Date.now(),
            title,
            date,
            checked: false
        });
        this.setState({
            items,
        }, () => localStorage.setItem('tasks', JSON.stringify(this.state.items)));
    };

    deleteTask = index => {
        const newArr = this.state.items.filter(task => task.id !== index);
        this.setState({items: newArr}, () => {
            localStorage.setItem('tasks', JSON.stringify(this.state.items));
        });
    };

    sortBy = prop => {
        const items = [...this.state.items];
        const {order} = this.state;
        items.sort((a, b) => {
            if (a[prop] > b[prop]) {
                return order ? -1 : 1;
            }
            if (a[prop] < b[prop]) {
                return order ? 1 : -1;
            }
            return null;
        });
        this.setState({items, order: !order});
    };


    filterByText = e => {
        const items = [...this.state.items];
        const textInput = e.target.value;
        const arrWithFilteredText = items.filter(tasks => tasks.title.toLowerCase().includes(textInput.toLowerCase()));
        const initialState = JSON.parse(localStorage.getItem('tasks')) || [];
        const arrFilteredByDate = initialState.filter(tasks => tasks.date.includes(this.state.dateInput));
        this.setState({
            textInput,
            items: textInput
                ? arrWithFilteredText
                : this.state.dateInput
                    ? arrFilteredByDate
                    : initialState
        });
    };

    filterByDate = e => {
        const items = [...this.state.items];
        const dateInput = e.target.value;
        const arrWithSelectedDate = items.filter(tasks => tasks.date.includes(dateInput));
        this.setState({dateInput, items: arrWithSelectedDate});
    };

    reset = () => {
        const initialState = JSON.parse(localStorage.getItem('tasks')) || [];
        this.setState({items: initialState, textInput: '', dateInput: ''});
    };

    render() {
        const {textInput, dateInput} = this.state;
        return (
            <div className={s.wrapper}>
                <div className={s.filterWrapper}>
                    <input type="text" placeholder={'Filter tby tasks ...'} value={textInput}
                           onChange={this.filterByText} className={s.filter}/>
                    <input className={s.filter} type="date" value={dateInput} onChange={this.filterByDate}/>
                    <button className={s.btn} onClick={() => this.reset()}>Reset all filters</button>
                </div>
                <div className={s.sorted}>
                    <button className={s.btn} onClick={() => this.sortBy('date')}>Sort By Date</button>
                    <button className={s.btn} onClick={() => this.sortBy('title')}>Sort By Text</button>
                </div>
                <div className={s.app}>
                    <AddTask addTask={this.addTaskToState}/>
                    <Task items={this.state.items} deleteTask={this.deleteTask}
                          toggleTaskStatus={this.toggleTaskStatus}
                    />
                </div>
            </div>
        )
    };
}


export default App;
