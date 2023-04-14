import React, { useEffect } from 'react'
import "./Landing.css"
import Navbar from "../../components/Navbar/Navbar"
import { Link } from "react-router-dom";
const Landing = () => {
  useEffect(()=>{
    document.title = 'Mock Interviewer'
  },[])
  return (
    <>
    <Navbar />
    <div className='landing-container'>
      <div className='uhalf'>
        <h1>A Realistic Interview <span>Experience.</span></h1>
      </div>
      <div className='lhalf'>
      <Link className="button-28" to="/login">Get Started</Link>
      </div>
    </div>
    </>
  )
}

export default Landing
