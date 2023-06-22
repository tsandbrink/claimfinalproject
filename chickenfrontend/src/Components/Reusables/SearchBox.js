import React, { useEffect, useState } from 'react'
import axios from 'axios'

function SearchBox(props) {
  
    const [searchCriteria, setSearchCriteria] = useState({breed:"", state:""})
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
        let jwtToken = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${jwtToken}`
        };

        axios.get(`http://localhost:8080/chicken/getAverageByStateAndBreed/${searchCriteria.state}/${searchCriteria.breed}`, {headers})
        
            .then((response) =>{
                
                setResultMessage("\nThere are  " + response.data[0] + " " + searchCriteria.breed + " hens kept by MyFlock users in " + searchCriteria.state + ". Users report that on average they lay " + response.data[1].toFixed(2) + " eggs per week.")
                console.log("Result Found")
                
            })
            .catch((e) =>{
                
                setResultMessage("No Results Matched Your Criteria")
                console.log(e)
            })
           
    }

    return (
    <div className= 'flex-column sign-up-box third-width center margin'>
        <h1 className='center margin'>LOOK UP BREED INFO BY STATE:</h1>
        <div className= 'flex-column fill'> 
            <div className='flex-column'>
                <div className = 'margin center'>BREED NAME: </div>
                <input className = 'margin colorScheme2' name="breed" type = "breed" onChange={changeHandler}/>
                
                <div className = 'margin center'>STATE: </div>
                <select className = 'margin colorScheme2' name="state" type = "state" onChange={changeHandler}>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                    <option value="AS">American Samoa</option>
                    <option value="GU">Guam</option>
                    <option value="MP">Northern Mariana Islands</option>
                    <option value="PR">Puerto Rico</option>
                    <option value="UM">United States Minor Outlying Islands</option>
                    <option value="VI">Virgin Islands</option>
                </select>
                
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