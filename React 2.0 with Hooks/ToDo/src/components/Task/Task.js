import React from 'react';
import s from './Task.module.css';

const Task = ({items, ...props}) => {
    return (
        <div>
            {items.map(task => {
                return (
                    <div key={task.id} className={s.wrapper}>
                        <div className={s.inputsWrapper}>
                            <span onClick={() => props.toggleTaskStatus(task.id)}
                                  className={task.checked ? s.checked : ''}>{task.title}</span>
                            <span className={s.date}>{task.date}</span>
                        </div>
                        <button className={s.btn} onClick={() => props.deleteTask(task.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
};

export default Task;