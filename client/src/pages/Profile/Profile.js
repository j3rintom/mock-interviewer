import React,{useEffect} from 'react'

import Navbar2 from '../../components/Navbar2/Navbar2'
import "./Profile.css"
import { UserAuth} from '../../context/AuthContext';
import {  useNavigate } from 'react-router-dom'
const Profile = () => {
  const navigate = useNavigate()
    const {logout,user}  = UserAuth()
  const handleLogout = async ()=>{
      try {
        await logout();
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
    if(user == null){
        navigate('/')
    }
},[user])
  return (
    <>
      <Navbar2 />
      <div className="profile-container">
        <div className='logout-container'>
        <h2>Profile</h2>
          <button className="button-24"  onClick={handleLogout}>Logout</button> 
        </div>
        <div className='user-info'>
        <img alt={user.displayName} src={user.photoURL} />
          <h1>{user.displayName}</h1>
          <h2>{user.email}</h2>
        </div>
      </div>
    </>
  )
}

export default Profile
