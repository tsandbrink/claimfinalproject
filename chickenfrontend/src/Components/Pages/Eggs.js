import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function Flock(props) {
    
    const [errorMessage, setErrorMessage] = useState("")
    
    const navigator = useNavigate()

    const submitHandler = (chicken) => {
        chicken.eggsLaid+=1;
        console.log(chicken)
        axios.post("http://localhost:8080/chicken/updateChicken", chicken)
        
            .then((response) =>{
                props.setUpdateUser({})
                console.log("uploaded")
                
            })
            .catch((e) =>{
                console.log("upload failed to add to flock")
                setErrorMessage("Error: Egg Failed to Upload")
                console.log(e)
            })
           
    }

    const renderContents = () => {

        if(props.user.userFlock === undefined) {

            return (
                navigator("/SignIn")
            )

        } else {
            if (props.user.userFlock.chickensInFlock.length !== 0){
                
                return (
                    <table className='flex-column border margin'>
                         <tr className='flex-row'>
                             <th className='fill border'>Name</th>
                             <th className='fill border'>Birthdate</th>
                             <th className='fill border'>Breed</th>
                             <th className='fill border'>Eggs Laid</th>
                             <th className='fill border'>Add Egg</th>
                         </tr>
                        {props.user.userFlock.chickensInFlock.map((chicken) => {
                           if (chicken.isDead === false && chicken.sex === "female"){
                            return (
                                

                                
                                <tr className='flex-row'>
                                    <td className='fill border'>  
                                        <a href = {`/Chicken/${chicken.id}`}>{chicken.name}</a>
                                    </td>
                                    <td className='fill border'>{chicken.birthdate}</td>
                                    <td className='fill border'>{chicken.breed}</td>
                                    <td className='fill border'>{chicken.eggsLaid}</td>
                                    <td className='fill border center'> 
                                        <button class-name = 'center margin' role = 'button' id = {chicken} onClick={() => submitHandler(chicken)}>Add Egg!</button>
                                        
                                    </td>
                                </tr>
                                
                            )
                           } 
                            
                        })}
                    </table>
                )
                
            } else {
                return (
                        <div className='flex-column body center margin'>
                            <div>YOUR FLOCK HAS NO CHICKENS. ADD SOME ON THE ADD CHICKEN TAB.</div>
                            
                        </div>
                )
            }
        }
    }

  return (
    <div className='flex-column fill center background'>
        
        <div className='flex-column half-width container margin box2'>
            
            <h2 className='center'>Which Hens Layed Today?</h2>
            {renderContents()}
            <h3 className='center'>{errorMessage}</h3>
        </div>
        
    </div>
  )
}

export default Flock