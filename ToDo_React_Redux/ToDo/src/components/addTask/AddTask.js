import React from 'react';
import s from './addTask.module.css';
import {connect} from "react-redux";
import {addTask} from "../../redux/actions";

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            isErrorText: false,
        };
    };

    onChangeTextInput = e => {
        const inputText = e.target.value;
        this.setState({title: inputText});
    };

    onChangeDateInput = e => {
        const date = e.target.value;
        this.setState({date});
    };

    addTaskOnEnter = e => {
        const {title, date} = this.state;
        if (e.keyCode === 13 && title && date) {
            const {title, date} = this.state;
            this.props.addTask(title, date);
            this.setState({
                title: '',
                date: ''
            });
        }
    };

    addTask = () => {
        const {title, date} = this.state;
        if (date && title) {
            this.props.addTask(title, date);
            this.setState({
                title: '',
                date: '',
            });
        }
    };


    onBlurHandler = e => {
        const value = e.target.value;
        this.setState({isErrorText: !Boolean(value)});
    };


    render() {
        const {title, date, isErrorText} = this.state;
        return (
            <div className={s.task}>
                <input
                    className={isErrorText ? s.error : s.inputText}
                    placeholder="Add your task here ..."
                    type="text"
                    value={title}
                    onKeyDown={this.addTaskOnEnter}
                    onChange={this.onChangeTextInput}
                    onBlur={this.onBlurHandler}
                />
                <input
                    type="date"
                    value={date}
                    className={s.inputDate}
                    onChange={this.onChangeDateInput}
                    onKeyDown={this.addTaskOnEnter}
                />
                <button
                    className={s.btnAdd}
                    onClick={this.addTask}
                    disabled={!(title && date)}
                >
                    ADD
                </button>
            </div>
        );
    };
}

export default connect(
    null,
    {addTask}
)(AddTask);