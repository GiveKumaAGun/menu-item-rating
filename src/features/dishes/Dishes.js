import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar} from '@material-ui/core';
import { setSelectedDish } from './dishesSlice';
import Icon from '@material-ui/icons/Image'



export default function Dishes () {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const restaurants = useSelector((state) => state.restaurants)
  const dishes = useSelector((state) => state.dishes)
  // let test = user.reviewList.filter((review) => restaurants.selected)


  const handleListItemClick = (event, dish) => {
    console.log(dish)
    dispatch(setSelectedDish(dish))
  }

  const details = (score, comment) => {
    return (
      <p>
        <p>Score: {score}</p>
        <p>Comment: {comment}</p>
      </p>
    )
  }

  if (dishes.all === null) {
    return <h1>LOADING...</h1>
  }
  return (
    <div>
      <button onClick={() => {console.log(restaurants.selected)}}>Test</button>
      <h1>{restaurants.selected.name}</h1>
      <List >
      {user.dishList.filter((dish) => dish.rest_id === restaurants.selected.id).map((dish) => (
        <ListItem>
          <ListItemAvatar >
            <Avatar>
              <Icon></Icon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={dish.name} secondary={details(dish.score, dish.comment)} onClick={(event) => handleListItemClick(event, dish)}/>
        </ListItem>
      ))}
      </List>
    </div>
  )

}