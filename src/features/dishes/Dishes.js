import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Popover, Typography, makeStyles, MenuItem, Select, InputLabel, FormControl} from '@material-ui/core';
import { setSelectedDish } from './dishesSlice';
import Image from '@material-ui/icons/Image'
import AddCircle from '@material-ui/icons/AddCircle'
import { fetchRestaurantDishes, postDish } from './dishesSlice';
import { postReview } from '../reviews/reviewsSlice';
import { fetchUserInfo } from '../user/userSlice';




export default function Dishes () {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const restaurants = useSelector((state) => state.restaurants)
  const dishes = useSelector((state) => state.dishes)
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [score, setScore] = useState("");
  const [reviewAnchorEl, setReviewAnchorEl] = useState(null)


  const openReviewForm = (event) => {
    console.log('test')
    setReviewAnchorEl(event.currentTarget)
  }

  const handleSelectChange = (event) => {
    setScore(event.target.value);
  }

  const handleListItemClick = (event, dish) => {
    console.log(dish)
    dispatch(setSelectedDish(dish))
  }

  const changeHandler = (event, field) => {
    if (field === "name")
    setName(event.target.value)
    if (field === "comment")
    setComment(event.target.value)
  }

  const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null)

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setReviewAnchorEl(null);
    setScore(null)
    setComment(null)
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const open2 = Boolean(reviewAnchorEl);
  const id2 = open ? 'simple-popover' : undefined;

  const submitDish = async (event, score, comment) => {
    let test = await dispatch(postDish({name, rest_id: restaurants.selected.id}))
    // await dispatch(postReview({user_id, dish_id, score, comment}))
    await setAnchorEl(null);
    console.log(test)
    console.log('herro')
    // if (score) {
    //   dispatch(postReview(username: user.username, dish_id, ))
    // }

    // console.log(restaurants.selected)
    await dispatch(fetchRestaurantDishes(restaurants.selected.id));
  }
  const submitReview = async (event, dish_id) => {
    await dispatch(postReview({username: user.username, dish_id, score, comment}))
    // await dispatch(postReview({user_id, dish_id, score, comment}))
    await setReviewAnchorEl(null);

    // console.log(restaurants.selected)
    await dispatch(fetchUserInfo(user.username));
  }

  const details = (score, comment) => {
    return (
      <div>
        <div>Score: {score}</div>
        <div>Comment: {comment}</div>
      </div>
    )
  }

  if (dishes.all === null) {
    return <h1>LOADING...</h1>
  }
  return (
    <div>
      <h1>{restaurants.selected.name}</h1>
      <h4>{restaurants.selected.address}</h4>
      <List >
      {user.dishList.filter((dish) => dish.rest_id === restaurants.selected.id).map((dish) => (
        <ListItem key={`dish_${dish.id}`}>
          <ListItemAvatar >
            <Avatar>
              <Image></Image>
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
          primary={dish.name} 
          secondaryTypographyProps={{component:"div"}}
          secondary={details(dish.score, dish.comment)}  
          onClick={(event) => handleListItemClick(event, dish)}
          />
        </ListItem>
      ))}
      </List>


      <h4>All Dishes</h4>
      <List>
        {dishes.all.map((dish) => (
          <ListItem key={`allDish_${dish.id}`} onClick={(event) => openReviewForm(event, dish)}>
            <ListItemAvatar >
            <AddCircle></AddCircle>
          </ListItemAvatar>
          <ListItemText 
          primary={dish.dish}
          />
          <Popover
            id={id2}
            open={open2}
            anchorEl={reviewAnchorEl}
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
            <h4>Add a review for {dish.dish}</h4>
            <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Score</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={score}
              onChange={handleSelectChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
            </FormControl>
            <TextField variant="outlined" placeholder="comment" required onChange={(event) => changeHandler(event, "comment")}/>
            <Button variant="contained" onClick={(event) => submitReview(event, dish.id)}>Add Review</Button>

          
          </Typography>              
          </Popover>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={(event) => handleButtonClick(event)}>Add an unlisted dish</Button>
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
          <h4>Add an unlisted dish</h4>
          <TextField variant="outlined" placeholder="name of menu item" required onChange={(event) => changeHandler(event, "name")}/>
          {/* <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Score</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={score}
            onChange={handleSelectChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
          </FormControl>
          <TextField variant="outlined" placeholder="comment" required onChange={(event) => changeHandler(event, "comment")}/> */}
          <Button variant="contained" onClick={(event, score, comment) => submitDish(event)}>Add Dish</Button>

        
        </Typography>              
      </Popover>
    </div>
  )

}