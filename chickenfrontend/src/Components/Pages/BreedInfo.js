import React from 'react'
import SearchBox from '../Reusables/SearchBox'
import SearchBoxBreed from '../Reusables/SearchBoxBreed'
import SearchBoxZipCode from '../Reusables/SearchBoxZipCode'

function BreedInfo(props) {
  return (
    <div className='flex-row fill background center'>
     
        <SearchBoxBreed user={props.user} setUser={props.setUser}/>
        <SearchBox user={props.user} setUser={props.setUser}/>
        <SearchBoxZipCode user={props.user} setUser={props.setUser}/>
        
    </div>
  )
}

export default BreedInfo