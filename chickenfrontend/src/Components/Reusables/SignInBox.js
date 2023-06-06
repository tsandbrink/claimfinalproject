import React from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useState } from 'react'

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
        axios.post("http://localhost:8080/user/signIn", props.user)
        .then((response) => {
            localStorage.setItem("userCookie", response.data.userName)
            props.setUser(response.data)
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
  
    const renderSignUpBox = () => {
        
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
                                <button className = 'colorScheme2' role = 'button' onClick={submitHandler}>SUBMIT!</button>
                                </div>
                            </div>
                        </div>
                    
                    
                    </div>
            )}
    }

    return (
        renderSignUpBox()
    )
}

export default SignInBox