import React,{useEffect,useState} from 'react'

import Navbar2 from '../../components/Navbar2/Navbar2'
import "./Profile.css"
import { UserAuth} from '../../context/AuthContext';
import {  useNavigate } from 'react-router-dom'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate()
  const {logout,user}  = UserAuth()
  const [loading,setLoading] = useState(true)
  const [userData,setUserData] = useState([])
  const [interviewCount,setInterviewCount] = useState(0)
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
},[user,navigate])

useEffect(()=>{
  axios.get(`http://localhost:5000/user/${user.uid}`).then((response)=>{
    setUserData(response.data)
    console.log(response.data);
    setLoading(false)
  }).catch((err)=>{
    console.log(err);
  })
  document.title = 'Profile'
},[user.uid])
useEffect(()=>{
  axios.get(`http://localhost:5000/userInterview/${user.uid}`).then((response)=>{
    setInterviewCount(response.data.length)
  })
},[user.uid])
  return (
    <>
      <Navbar2 />
      <div className="profile-container">
        <div className='logout-container'>
            <h3>{user.email}</h3>
            <img src={user.photoURL} alt={user.displayName} />
            <button className="button-24"  onClick={handleLogout}>Logout</button> 
        </div>
        {/* <h2>Profile</h2> */}
        {loading?<LoadingComponent />:<>
          <div className='user-info'>
            <h3>Interview Summary</h3>
            <div className='userStats'>
              <div className='stats'>
                <h1>Score</h1>
                <div className='circle-card'>
                {!loading&&userData?<h4>{userData.score}</h4>:<LoadingComponent />}
                </div>
              </div>
              <div className='stats'>
                <h1>Interview Count</h1>
                <div className='circle-card'>
                  {!loading&& userData?<h4>{interviewCount}</h4>:<LoadingComponent />}
                </div>
              </div>
            </div>
          </div>
        </>}
      </div>
      <Footer />
    </>
  )
}

export default Profile
