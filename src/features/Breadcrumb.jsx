import { Breadcrumbs, Link } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { resetUser } from "./user/userSlice";
import { resetRestaurant } from "./restaurants/restaurantsSlice";
import { resetDish } from "./dishes/dishesSlice"
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  breadcrumb: {
    paddingInline: "2rem",
    paddingTop: "1rem"
  }
});


export function Breadcrumb (props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.username)
  const restaurant = useSelector((state) => state.restaurants.selected)
  const classes = useStyles();

  


  const unsetUser = async () => {
    await dispatch(resetUser())
    await dispatch(resetRestaurant())
    await dispatch(resetDish())
  }
  const unsetRestaurant = async () => {
    console.log('clicked')
    await dispatch(resetRestaurant())
    await dispatch(resetDish())
  }
  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        <Link color="inherit"  onClick={unsetUser} >
          User
        </Link>
        {user ? <Link color={!restaurant ? "textPrimary" : "inherit"}  onClick={unsetRestaurant}>
          Restaurant
        </Link> : null}
        {user && restaurant ? <Link
          color="textPrimary"
          onClick={handleClick}
          aria-current="page"
        >
          Dish
        </Link> : null}
      </Breadcrumbs>
    </div>
  )
}

