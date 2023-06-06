import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function Flock(props) {
    
    const navigator = useNavigate()
    const [feedMessage, setFeedMessage] = useState("")

    const submitHandler = () => {
        console.log(props.user.userFlock)
        
        axios.get(`http://localhost:8080/feedNeeds/calculateFeedNeeds/${props.user.userFlock.id}`)
        
            .then((response) =>{
                props.setUpdateUser({})
                setFeedMessage("Currently, on average your flock will eat: " + response.data.toFixed(1) + " oz of feed per week")
                console.log("Feed Needs Found")
                
            })
            .catch((e) =>{
                console.log("Failed to Find Feed Needs")
                setFeedMessage("Error: Could Not Calculate Feed Needs")
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
                             <th className='fill border'>Sex</th>
                             <th className='fill border'>Breed</th>
                             <th className='fill border'>Eggs Laid</th>
                         </tr>
                        {props.user.userFlock.chickensInFlock.map((chicken) => {
                           if (chicken.isDead === false && chicken.sex === "female"){
                            return (
                                

                                
                                <tr className='flex-row'>
                                    <td className='fill border'>  
                                        <a href = {`/Chicken/${chicken.id}`}>{chicken.name}</a>
                                    </td>
                                    <td className='fill border'>{chicken.birthdate}</td>
                                    <td className='fill border'>{chicken.sex}</td>
                                    <td className='fill border'>{chicken.breed}</td>
                                    <td className='fill border'>{chicken.eggsLaid}</td>
                                </tr>
                                
                            )
                            
                           } else if (chicken.isDead === false && chicken.sex === "male"){
                            return (
                                

                                
                                <tr className='flex-row'>
                                    <td className='fill border'>  
                                        <a href = {`/Chicken/${chicken.id}`}>{chicken.name}</a>
                                    </td>
                                    <td className='fill border'>{chicken.birthdate}</td>
                                    <td className='fill border'>{chicken.sex}</td>
                                    <td className='fill border'>{chicken.breed}</td>
                                    <td className='fill border'>N/A</td>
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
        <div className='flex-row third-width margin box'>
            <div className='colorScheme2 margin center'>
                <button onClick={submitHandler}>Get Feed Needs!</button>
            </div>
            <div className= 'margin center'>
                {feedMessage} 
            </div>
        </div>
        <div className='flex-column half-width container margin box2'>
            <h2 className='center'>{props.user.userName}'s Flock:</h2>
            {renderContents()}
        </div>
        
    </div>
  )
}

export default Flock