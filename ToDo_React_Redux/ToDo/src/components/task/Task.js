import React from 'react';
import s from './task.module.css';
import {connect} from "react-redux";
import {deleteTask, toggleTaskStatus} from "../../redux/actions";

const Task = (props) => {
    const toggleStatus = id => () => {
        props.toggleTaskStatus(id)
    };

    const deleteItem = id => () => {
        props.deleteTask(id)
    };

    return (
        <div>
            {props.items.map(task => {
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
                );
            })};
        </div>
    );
};


const mapStateToProps = state => {
    return {
        items: state.todos.tasks,
    }
};


export default connect(
    mapStateToProps,
    {toggleTaskStatus, deleteTask}
)(Task);