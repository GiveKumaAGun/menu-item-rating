import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { UserLogin } from "./features/user/User"

function App() {
  return (
    <div className="App">
      <UserLogin />
    </div>
  );
}

export default App;
