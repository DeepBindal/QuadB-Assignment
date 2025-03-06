import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = (key, defaultValue) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
};

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};


const initialState = loadFromLocalStorage("todos", []);

export const todoSlice = createSlice({
    name: "todo",
    initialState: { todos: initialState },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                id: Date.now(),
                text: action.payload,
                isDone: false,
                isImportant: false,
            });
            saveToLocalStorage("todos", state.todos);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            saveToLocalStorage("todos", state.todos);
        },
        markDone: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.isDone = !todo.isDone;
                saveToLocalStorage("todos", state.todos);
            }
        },
        markImportant: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.isImportant = !todo.isImportant;
                saveToLocalStorage("todos", state.todos);
            }
        },
    },
});


export const { addTodo, removeTodo, markDone, markImportant } = todoSlice.actions;

export default todoSlice.reducer 