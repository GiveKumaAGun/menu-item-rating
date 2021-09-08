import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice'
import restaurantsReducer from '../features/restaurants/restaurantsSlice'
import dishesSlice from '../features/dishes/dishesSlice';
import reviewSlice from '../features/reviews/reviewsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    restaurants: restaurantsReducer,
    dishes: dishesSlice,
    reviews: reviewSlice,
  },
});
