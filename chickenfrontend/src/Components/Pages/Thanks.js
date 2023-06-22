import React from 'react'
import Header from '../Reusables/Header'
import NoUserFoundMessage from '../Reusables/NoUserFoundMessage'

function Thanks(props) {
    
  const render = () => {
    
      return (
        <div className='flex-column container background2'>
          
          <div className = 'flex-column box center'> 
            <h1>THANKS FOR SIGNING UP! </h1>
            <a className='header-link' href="/user/signIn"> Click Here to Sign In</a>
            
          </div>
          
        </div>
      )
     
  }

  return (
      render()
  )
}

export default Thanks