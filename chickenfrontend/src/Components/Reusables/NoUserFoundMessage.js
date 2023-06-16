import React from 'react'

function NoUserFoundMessage() {
    return(
        <div className='background fill center'>
        <div className='flex-column center chicken-box'>
           <div>WHOA THERE PARTNER. LET'S GET YOU SIGNED IN FIRST.</div> 

            <a className='header-link' href="/user/signIn"> CLICK HERE TO SIGN IN</a>
        </div>
        </div>
    )
}

export default NoUserFoundMessage