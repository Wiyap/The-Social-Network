import React, { createContext } from 'react';
import Cookies from 'js-cookie';

export const functionContext = createContext()

const FunctionContextProvider = (props) => {
  const handleSubscribe = () => {
    const data = {
      username: "ludo",
      email: "ludo@ludo.com",
      password: "123456"
    };
  
    const initParams = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  
    fetch('http://localhost:1337/auth/local/register', initParams)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
      })
  }

  const handleLogin = () => {
    const data = {
      identifier: "ludo",
      password: "123456"
    };
  
    const initPramas = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    } 

    fetch('http://localhost:1337/auth/local', initPramas)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        Cookies.set('token-social', response.jwt);
      })
    
      
  }

  const handleLogout = () => {
    Cookies.remove('token-social')
  }
    
  return(
    <functionContext.Provider value={{handleLogin, handleSubscribe, handleLogout}}>
        {props.children}
    </functionContext.Provider>
  )
}

export default FunctionContextProvider