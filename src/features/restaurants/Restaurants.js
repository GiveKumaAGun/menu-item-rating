import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, List, ListItem, ListItemText, Button } from '@material-ui/core';
import { setSelectedRestaurant } from './restaurantsSlice';
import { fetchRestaurantDishes } from '../dishes/dishesSlice';

export default function Restaurants () {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const restaurants = useSelector((state) => state.restaurants)


  const handleListItemClick = (event, restaurant) => {
    dispatch(fetchRestaurantDishes(restaurant.id))
    dispatch(setSelectedRestaurant(restaurant))
  }

  return (
    <div>
          <button onClick={() => {console.log(restaurants)}}>Test</button>
          <h1>Welcome {user.username}</h1>
          {user.reviewList.length > 0 ?
            <div>
              <TextField variant="outlined" placeholder="Search for a restaurant"/>
              <h2>Previously reviewed restaurants:</h2> 
              <List >
                {restaurants.visited.map((restaurant) => (
                  <ListItem key={`rest_${restaurant.id}`} onClick={(event) => handleListItemClick(event, restaurant)}>
                    <ListItemText primary={restaurant.name} secondary={restaurant.address}></ListItemText>
                  </ListItem>
                  
                ))}
              </List>
              <h4>Add a new restaurant</h4>
              <List>
                {}
              </List>
              <Button variant="contained">Add an unlisted restaurant</Button>
            </div>
            : 
            <h2>No reviews found. Start by adding a restaurant!</h2>}
          {}
        </div>
  )

}