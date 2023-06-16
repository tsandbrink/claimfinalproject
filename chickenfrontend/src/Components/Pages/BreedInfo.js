import React from 'react'
import SearchBox from '../Reusables/SearchBox'
import SearchBoxBreed from '../Reusables/SearchBoxBreed'
import SearchBoxZipCode from '../Reusables/SearchBoxZipCode'
import NoUserFoundMessage from '../Reusables/NoUserFoundMessage'

function BreedInfo(props) {
  
  const render = () => {
    if (props.user.id !== undefined){
      return (
        <div className='flex-row fill background center'>
         
            <SearchBoxBreed user={props.user} setUser={props.setUser}/>
            <SearchBox user={props.user} setUser={props.setUser}/>
            <SearchBoxZipCode user={props.user} setUser={props.setUser}/>
            
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

export default BreedInfo