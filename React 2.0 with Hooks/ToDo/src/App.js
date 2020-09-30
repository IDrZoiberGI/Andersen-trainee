import React from 'react';
import s from './App.module.css';
import Task from "./components/Task/Task";
import AddTask from "./components/addTask/AddTask";
import {useState} from 'react';

const App = () => {
    const [textInput, setTextInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [order, setOrder] = useState([]);


    const toggleTaskStatus = id => {
        const items = tasks.map(task => {
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
        setTasks(items);
    };

    const addTaskToState = (title, date) => {
        const items = [...tasks];
        items.push({
            id: Date.now(),
            title,
            date,
            checked: false
        });
        setTasks(items);
        localStorage.setItem('tasks', JSON.stringify(items));
    };

    const deleteTask = index => {
        const items = tasks.filter(task => task.id !== index);
        setTasks(items);
        localStorage.setItem('tasks', JSON.stringify(items));
    };

    const sortBy = prop => {
        const items = [...tasks];
        items.sort((a, b) => {
            if (a[prop] > b[prop]) {
                return order ? -1 : 1;
            }
            if (a[prop] < b[prop]) {
                return order ? 1 : -1;
            }
            return null;
        });
        setTasks(items);
        setOrder(order => !order);
    };


    let filterByText = e => {
        const items = [...tasks];
        const textInput = e.target.value;
        const arrWithFilteredText = items.filter(tasks => tasks.title.toLowerCase().includes(textInput.toLowerCase()));
        const initialState = JSON.parse(localStorage.getItem('tasks')) || [];
        const arrFilteredByDate = initialState.filter(tasks => tasks.date.includes(dateInput));
        setTextInput(textInput);
        setTasks(() => textInput ? arrWithFilteredText : dateInput ? arrFilteredByDate : initialState);


    };

    let filterByDate = e => {
        const items = [...tasks];
        const dateInput = e.target.value;
        const arrWithSelectedDate = items.filter(tasks => tasks.date.includes(dateInput));
        setDateInput(dateInput);
        setTasks(() => arrWithSelectedDate);
    };

    const reset = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(tasks);
        setDateInput('');
        setTextInput('');
    };


    return (
        <div className={s.wrapper}>
            <div className={s.filterWrapper}>
                <input type="text" placeholder={'Filter tby tasks ...'} value={textInput}
                       onChange={filterByText} className={s.filter}/>
                <input className={s.filter} type="date" value={dateInput} onChange={filterByDate}/>
                <button className={s.btn} onClick={() => reset()}>Reset all filters</button>
            </div>
            <div className={s.sorted}>
                <button className={s.btn} onClick={() => sortBy('date')}>Sort By Date</button>
                <button className={s.btn} onClick={() => sortBy('title')}>Sort By Text</button>
            </div>
            <div className={s.app}>
                <AddTask addTask={addTaskToState}/>
                <Task items={tasks} deleteTask={deleteTask}
                      toggleTaskStatus={toggleTaskStatus}
                />
            </div>
        </div>
    )
}


export default App;
