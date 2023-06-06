import React from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import '../../CSS/Reusables/chickenBox.css'
import { useEffect, useState } from 'react'

function AddChicken(props) {
       

    const [chicken, setChicken] = useState({name:"", birthdate:0, sex:"", breed:"", isDead:false, motherName:"", fatherName:"", motherId:0, fatherId:0})
    const [errorMessage, setErrorMessage] = useState("")
    

    const changeHandler = (event) => {
        
        const name = event.target.name
        let value; 
        if (event.target.type === "checkbox") {
            value = event.target.checked;
        } else {
            value = event.target.value
        }
        const tempChicken = { ...chicken }
        tempChicken[name] = value
        if (event.target.name === "motherName"){
            
            let motherId;
            for (let i = 0; i < event.target.children.length; i++){
                if (event.target.children[i].value === tempChicken.motherName){
                    motherId = event.target.children[i].id
                }
            }
            
            tempChicken.motherId = motherId
        } else if (event.target.name === "fatherName"){
            let fatherId;
            for (let i = 0; i < event.target.children.length; i++){
                if (event.target.children[i].value === tempChicken.fatherName){
                    fatherId = event.target.children[i].id
                }
            }
            
            tempChicken.fatherId = fatherId
        }
        setChicken(tempChicken)
    }

    

    const submitHandler = () => {
            console.log(chicken)
            chicken.zipCode = props.user.zipCode
            chicken.state = props.user.state
            axios.post("http://localhost:8080/chicken/create", chicken)
            .then( (response) => {
               // const chickenToAdd = response.data.id
               const newChicken = response.data
               axios.post(`http://localhost:8080/flock/addChickenToFlock/${props.user.userFlock.id}`, newChicken)
                .then(() =>{
                    props.setUpdateUser({})
                    console.log("uploaded")
                    setErrorMessage("Success! Chicken Added")
                })
                .catch((e) =>{
                    console.log("upload failed to add to flock")
                    setErrorMessage("Error: Chicken Failed to Upload")
                    console.log(e)
                })
                
            })
            .catch((e) => {
                console.log("upload failed")
                console.log(e)
                setErrorMessage("Error: Chicken Failed to Upload")
            })
        
        
    }

    const showOptionsMother = () => {
        
        return props.user.userFlock?.chickensInFlock.map((chicken) =>{
            if (chicken.sex === "female"){
                return(
                    <option name = "motherName" value = {chicken.name} id = {chicken.id}> {chicken.name}</option>
                    )
            
                }    
            } 

        )
    }
  
    const showOptionsFather = () => {
        
        return props.user.userFlock?.chickensInFlock.map((chicken) =>{
            if (chicken.sex === "male"){
                return(
                    <option name = "fatherName" value = {chicken.name} id = {chicken.id}> {chicken.name}</option>
                    )
            
                }    
            } 

        )
    }

    return (
    <div className='background fill center'>
    <div className= 'flex-column background2 box center'>
        <h1>ADD A CHICKEN:</h1>
        <div className= 'flex-column'> 
            <div className='flex-column'>
                <div className = 'margin center'>**When Adding Chickens its best to start with your oldest ones first**</div>
                <div className = 'margin center'>NAME: </div>
                <input className = 'colorScheme2' name="name" type = "name" onChange={changeHandler}/>
                <div className= 'margin center'>DATE OF BIRTH: </div>
                <input className = 'colorScheme2' name="birthdate" type = "date" onChange={changeHandler}/>
                <div className = 'margin center'>SEX: 
                <input className = 'colorScheme2' id = "sex" name="sex" type = "radio" value = "male" onChange={changeHandler}/>
                <label for="sex" name = "male" value = "male"> Rooster</label>
                <input className = 'colorScheme2' id = "sex" name="sex" type = "radio" value = "female" onChange={changeHandler}/>
                <label for="sex" name = "female" value = "female">Hen</label></div>
                <div className = 'margin center'>BREED: </div>
                <input className = 'colorScheme2' name="breed" type = "breed" onChange={changeHandler}/>
                <div className = 'margin center'>IS THIS CHICKEN DEAD*: 
                <input className = 'colorScheme2' name="isDead" type = "checkbox" onChange={changeHandler}/>
                </div>
                
                <div className = 'margin center'>MOTHER: </div>
                <select className = 'colorScheme2' name = "motherName" onChange={changeHandler}> 
                <option value = "Unknown">Unknown</option>
                {showOptionsMother()}
                </select>
                <div className = 'margin center'>FATHER: </div>
                <select className = 'colorScheme2' name = "fatherName" onChange={changeHandler}> 
                <option value = "Unknown">Unknown</option>
                {showOptionsFather()}
                </select>
                
                <div className = 'margin center'>
                <button className = 'colorScheme2' role = 'button' onClick={submitHandler}>SUBMIT!</button>
                <div className = 'margin center'> {errorMessage}</div>
                
                </div>
                <div className='center'>*Adding Dead Chickens will help build your Flock's family tree</div>
            </div>
        </div>
    
    
    </div>
    </div>
  )
}

export default AddChicken