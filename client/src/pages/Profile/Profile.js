import React,{useEffect,useState} from 'react'

import Navbar2 from '../../components/Navbar2/Navbar2'
import "./Profile.css"
import { UserAuth} from '../../context/AuthContext';
import {  useNavigate } from 'react-router-dom'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import Footer from '../../components/Footer/Footer';
const Profile = () => {
  const navigate = useNavigate()
  const {logout,user}  = UserAuth()
  const [loading,setLoading] = useState(true)
  const handleLogout = async ()=>{
      try {
        await logout();
    } catch (error) {
        console.log(error);
    }
  }
  setTimeout(()=>{
    setLoading(false)
  },2000)
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
          <h3>{user.email}</h3>
          <img src={user.photoURL} alt={user.displayName} />
          <button className="button-24"  onClick={handleLogout}>Logout</button> 
        </div>
        <h2>Profile</h2>
        {loading?<LoadingComponent />:<>
        <div className='user-info'>
          <h3>Interview Summary</h3>
        </div>
        </>}
      </div>
      <Footer />
    </>
  )
}

export default Profile
