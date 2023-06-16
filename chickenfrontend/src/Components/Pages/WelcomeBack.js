import React from 'react'
import Header from '../Reusables/Header'
import NoUserFoundMessage from '../Reusables/NoUserFoundMessage'

function WelcomeBack(props) {
  
  const render = () => {
    if (props.user.id !== undefined){
      return (
    
        <div className='flex-column container background2'>

          <div className = 'flex-column body center'> 
            <h1>WELCOME BACK {props.user.userName}!</h1>
            
          </div>
          
        </div>
      
      )
    } else {
        return (
          <NoUserFoundMessage/>
        )
    }
  }
  
  return (
    
        render()
      
  )
}

export default WelcomeBack