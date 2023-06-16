import React from 'react'
import Header from '../Reusables/Header'
import NoUserFoundMessage from '../Reusables/NoUserFoundMessage'

function Thanks(props) {
    
  const render = () => {
    if (props.user.id !== undefined){
      return (
        <div className='flex-column container background2'>
          
          <div className = 'flex-column box center'> 
            <h1>THANKS FOR SIGNING UP! </h1>
            
            
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

export default Thanks