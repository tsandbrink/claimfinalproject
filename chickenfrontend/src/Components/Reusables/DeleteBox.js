import React from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

function DeleteBox(props) {
  
    const navigator = useNavigate()

    const deleteUser = () => {
        const id = props.user.id
     //   const contentCartId = props.user.
        localStorage.removeItem("userCookie")
        axios.delete(`http://localhost:8080/user/deleteUser/${id}`) 
        props.setUser({
            userName: "",
            password: "",
            
        })
        navigator("/")
    }

    const retainUser = () => {
        navigator("/WelcomeBack")
    }
  
    return (
        <div className= 'flex-column sign-up-box center'>
            <h2 className = 'center margin'> DO YOU WANT TO DELETE YOUR ACCOUNT?</h2>
            <div className= 'flex-column'> 
                <div className='flex-row'>
                   
                    <button className = 'colorScheme margin' role = 'button' onClick={deleteUser}>YES</button>
                    
                    <button className = 'colorScheme margin' role = 'button' onClick={retainUser}>NO</button>
                </div>
            </div>
        </div>
  )
}

export default DeleteBox