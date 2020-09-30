import {
    ADD_TODO,
    TOGGLE_TODO,
    DELETE_TASK,
    FILTER_BY_DATE,
    FILTER_BY_TEXT,
    RESET_ALL_FILTERS,
    SORT_BY
} from './actionsType'



export let addTask = (title, date) => ({
  type: ADD_TODO,
    payload : {
        id: Date.now(),
        title,
        date,
    }
});

export const toggleTaskStatus = id => ({
    type: TOGGLE_TODO,
    payload: {id}
});

export const deleteTask = index => ({
    type: DELETE_TASK,
    payload: {index}

});


export const sortBy = prop => ({
    type: SORT_BY,
    payload: {prop}
});

export const filterByDate = event => ({
  type: FILTER_BY_DATE,
  payload: {event}
});

export const filterByText = (event) => ({
    type: FILTER_BY_TEXT,
    payload: {event }
});

export const reset = () => ({
  type: RESET_ALL_FILTERS
});