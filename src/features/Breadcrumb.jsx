import { Breadcrumbs, Link } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { resetUser } from "./user/userSlice";
import { resetRestaurant } from "./restaurants/restaurantsSlice";
import { useSelector } from "react-redux";

export function Breadcrumb (props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.username)
  const restaurant = useSelector((state) => state.restaurants.selected)

  

  const unsetUser = async () => {
    await dispatch(resetUser())
    await dispatch(resetRestaurant())
  }
  const unsetRestaurant = async () => {
    console.log('clicked')
    await dispatch(resetRestaurant())

  }
  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div style={{justifyContent:"center", alignItems:"center"}}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit"  onClick={unsetUser}>
          User
        </Link>
        {user ? <Link color="inherit"  onClick={unsetRestaurant}>
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

