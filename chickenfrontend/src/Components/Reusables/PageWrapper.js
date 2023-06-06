import React from 'react'
import Header from './Header'

function PageWrapper(props) {
  return (
    <div className='flex-column container'>
        <Header user={props.user} setUser={props.setUser}/> 
      <div className='flex-column main-content'>
        {props.children}
      </div>
    </div>
  )
}

export default PageWrapper