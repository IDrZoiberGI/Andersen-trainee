import React from 'react';
import {useState} from 'react';
import s from './AddTask.module.css';

const AddTask = (props) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [isErrorText, setIsErrorText] = useState(false);


    const onChangeTextInput = e => {
        const title = e.target.value;
        setTitle(title);
    };

    const onChangeDateInput = e => {
        const date = e.target.value;
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
        if (date && title) {
            props.addTask(title, date);
            setTitle('');
            setDate('');
        }
    };
    const onBlurHandler = e => {
        const value = e.target.value;
        setIsErrorText(() => !Boolean(value));
    };
    return (
        <div className={s.task}>
            <input
                className={isErrorText ? s.error : s.inputText}
                placeholder="Add your task here ..."
                type="text"
                value={title}
                onKeyDown={addTaskOnEnter}
                onChange={onChangeTextInput}
                onBlur={onBlurHandler}
            />
            <input
                type="date"
                value={date}
                className={s.inputDate}
                onChange={onChangeDateInput}
                onKeyDown={addTaskOnEnter}
            />

            <button
                className={s.addTask}
                onClick={() => addTask()}
                disabled={!(title && date)}
            >
                ADD
            </button>
        </div>
    )
};


export default AddTask;