import React from 'react'
import './App.css'
import './CSS/Reusables/Header.css'
import Header from './Components/Reusables/Header'
import {Route, Routes} from 'react-router'
import Home from './Components/Pages/Home'
import SignUp from './Components/Pages/SignUp'
import { useEffect, useState } from 'react'
import SignIn from './Components/Pages/SignIn'
import Thanks from './Components/Pages/Thanks'
import WelcomeBack from './Components/Pages/WelcomeBack'
import PageWrapper from './Components/Reusables/PageWrapper'
import axios from 'axios'
import Delete from './Components/Pages/Delete'
import AddChicken from './Components/Pages/AddChicken'
import Flock from './Components/Pages/Flock'
import Chicken from './Components/Pages/Chicken'
import Eggs from './Components/Pages/Eggs'
import BreedInfo from './Components/Pages/BreedInfo'
import EditChicken from './Components/Pages/EditChicken'

function App() {
  const[isloading, setIsLoading] = useState(true)

  const [user, setUser] = useState({
    id: undefined,
    userName: "",
   // email: "",
    state: "",
    zipCode: "",
    userFlock: undefined,
    //roles: [],
  })

  const [updateUser, setUpdateUser] = useState({})
  
  useEffect(() => {
    let jwtToken = localStorage.getItem("token")
    
    if (jwtToken){
      axios.get('http://localhost:8080/user/getUser', {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      }) 
      .then((response) => {
        setUser({
          ...response.data,
        //  roles: response.data.roles.map(role => role.authority)
        });
       
      })
      .catch((e) => {
      console.log(e)
      localStorage.removeItem("token");
      })}
    }, [updateUser])

  return (
    <PageWrapper 
    user={user}
    setUser={setUser}
    >
      <Routes>
        <Route path = "/" element ={<Home/>}/>
        <Route path = "/user/signUp" element ={<SignUp user={user} setUser={setUser}/>}/>
        <Route path = "/user/signIn" element ={<SignIn user={user} setUser={setUser}/>}/>
        <Route path = "/Thanks" element={<Thanks user ={user} setUser={setUser}/>}/>
        <Route path = "/WelcomeBack" element={<WelcomeBack user ={user} setUser={setUser}/>}/>
        <Route path = "/user/delete" element = {<Delete user={user} setUser={setUser}/>}/>
        <Route path = "/AddChicken" element={<AddChicken user ={user} setUser={setUser} setUpdateUser={setUpdateUser}/>}/>
        <Route path = "/Flock" element={<Flock user={user} setUser={setUser} setUpdateUser={setUpdateUser}/>}/>
        <Route path = "/Chicken/:id" element={<Chicken user={user} setUser={setUser} setUpdateUser={setUpdateUser}/>}/>
        <Route path = "/Eggs" element={<Eggs user={user} setUser={setUser} setUpdateUser={setUpdateUser}/>}/>
        <Route path = "/BreedInfo" element={<BreedInfo user={user} setUser={setUser} setUpdateUser={setUpdateUser}/>}/>
        <Route path = "/EditChicken/:id" element={<EditChicken user={user} setUser={setUser} setUpdateUser={setUpdateUser}/>}/>
      </Routes>
    </PageWrapper>
  )
}

export default App;
