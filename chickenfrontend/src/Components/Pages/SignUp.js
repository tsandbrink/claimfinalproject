import React from 'react'
import Header from '../Reusables/Header'
import SignUpBox from '../Reusables/SignUpBox'

function SignUp(props) {
  return (
    <div className='flex-row fill center background'>
     
      <div className = 'flex-column fill center'> 
        <SignUpBox user={props.user} setUser={props.setUser}/>
      </div>
      
    </div>
  )
}

export default SignUp