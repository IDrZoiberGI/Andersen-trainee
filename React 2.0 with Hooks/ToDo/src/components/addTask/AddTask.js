import React from 'react';
import {useState} from 'react';
import s from './AddTask.module.css';
const AddTask = (props) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isDate, setIsDate] = useState(true);

    const onChangeTextInput = e => {
        const title = e.target.value;
        title ? setIsValid(() => true) : setIsValid(() => false);
        setTitle(title)
    };

    const onChangeDateInput = e => {
        const date = e.target.value;
        date ? setIsDate(() => true) : setIsDate(() => true);
        setDate(date);
    };

    const addTaskOnEnter = e => {
        if (e.keyCode === 13 && title && date) {
            props.addTask(title, date);
            setDate('');
            setTitle('');
        }
    }

    const addTask = () => {
        if (!date) {
            setIsDate(() => false);
        }
        if (!title) {
            setIsValid(() => false);
        }
        if (date && isDate && title && isValid) {
            props.addTask(title, date);
            setIsValid(() => true);
            setIsDate(() => true);
            setTitle('');
            setDate('');
        }
    };

    return (
        <div className={s.task}>
            <input className={isValid ? s.inputText : s.error} placeholder="Add your task here ..."
                   type="text" value={title}
                   onKeyDown={addTaskOnEnter} onChange={onChangeTextInput}
            />
            <input type="date" value={date} className={isDate ? s.inputDate : s.inputDateError}
                   onChange={onChangeDateInput}
                   onKeyDown={addTaskOnEnter}/>
            <button className={s.addTask}
                    onClick={() => addTask()}>ADD
            </button>
        </div>
    )
};


export default AddTask;