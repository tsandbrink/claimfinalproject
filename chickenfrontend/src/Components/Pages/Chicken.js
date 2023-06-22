import React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import chickenBox from '../../CSS/Reusables/chickenBox.css'
import NoUserFoundMessage from '../Reusables/NoUserFoundMessage'


function Chicken(props) {
  const params = useParams()
  const [ancestors, setAncestors] = useState([])
  const [rowsNeeded, setRowsNeeded] = useState([]) 
  const [chicken, setChicken] = useState([])
  let desiredZoomLevel = 1;

    useEffect(()=> {
        let jwtToken = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${jwtToken}`
        };
        axios.get(`http://localhost:8080/chicken/findChickenAncestorsById/${params.id}`, {headers})
        .then((response) => {
            setAncestors(response.data)
            
        }).catch((e) => {
            console.log(e)
        })
        axios.get(`http://localhost:8080/chicken/findChickenById/${params.id}`, {headers})
        .then((response) => {
            setChicken(response.data)
           
        }).catch((e) => {
            console.log(e)
        })
        
       
        
          
    }, [])

    const zoomOut = () => {
            // Set the desired zoom level (1.0 = 100% zoom)
            desiredZoomLevel += .25;

            // Calculate the scale factor based on the desired zoom level
            const scaleFactor = 1 / desiredZoomLevel;
    
            // Get a reference to the element you want to zoom
            const element = document.getElementById('familyTree');
    
            // Apply the CSS transform property to the element
            if (element) {
                element.style.transform = `scale(${scaleFactor})`;
               
            }
    }

    const zoomIn = () => {
        // Set the desired zoom level (1.0 = 100% zoom)
        if (desiredZoomLevel > 1){
            desiredZoomLevel -= .25;
        }
        

        // Calculate the scale factor based on the desired zoom level
        const scaleFactor = 1 / desiredZoomLevel;

        // Get a reference to the element you want to zoom
        const element = document.getElementById('familyTree');

        // Apply the CSS transform property to the element
        if (element) {
            element.style.transform = `scale(${scaleFactor})`;
           
        }
}

    const showChickenFamilyTree3 = (number, number2) => { // loop through my coordinates 
        let isPositionFilled = false
        return ancestors.map((chicken) => {
            

            return chicken.treeNodes.map((treeNode) => { 
                
                if (chicken.isDead === true && number === treeNode.generation && number2 === treeNode.position && chicken.sex === 'female'){ 
                    isPositionFilled = true
                    return(
                        <div className='flex-column dead-chicken-box margin center' id = {chicken.id} >
                             <a className = 'flex-column' href = {`/Chicken/${chicken.id}`}> {chicken.name} </a>
                             <div className='flex-row'>
                            <div className = 'margin'> Breed: {chicken.breed}</div>
                            <div className='margin'>Birthdate: {chicken.birthdate}</div>
                            <div className='margin'>Eggs Laid: {chicken.eggsLaid}</div>
                            </div>
                        </div>
                    )
                } else if(chicken.isDead === true && number === treeNode.generation && number2 === treeNode.position) {
                    isPositionFilled = true
                    return(
                        <div className='flex-column dead-chicken-box margin center' id = {chicken.id} >
                             <a className = 'flex-column' href = {`/Chicken/${chicken.id}`}> {chicken.name} </a>
                             <div className='flex-row'>
                            <div className = 'margin'> Breed: {chicken.breed}</div>
                            <div className='margin'>Birthdate: {chicken.birthdate}</div>
                            <div className='margin'>Eggs Laid: N/A</div>
                            </div>
                        </div>
                    )
                } 
                else if (chicken.sex === "male" && number === treeNode.generation && number2 === treeNode.position) {
                    isPositionFilled = true
                    return(
                        <div className='flex-column male-chicken-box margin center' id = {chicken.id}>
                             <a className = 'flex-column' href = {`/Chicken/${chicken.id}`}> {chicken.name} </a>
                             <div className='flex-row'>
                            <div className = 'margin'> Breed: {chicken.breed}</div>
                            <div className='margin'>Birthdate: {chicken.birthdate}</div>
                            <div className='margin'>Eggs Laid: N/A</div>
                            </div>
                            
                        </div>
                    )
                } else if (chicken.sex === "female" && number === treeNode.generation && number2 === treeNode.position){
                    isPositionFilled = true
                    return(
                        <div className='flex-column female-chicken-box margin center' id = {chicken.id}>
                             <a className = 'flex-column' href = {`/Chicken/${chicken.id}`}> {chicken.name} </a>
                             <div className='flex-row'>
                            <div className = 'margin'> Breed: {chicken.breed}</div>
                            <div className='margin'>Birthdate: {chicken.birthdate}</div>
                            <div className='margin'>Eggs Laid: {chicken.eggsLaid}</div>
                            </div>
                            
                        </div>
                    )
                }  else if (isPositionFilled === false && ancestors.indexOf(chicken) === ancestors.length-1 && chicken.         treeNodes.indexOf(treeNode) === chicken.treeNodes.length -1) {
                    isPositionFilled = true
                    return(
                        <div className='flex-column ghost-chicken-box margin center'>
                            <div className = 'flex-column'> ghostChicken </div>
                            <div className='flex-row'>
                                <div className = 'margin'> Breed: </div>
                                <div className='margin'>Birthdate: </div>
                            </div>
                            
                        </div>
                    )
                }
            })
            
        })
    }

    const showChickenFamilyTree = () => {
        
       
        return rowsNeeded.map((number) => {      
            const maxNumber = rowsNeeded[0]
            let index = 0
            for (let i = 0; i < (maxNumber - number); i++){
                index += 2**i;
            }      
            return (<div className = 'flex-row center'>{showChickenFamilyTree2(number, maxNumber, index)}</div>)            
                
        })
       
    }

    const showChickenFamilyTree2 = (number, maxNumber, index) => {
            const positions = []

            if (maxNumber === number){
                for (let i = 1; i <= (2**(maxNumber-1)); i++ ){
                    positions.push(i)
                }
            } else if (number === 1){
                positions.push(1)
            } else {
                for (let i = 1; i <= (2**((maxNumber-1)) - index); i++ ){
                    positions.push(i)
                }
            }
            
            return positions.map((number2) => {
                return (<div className='flex-column center'>{showChickenFamilyTree3(number, number2)}</div>)
            })
    }

    const findRowsNeeded = () => {
        
        for (let i = 0; i < ancestors.length; i++){
            for (let j = 0; j < ancestors[i].treeNodes.length; j++){
                if (!rowsNeeded.includes(ancestors[i].treeNodes[j].generation)){
                    rowsNeeded.push(ancestors[i].treeNodes[j].generation)
                }
            }             
            
        }

       
        rowsNeeded.sort()
        
        rowsNeeded.reverse()
        //tree.reverse()
        
        
        //return rowsNeeded
    }

    const checkForChickenInUserFlock = () => {
        let containsChicken = false;
        for (let i = 0; i < props.user.flock?.chickensInFlock.length; i++){
            if (props.user.flock.chickensInFlock[i].id == params.id){
                containsChicken = true;
            }
        }
        return containsChicken;
    }

    const render = () => {
        if (props.user.id !== undefined && checkForChickenInUserFlock() === true){
            return (
        
                <div className='flex-column background2 scroll2 fill container'>
                    <div className='positionFixed flex-row'>
                        
                            <div className='flex-column'>
                                <button className = 'colorScheme2 margin center button' role = 'button' onClick={zoomIn}>+</button>
                                <button className = 'colorScheme2 margin center button' role = 'button' onClick={zoomOut}>-</button>
                                
                            </div>
                            <div className = "flex-row center">
                                    <div className='female-chicken-box-key smallMargin'>Hen</div>
                                    <div className='male-chicken-box-key smallMargin'>Rooster</div>
                                    <div className='dead-chicken-box-key smallMargin'>Dead</div>
                            </div>
                        
                    </div>
                    <div className='flex-column center' id = 'familyTree'>
                        
                        <div className='flex-row center margin'>
                        {findRowsNeeded()}
                        <h1 className='underline'>{chicken.name}'s Lineage</h1>
                        </div>
                        <div className='flex-column centerTop'>
                        
                        {showChickenFamilyTree()}
                        </div>    
                        <div>
                        <a className='margin' href = {`/EditChicken/${chicken.id}`}>Edit {chicken.name}</a>
                        </div>            
                        
                    </div>
                    
                   
                </div>
                
                
          )
        } else if (props.user.id !== undefined){
            return (
                <div>ERROR: CHICKEN NOT FOUND IN FLOCK</div>
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

export default Chicken