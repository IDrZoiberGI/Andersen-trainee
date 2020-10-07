import React from 'react';
import s from './Task.module.css';

const Task = ({items, ...props}) => {
    const toggleStatus = id => () => {
        props.toggleTaskStatus(id)
    };

    const deleteItem = id => () => {
        props.deleteTask(id)
    };
    return (
        <div>
            {items.map(task => {
                return (
                    <div key={task.id} className={s.wrapper}>
                        <div className={s.inputsWrapper}>
                            <span
                                onClick={toggleStatus(task.id)}
                                className={task.checked ? s.checked : ''}
                            >
                                {task.title}
                            </span>
                            <span className={s.date}>{task.date}</span>
                        </div>
                        <button className={s.btn} onClick={deleteItem(task.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
};

export default Task;