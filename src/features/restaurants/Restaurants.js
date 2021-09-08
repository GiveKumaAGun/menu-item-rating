import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, List, ListItem, ListItemText, Button, Popover, Typography, makeStyles } from '@material-ui/core';
import { setSelectedRestaurant, postRestaurant } from './restaurantsSlice';
import { fetchRestaurantDishes } from '../dishes/dishesSlice';
import Icon from '@material-ui/icons/AddCircle'


export default function Restaurants () {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const restaurants = useSelector((state) => state.restaurants)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")

  //Popover
  const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  //

  const handleListItemClick = (event, restaurant) => {
    dispatch(fetchRestaurantDishes(restaurant.id))
    dispatch(setSelectedRestaurant(restaurant))
  }

  const changeHandler = (event, field) => {
    if (field === "name")
    setName(event.target.value)
    if (field === "address")
    setAddress(event.target.value)
  }

  const submit = () => {
    dispatch(postRestaurant({name, address}))
  }

  return (
    <div>
          <button onClick={() => {console.log(restaurants.visited)}}>Test</button>
          <h1>Welcome {user.username}</h1>
            <div>
              {user.reviewList.length !== 0 ? <h4>Previously reviewed restaurants</h4>  : null}
              <List >
                {user.restaurantList.map((restaurant) => (
                  <ListItem key={`rest_${restaurant.id}`} onClick={(event) => handleListItemClick(event, restaurant)}>
                    <ListItemText primary={restaurant.name} secondary={restaurant.address}></ListItemText>
                  </ListItem>
                  
                ))}
              </List>

              <h4>All Restaurants</h4>
              <List>
                {restaurants.all.map((restaurant) => (
                  <ListItem key={`newRest_${restaurant.id}`} onClick={(event) => handleListItemClick(event, restaurant)}>
                    <Icon style={{paddingRight: "1rem"}}/>
                    <ListItemText primary={restaurant.name} secondary={restaurant.address}></ListItemText>
                  </ListItem>
                ))}
              </List>
              <Button variant="contained" onClick={(event) => handleClick(event)}>Add an unlisted restaurant</Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Typography className={classes.typography}>
                  <TextField variant="outlined" placeholder="Name" required onChange={(event) => changeHandler(event, "name")}/>
                  <TextField variant="outlined" placeholder="Address" onChange={(event) => changeHandler(event, "address")}/>
                  <Button variant="contained" onClick={(event) => submit(event)}>Add Restaurant</Button>

                
                </Typography>              
              </Popover>
            </div>
        </div>
  )

}