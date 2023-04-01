import React, { useState } from 'react'
import Card from '../../components/Card/Card'
import Navbar2 from '../../components/Navbar2/Navbar2'
import "./Home.css"
const Home = () => {
  const [company,setCompany] = useState("")
  const [role,setRole] = useState("")
  const [interviews,setInterviews] = useState([])
  const handleSearch = ()=>{
    // filter interviews
  }
  return (
    <>
    <Navbar2 />
    <div className='home-container'>
      <div className='reccs'>
        <h4>Popular Interviews</h4>
        <div className='card-container'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <div className='interview-container'>
        <div className='search-interview'>
          <select onChange={(e)=> setCompany(e.value)}>
            <option >Google</option>
            <option>Google</option>
            <option>Google</option>
          </select>
          <select onChange={(e)=> setRole(e.value)}>
            <option>Software Developer</option>
            <option>Software Engineer</option>
            <option>Analyst</option>
            <option>Intern</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
