import React from 'react'
import DeleteBox from '../Reusables/DeleteBox'
import NoUserFoundMessage from '../Reusables/NoUserFoundMessage'

function Delete(props) {
  
  const render = () => {
    if (props.user.id !== undefined){
      return (
        <div className='flex-column container background'>
          
          <div className = 'flex-column body center'> 
            <DeleteBox user={props.user} setUser={props.setUser}/>
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

export default Delete