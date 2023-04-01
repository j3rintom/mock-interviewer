import React, { useState } from 'react'
import Card from '../../components/Card/Card'
import Navbar2 from '../../components/Navbar2/Navbar2'
import InterviewCard from "../../components/InterviewCard/InterviewCard"
import "./Home.css"
const Home = () => {
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [interviews, setInterviews] = useState([])
  const handleSearch = () => {
    // filter interviews
    console.log(company, role);
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
            <select placeholder='Company' onChange={(e) => setCompany(e.target.value)}>
              <option value="" disabled="disabled" selected="selected">Company</option>
              <option >Google</option>
              <option>Google</option>
              <option>Google</option>
            </select>
            <select onChange={(e) => setRole(e.target.value)}>
              <option value="" disabled="disabled" selected="selected">Role</option>
              <option>Software Developer</option>
              <option>Software Engineer</option>
              <option>Analyst</option>
              <option>Intern</option>
            </select>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className='interview-list'>
            <div className="interview-header">
              <h3>Available Interviews</h3>
            </div>
            {
              interviews == [] ? <><InterviewCard company="Company" role="Role" />
              <InterviewCard company="Company" role="Role" /> </>: <h2>No Matching Interviews</h2>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
