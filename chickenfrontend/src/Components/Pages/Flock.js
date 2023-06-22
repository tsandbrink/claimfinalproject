import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import NoUserFoundMessage from '../Reusables/NoUserFoundMessage'

function Flock(props) {
    
    const navigator = useNavigate()
    const [feedMessage, setFeedMessage] = useState("")


    const submitHandler = () => {
        
        let jwtToken = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${jwtToken}`
        };
        axios.get(`http://localhost:8080/feedNeeds/calculateFeedNeeds/${props.user.flock.id}`, {headers})
        
            .then((response) =>{
                props.setUpdateUser({})
                setFeedMessage("Currently, on average your flock will eat: " + (response.data/16).toFixed(1) + " lbs. of feed per week")
                console.log("Feed Needs Found")
                
            })
            .catch((e) =>{
                console.log("Failed to Find Feed Needs")
                setFeedMessage("Error: Could Not Calculate Feed Needs")
                console.log(e)
            })
           
    }

    const getChickenEggAverage = (chicken) => {
        const birthdate = new Date(chicken.birthdate)
        const today = new Date()
        //today - birthdate
        let ageInTime = today.getTime() - birthdate.getTime();
        let ageInDays = ageInTime / (1000 * 3600 * 24);
        let ageInWeeks = ageInDays /7;
        let eggsPerWeek = chicken.eggsLaid/ageInWeeks;
        return eggsPerWeek
        // let average
        // axios.get(`http://localhost:8080/chicken/findChickenEggAverage/${chickenId}`)
        
        //     .then((response) =>{
        //         console.log(response.data)
        //         average = response.data
        //         console.log(average)
        //         return average
        //     })
        //     .catch((e) =>{
 
        //         console.log(e)
        //     })
           
        
      }

    const renderContents = () => {
        
        if(props.user.flock === undefined) {

             
                navigator("/user/SignIn")
            

        } else {
            if (props.user.flock.chickensInFlock.length !== 0){
                
                return (
                    <table className='flex-column border margin'>
                         <tr className='flex-row'>
                             <th className='fill border'>Name</th>
                             <th className='fill border'>Birthdate</th>
                             <th className='fill border'>Sex</th>
                             <th className='fill border'>Breed</th>
                             <th className='fill border'>Eggs Laid</th>
                             <th className='fill border'>Eggs/Week</th>
                             <th className='fill border'>Edit Info</th>
                         </tr>
                        {props.user.flock.chickensInFlock.map((chicken) => {
                            
                           if (chicken.isDead === false && chicken.sex === "female"){
                            let eggAverage = getChickenEggAverage(chicken)
                            console.log(eggAverage)
                            return (
                                

                                
                                <tr className='flex-row'>
                                    <td className='fill border'>  
                                        <a href = {`/Chicken/${chicken.id}`}>{chicken.name}</a>
                                    </td>
                                    <td className='fill border'>{chicken.birthdate}</td>
                                    <td className='fill border'>{chicken.sex}</td>
                                    <td className='fill border'>{chicken.breed}</td>
                                    <td className='fill border'>{chicken.eggsLaid}</td>
                                    <td className='fill border'>{eggAverage.toFixed(2)}</td>
                                    <td className='fill border'>
                                        <a href = {`/EditChicken/${chicken.id}`}>Edit</a>
                                    </td>
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
                                    <td className='fill border'>N/A</td>
                                    <td className='fill border'>
                                        <a href = {`/EditChicken/${chicken.id}`}>Edit</a>
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


    const render = () => {
        console.log(props.user)
        if (props.user.id !== undefined){
            return (
                <div className='flex-column fill center background'>
                    <div className='flex-column pageHeader margin box2'>
                        <div className='margin center'>
                            <button className='button' onClick={submitHandler}>Get Feed Estimate!</button>
                        </div>
                        <div className= 'margin center'>
                            {feedMessage} 
                        </div>
                    </div>
                    <div className='flex-column pageBody container scroll margin flockBox'>
                        <h2 className='center'>{props.user.username}'s Flock:</h2>
                        {renderContents()}
                    </div>
                    
                </div>
              )
        } else {
            return(
                <NoUserFoundMessage/>
            )
            
        }
            
            
        
        
    }

  return (
    render()
  )
}

export default Flock