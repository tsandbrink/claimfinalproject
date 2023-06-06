import React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import chickenBox from '../../CSS/Reusables/chickenBox.css'



function Chicken(props) {
  const params = useParams()
  const [ancestors, setAncestors] = useState([])
  const [rowsNeeded, setRowsNeeded] = useState([]) 
  const [chicken, setChicken] = useState([])
  

    useEffect(()=> {
        axios.get(`http://localhost:8080/chicken/findChickenAncestorsById/${params.id}`)
        .then((response) => {
            setAncestors(response.data)
            
        }).catch((e) => {
            console.log(e)
        })
        axios.get(`http://localhost:8080/chicken/findChickenById/${params.id}`)
        .then((response) => {
            setChicken(response.data)
            
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    const showChickenFamilyTree3 = (number, number2) => { // loop through my coordinates 
        let isPositionFilled = false
        return ancestors.map((chicken) => {
            

            return chicken.treeNodes.map((treeNode) => { 
                console.log(chicken.name + treeNode)
                if (chicken.isDead === true && number === treeNode.generation && number2 === treeNode.position){ 
                    isPositionFilled = true
                    return(
                        <div className='flex-column dead-chicken-box margin center' id = {chicken.id} >
                             <a className = 'flex-column' href = {`/Chicken/${chicken.id}`}> {chicken.name} </a>
                             <div className='flex-row'>
                            <div className = 'margin'> Breed: {chicken.breed}</div>
                            <div className='margin'>Birthdate: {chicken.birthdate}</div>
                            
                            </div>
                        </div>
                        )
                } else if (chicken.sex === "male" && number === treeNode.generation && number2 === treeNode.position) {
                    isPositionFilled = true
                    return(
                        <div className='flex-column male-chicken-box margin center' id = {chicken.id}>
                             <a className = 'flex-column' href = {`/Chicken/${chicken.id}`}> {chicken.name} </a>
                             <div className='flex-row'>
                            <div className = 'margin'> Breed: {chicken.breed}</div>
                            <div className='margin'>Birthdate: {chicken.birthdate}</div>
                           
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
            return (<div className = 'flex-row center'>{showChickenFamilyTree2(number)}</div>)
               
                
                
        })
       
    }

    const showChickenFamilyTree2 = (number) => {
            const positions = []

            for (let i = 1; i <= 2**(number-1); i++ ){
                positions.push(i)
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

    return (
        
        <div className='flex-column background2 scroll fill container'>
            <div className='flex-column center'>
                
                <div>
                {findRowsNeeded()}
                <h1 className='underline'>{chicken.name}'s Lineage</h1>
                </div>
                <div className='flex-column center'>
                {showChickenFamilyTree()}
                </div>                
                
            </div>
                
           
        </div>
        
        
  )
}

export default Chicken