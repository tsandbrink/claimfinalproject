import React from 'react'

function ContentBox(props) {
  
  
    return (
        <div className='flex-column body'>
            <div className='flex-column center margin'>
              <div className='margin'>{props.content.name}</div>
              
              <div className='margin'> {props.content.birthdate}</div>
              <button className='colorScheme cursorPointer' onClick ={() => { props.onClick(props.content) }}> Add to Flock!</button>
            </div>
          </div>
    )
}

export default ContentBox