import React, { useEffect, useState } from 'react'
import axios from 'axios'

function SearchBox(props) {
  
    const [searchCriteria, setSearchCriteria] = useState({breed:""})
    const [errorMessage, setErrorMessage] = useState("")
    const [resultMessage, setResultMessage] = useState("")

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempSearchCriteria = { ...searchCriteria };
        tempSearchCriteria[name] = value;
        setSearchCriteria(tempSearchCriteria)
    }
  
    const submitHandler = () => {

        axios.get(`http://localhost:8080/chicken/getAverageByBreed/${searchCriteria.breed}`)
        
            .then((response) =>{
                
                setResultMessage("\nThere are  " + response.data[0] + " " + searchCriteria.breed + " hens kept by MyFlock users. Users report that on average they lay " + response.data[1].toFixed(2) + " eggs per week.")
                console.log("Result Found")
                
            })
            .catch((e) =>{
                
                setResultMessage("No Results Matched Your Criteria")
                console.log(e)
            })
           
    }

    return (
    <div className= 'flex-column sign-up-box third-width center margin'>
        <h1 className='center margin'>LOOKUP BREED INFO:</h1>
        <div className= 'flex-column fill'> 
            <div className='flex-column'>
                <div className = 'margin center'>BREED NAME: </div>
                <input className = 'margin colorScheme2' name="breed" type = "breed" onChange={changeHandler}/>
                
                
                
                <div className = 'margin center'>
                <button className = 'colorScheme2 button' role = 'button' onClick={submitHandler}>SEARCH!</button>
                <div className = 'margin center'> {errorMessage}</div>
                </div>
            </div>
            <div className='margin'>
            {resultMessage}
            </div>
            
        </div>
        
    </div>
    
  )
}

export default SearchBox