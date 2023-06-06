import React from 'react'
import SignInBox from '../Reusables/SignInBox'
import Header from '../Reusables/Header'

function SignIn(props) {
  return (
    <div className='flex-row fill center background'>
    
    <div className = 'flex-column fill center'> 
      <SignInBox user={props.user} setUser={props.setUser}/>
    </div>
    
  </div>
  )
}

export default SignIn