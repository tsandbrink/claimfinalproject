import React from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useState } from 'react'
import jwt_decode from 'jwt-decode'

function SignInBox(props) {
    //build a use state variable up here
    const [loggedIn, setLoggedIn] = useState("null")
    
    const navigator = useNavigate()

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempUser = { ...props.user };
        tempUser[name] = value;
        props.setUser(tempUser)
    }

    const submitHandler = () => {
        axios.post("http://localhost:8080/auth/login", props.user)
        .then((response) => {
            localStorage.setItem("token", response.data.jwt)
            const decodedToken = jwt_decode(response.data.jwt);
            console.log(decodedToken.userId)
            const updatedUser = {
                id: decodedToken.userId,
                userName: decodedToken.sub,
                email: decodedToken.email,
                roles: decodedToken.roles,
                flock: decodedToken.flock
            };
            props.setUser(updatedUser)
            
            //set use state variable here
            setLoggedIn("loggedIn");
            navigator("/WelcomeBack")
        })
        .catch((e) => {
            console.log(e)
            //set use state variable here
            setLoggedIn("notLoggedIn");
        })
    }
  
    const renderSignInBox = () => {
        
        if (loggedIn === "notLoggedIn"){
            return (
            <div className= 'flex-column sign-up-box center'>
                <h1>SIGN IN</h1>
                <div className= 'flex-column'> 
                    <div className='flex-column'>
                        <div className = 'margin center'>USERNAME: </div>
                        <input className = 'colorScheme2' name="userName" type = "userName" onChange={changeHandler}/>
                        <div className= 'margin center'>PASSWORD: </div>
                        <input className = 'colorScheme2' name="password" type = "password" onChange={changeHandler}/>
                        <div className = 'margin center'>
                        <button className = 'colorScheme2' role = 'button' onClick={submitHandler}>SUBMIT!</button>
                        </div>
                        <div className = 'margin center'> USERNAME/PASSWORD NOT FOUND! </div>
                    </div>
                </div>
            </div>
            )
        } else {
            return (
            
                    <div className= 'flex-column sign-up-box center'>
                        <h1>SIGN IN TO YOUR FLOCK</h1>
                        <div className= 'flex-column'> 
                            <div className='flex-column'>
                                <div className = 'margin center'>USERNAME: </div>
                                <input className = 'colorScheme2' name="userName" type = "userName" onChange={changeHandler}/>
                                <div className= 'margin center'>PASSWORD: </div>
                                <input className = 'colorScheme2' name="password" type = "password" onChange={changeHandler}/>
                                <div className = 'margin center'>
                                <button className = 'colorScheme2 button' role = 'button' onClick={submitHandler}>SUBMIT!</button>
                                </div>
                            </div>
                        </div>
                    
                    
                    </div>
            )}
    }

    return (
        renderSignInBox()
    )
}

export default SignInBox