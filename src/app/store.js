import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import todoReducer from '../features/todo/todoSlice.js'
import weatherReducer from '../features/weather/weatherSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
    weather: weatherReducer,
  },
})