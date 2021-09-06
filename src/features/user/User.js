import React, {useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, fetchUserInfo } from './userSlice';
import Restaurant from '../restaurants/Restaurant'

export function UserLogin () {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const login = useRef(null)

  const fetchUserData = async () => {
    dispatch(fetchUserInfo(login.current.value));
  }

  if (user.username === null) {
    return (
      <div>
        <h2>Username:</h2>
          <input ref={login} type="text" placeholder="Enter your username"></input>
          <button onClick={() => {fetchUserData()}}>Login</button>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={() => {console.log(user)}}>Test</button>
        <h1>{user.username}</h1>
        {user.reviewList.length > 0 ?
          <div>
            <h2>Restaurants:</h2> 
            <Restaurant />
          </div>
         : 
         <h2>No reviews found. Start by adding a restaurant!</h2>}
        {}
      </div>
    )
  }
}