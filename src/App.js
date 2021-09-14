import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { UserLogin } from "./features/user/User"
import Restaurants from './features/restaurants/Restaurants'
import { useDispatch, useSelector } from 'react-redux';
import Dishes from './features/dishes/Dishes'
import { fetchAllRestaurants } from './features/restaurants/restaurantsSlice';
import Reviews from './features/reviews/Reviews'
import Header from './features/Header'



function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const restaurants = useSelector((state) => state.restaurants)
  const dishes = useSelector((state) => state.dishes)

  useEffect(() => {
    dispatch(fetchAllRestaurants());
  }, [])


  if (user.username === null) {
    return (
      <div>
              <iframe src="https://docs.google.com/document/d/1NhNv4DdTXERbkZfJJQUvFxcGYD62diFyuBfh1JDOLC4/edit?usp=sharing" width="100%" height="1000px"></iframe>

      </div>
    
    );
  } else if (restaurants.selected === null) {
    return (
      <div>
        <Header user={user} />
        <div className="App" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <Restaurants />
        </div>
      </div>
      
    )
  } else if (dishes.selected === null) {
    return (
      <div>
        <Header user={user} restaurant={restaurants} />
        <div className="App" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <Dishes />
        </div>
      </div>
    )
  } else {
    return (
      <div className="App">
        <Header />
        Hello
      </div>
    )
  }
  
}

export default App;
