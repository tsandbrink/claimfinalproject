import React from 'react'
import { useNavigate } from 'react-router'

function Header(props) {
  
  const navigator = useNavigate()
  const signOut = () => {
    localStorage.removeItem("userCookie")
    props.setUser({
      userName: "",
      password: ""
    })
    navigator("/user/signIn")
  }

  const renderHeader = () =>{
    if (props.user.id !== undefined){ 
      return(
      <div className='flex-row center header'>
        <div className='third-width'>
          <a className = 'header-link' href="/"> HOME</a>
        </div>
        <div className='third-width center'>
          <a className='header-link' href='/Flock'>VIEW MY FLOCK</a>
          <a className = 'header-link' href="/AddChicken"> ADD CHICKEN TO FLOCK</a>
          <a className = 'header-link' href="/Eggs"> ADD EGGS LAID</a>
          <a className='header-link' href="/BreedInfo">BREED INFO</a>
        </div>
        <div className='third-width right'>
          <div className='header-link underline cursorPointer' onClick={signOut}> SIGN OUT</div>
          <a className='header-link' href="/user/delete"> DELETE ACCOUNT</a>
        </div>
      </div>
      )
    } else{
      return (
        <div className='flex-row center header'>
            <div className='third-width'>
              <a className = 'header-link' href="/"> HOME</a>
            </div>
            <div className='third-width center'>
            
            </div>
            <div className='third-width right'>
              <a className = 'header-link' href="/user/signUp"> SIGN UP</a>
              <a className='header-link' href="/user/signIn"> SIGN IN</a>
            </div>
    
          </div>
      )
    }

  }
  return (
    renderHeader()
  )
}

export default Header