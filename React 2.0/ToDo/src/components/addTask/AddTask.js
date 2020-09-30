import React from 'react';
import s from './AddTask.module.css';

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            isValid: true,
            isDate: true
        }
    }

    onChangeTextInput = e => {
        const inputText = e.target.value;
        inputText ? this.setState({isValid: true}) : this.setState({isValid: false});
        this.setState({title: inputText});
    };

    onChangeDateInput = e => {
        const date = e.target.value;
        date ? this.setState({isDate: true}) : this.setState({isDate: false});
        this.setState({date});
    };

    addTaskOnEnter = e => {
        const {title, date} = this.state;
        if (e.keyCode === 13 && title && date) {
            const {title, date} = this.state;
            this.props.addTask(title, date);
            this.setState({title: '', date: ''});
        }
    }


    addTask = () => {
        const {title, date, isValid, isDate} = this.state;
        if (!date) {
            this.setState({isDate: false})
        }
        if (!title) {
            this.setState({isValid: false})
        }
        if (date && isDate && title && isValid) {
            this.props.addTask(title, date);
            this.setState({isValid: true, isDate: true, title: '', date: ''})
        }
    };


    render() {
        const {title, date, isValid, isDate} = this.state;
        return (
            <div className={s.task}>
                <input className={isValid ? s.inputText : s.error} placeholder="Add your task here ..."
                       type="text" value={title}
                       onKeyDown={this.addTaskOnEnter} onChange={this.onChangeTextInput}
                />
                <input type="date" value={date} className={isDate ? s.inputDate : s.inputDateError}
                       onChange={this.onChangeDateInput}
                       onKeyDown={this.addTaskOnEnter}/>
                <button className={s.addTask}
                        onClick={() => this.addTask()}>ADD
                </button>
            </div>
        )
    }
}

export default AddTask;