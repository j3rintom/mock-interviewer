import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import Navbar2 from '../../components/Navbar2/Navbar2'
import InterviewCard from "../../components/InterviewCard/InterviewCard"
import axios from "axios"
import "./Home.css"
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import Footer from '../../components/Footer/Footer'
const Home = () => {
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [interviews, setInterviews] = useState([])
  const [interviewData, setInterviewData] = useState([])
  const [interviewList,setInterviewList] = useState([])
  const [loading,setLoading] = useState(true)
  const handleSearch = (e) => {
    console.log(interviewList);
    if(company!=="" && role!==""){
      const newData = interviewList.filter(i=>i.company===company && i.role===role)
      setInterviews(newData)
    }
    else if(company!==""){
      const newData = interviewList.filter(i=>i.company===company)
      setInterviews(newData)
    }
    else if(role!==""){
      const newData = interviewList.filter(i=> i.role===role)
      setInterviews(newData)
    }
    
    console.log(interviews);
  }
  useEffect(() => {
    document.title = 'Home'
    axios.get('http://localhost:5000/interview')
      .then(response => {
        setInterviewData(response.data)
        setInterviewList(response.data)
        setInterviews(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error);
      });
    
  }, [interviewData])
  
  return (
    <>
      <Navbar2 />
      <div className='home-container'>
        <div className='reccs'>
          <h4>Popular Interviews</h4>
          <div className='card-container'>
            {loading?<LoadingComponent />:interviews.length!==0?interviewData.map((d)=> <Card data={d} />):<h2>No Available Interviews</h2>}
          </div>
        </div>
        <div className='interview-container'>
          <div className='search-interview'>
            <select onChange={(e) => setCompany(e.target.value)}>
              <option value="" disabled="disabled" selected="selected">Company</option>
              {
                interviewData.map((element) => {
                  return <option key={element._id} value={element.company}>{element.company}</option>
                })
              }
            </select>
            <select onChange={(e) => setRole(e.target.value)}>
              <option value="" disabled="disabled" selected="selected">Role</option>
              {
                interviewData.map((element) => {
                  return <option key={element._id} value={element.role}>{element.role}</option>
                })
              }
            </select>
            <button onClick={handleSearch}>Search</button>
            <button onClick={()=> {
              setInterviews(interviewList)
            }
          }>Reset</button>
          </div>
          <div className='interview-list'>
            <div className="interview-header">
              <h3>Available Interviews</h3>
            </div>
            {
              loading?<LoadingComponent />:
              interviews.length !==0 ? <>
                {
                  interviews.map((element) => {
                    return <InterviewCard key={element._id} data={element} />
                  })
                }
              </> : <h2>No Available Interviews</h2>
            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
