import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice'
import restaurantsReducer from '../features/restaurants/restaurantsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    restaurants: restaurantsReducer
  },
});
