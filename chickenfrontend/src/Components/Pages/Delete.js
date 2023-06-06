import React from 'react'
import DeleteBox from '../Reusables/DeleteBox'

function Delete(props) {
  return (
    <div className='flex-column container background'>
      
      <div className = 'flex-column body center'> 
        <DeleteBox user={props.user} setUser={props.setUser}/>
      </div>
      
    </div>
  )
}

export default Delete