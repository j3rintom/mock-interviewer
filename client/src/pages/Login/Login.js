import React, {useEffect} from 'react';
import {  useNavigate } from 'react-router-dom'
import {GoogleButton} from "react-google-button"
import { UserAuth} from '../../context/AuthContext';
import "./Login.css"
const Login = () => {
    const navigate = useNavigate()
    const {googleSignin,user}  = UserAuth()
    const handleGoogleSignin = async ()=>{
        try {
            await googleSignin();
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        document.title = 'Login'
      },[])
    useEffect(()=>{
        if(user != null){
            navigate('/home')
        }
    },[user,navigate])
    return(
        <>
        <div className='login-container'>
                <h1>Ready to get started?</h1>
                <h3>( Login using your college mail id ) </h3>
                <GoogleButton onClick={handleGoogleSignin}/>
                <h3>PS : Our services are only available for students of MEC right now due to scalability issues.</h3>
        </div>
        </>
    )
}
 
export default Login
