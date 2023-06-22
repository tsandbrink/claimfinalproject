import React from 'react'
import signUpBox from '../../CSS/Reusables/signUpBox.css'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

function SignUpBox(props) {
  
    const [errorMessage, setErrorMessage] = useState("")

    const navigator = useNavigate()

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempUser = { ...props.user };
        tempUser[name] = value;
        props.setUser(tempUser)
    }

    const submitHandler = () => {
        if (props.user.userName !== '' && props.user.password !== '' && props.user.userEmail !=='' && props.user.zipCode !== '' && ValidateEmail() !== false){
            console.log(props.user)
                axios.post("http://localhost:8080/auth/register", props.user)
            .then((response) => {
                localStorage.setItem("token", response.data.jwt);
                // const decodedToken = jwt_decode(response.data.jwt);
                // const updatedUser = {
                //     id: decodedToken.userId,
                //     username: decodedToken.sub,
                //     email: decodedToken.email,
                //     state: decodedToken.state,
                //     zipCode: decodedToken.zipCode,
                //  //   roles: decodedToken.roles
                // };
    
                //props.setUser(updatedUser);
                navigator("/Thanks")
                // localStorage.setItem("userCookie", response.data.userName)
                // props.setUser(response.data)
                // console.log(props.user)
                // navigator("/Thanks")
            })
            .catch((e) => {
                console.log(e)
                setErrorMessage("Invalid UserName/Password/Email")
            })
        }
        else{
            setErrorMessage("Invalid UserName/Password/Email")
        }
        
    }

    function ValidateEmail()
    {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!regex.test(props.user.email))
        {
            alert("This is not a valid email address");
            console.log("invalid Email")
            return false;
            }
    }

    return (
    <div className= 'flex-column sign-up-box center'>
        <h1>SIGN UP AND JOIN THE FLOCK</h1>
        <div className= 'flex-column'> 
            <div className='flex-column'>
                <div className = 'margin center'>USERNAME: </div>
                <input className = 'colorScheme2' name="userName" type = "userName" onChange={changeHandler}/>
                <div className= 'margin center'>PASSWORD: </div>
                <input className = 'colorScheme2' name="password" type = "password" onChange={changeHandler}/>
                <div className = 'margin center'>EMAIL: </div>
                <input className = 'colorScheme2' name="email" type = "email" onChange={changeHandler}/>
                <div className = 'margin center'>ZIP CODE: </div>
                <input className = 'colorScheme2' name="zipCode" type = "zipCode" onChange={changeHandler}/>
                <div className = 'margin center'>STATE: </div>
                <select className = 'colorScheme2' name="state" type = "state" onChange={changeHandler}>
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
                <button className = 'colorScheme2 button' role = 'button' onClick={submitHandler}>SUBMIT!</button>
                <div className = 'margin center'> {errorMessage}</div>
                </div>
            </div>
        </div>
    
    
    </div>
  )
}

export default SignUpBox