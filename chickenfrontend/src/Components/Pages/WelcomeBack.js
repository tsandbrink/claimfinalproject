import React from 'react'
import Header from '../Reusables/Header'

function WelcomeBack(props) {
  return (
    
        <div className='flex-column container background2'>

          <div className = 'flex-column body center'> 
            <h1>WELCOME BACK {props.user.userName}!</h1>
            
          </div>
          
        </div>
      
  )
}

export default WelcomeBack