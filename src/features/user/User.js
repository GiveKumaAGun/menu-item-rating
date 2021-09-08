import React, {useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, fetchUserInfo } from './userSlice';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

export function UserLogin () {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const login = useRef(null)
  const [inputValue, setInputValue] = useState("");

  const fetchUserData = async () => {
    dispatch(fetchUserInfo(inputValue));
  }

  const onChangeHandler = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div style={{display:"flex", flexDirection:"column", width: "80%", alignItems:"center", justifyContent:"center"}}>
      <h2>Username:</h2>
      <TextField variant="outlined" placeholder="Enter your username" onChange={onChangeHandler}/>
      <Button variant="contained" onClick={() => fetchUserData()}>Select User</Button>
    </div>
  )

}