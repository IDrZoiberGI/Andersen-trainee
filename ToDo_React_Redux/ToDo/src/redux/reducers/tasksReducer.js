import {
    ADD_TODO,
    TOGGLE_TODO,
    DELETE_TASK,
    SORT_BY,
    FILTER_BY_DATE,
    FILTER_BY_TEXT,
    RESET_ALL_FILTERS
} from '../actionsType';

const initialState = {
    initialTask: [],
    tasks: [],
    dateInput: '',
    textInput: '',
    order: true
};


const todos = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO: {
            const {title, date} = action.payload;
            const newTask = {
                id: Date.now(),
                title,
                date,
                checked: false
            };
            return {
                initialTask: [...state.initialTask, newTask],
                tasks: [...state.tasks, newTask],
                dateInput: '',
                textInput: '',
            };
        }
        case TOGGLE_TODO: {
            const {id} = action.payload;
            const {initialTask, dateInput, textInput} = state;
            return {
                initialTask,
                tasks: state.tasks.map(task => {
                    if (task.id === id) {
                        return {
                            id: task.id,
                            title: task.title,
                            date: task.date,
                            checked: !task.checked
                        };
                    }
                    return task;
                }),
                dateInput,
                textInput,
            };
        }

        case DELETE_TASK: {
            const {index} = action.payload;
            const {dateInput, textInput} = state;
            return {
                initialTask: state.initialTask.filter(task => task.id !== index),
                tasks: state.tasks.filter(task => task.id !== index),
                dateInput,
                textInput,
            };
        }

        case SORT_BY: {
            const items = [...state.tasks];
            const {dateInput, textInput, initialTask, order} = state;
            const {prop} = action.payload;
            return {
                initialTask,
                tasks: items.sort((a, b) => {
                    if (a[prop] > b[prop]) {
                        return order ? -1 : 1;
                    }
                    if (a[prop] < b[prop]) {
                        return order ? 1 : -1;
                    }
                    return null;
                }),
                dateInput,
                textInput,
                order: !order
            };
        }

        case FILTER_BY_DATE: {
            const {dateInput} = action.payload;
            const items = [...state.tasks];
            const {initialTask, textInput} = state;
            return {
                initialTask,
                tasks: items.filter(tasks => tasks.date.includes(dateInput)),
                dateInput,
                textInput
            };
        }

        case FILTER_BY_TEXT: {
            const items = [...state.tasks];
            const {textInput} = action.payload;
            const arrWithFilteredText = items.filter(tasks => tasks.title.toLowerCase().includes(textInput.toLowerCase()));
            const initialState = state.initialTask || [];
            const initialStateFilteredByDate = initialState.filter(tasks => tasks.date.includes(textInput));
            const newArr = textInput ? arrWithFilteredText : initialStateFilteredByDate;
            return {
                initialTask: state.initialTask,
                textInput,
                tasks: newArr,
                dateInput: state.dateInput
            };
        }

        case RESET_ALL_FILTERS: {
            const {initialTask} = state;
            return {
                initialTask, tasks: initialTask, dateInput: '', textInput: '',
            };
        }

        default: {
            return state
        }
    }
};

export default todos;