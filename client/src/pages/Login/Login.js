import React, {useEffect, useState} from 'react';
// import {  signInWithEmailAndPassword   } from 'firebase/auth';
// import { auth } from '../../firebase/firebase';
import {  useNavigate } from 'react-router-dom'
import Navbar from "../../components/Navbar/Navbar"
import {GoogleButton} from "react-google-button"
import { UserAuth} from '../../context/AuthContext';
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
        if(user != null){
            navigate('/home')
        }
    },[user])
    return(
        <>
        <Navbar />
        <GoogleButton onClick={handleGoogleSignin}/>
        </>
    )
}
 
export default Login
