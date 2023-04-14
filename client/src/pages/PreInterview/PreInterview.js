import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from "axios"
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent"
import "./PreInterview.css"
const PreInterview = () => {
  const { id } = useParams()
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    document.title = 'Instructions'
    axios.get(`http://localhost:5000/interview/${id}`)
      .then(response => {
        setDetails(response.data)
        setLoading(false)
      })
  }, [id])
  return (
    <>
      {
        loading ? <LoadingComponent /> :
          <div className='pre-container'>
            <div className='pre-header'>
              <h1>Ready To Start Your Interview?</h1>
            </div>
            <div className='pre-content'>
              <div className='interview-det'>
                <h1>Interview Details</h1>
                <h2>{details.company}'s {details.role} Interview</h2>
              </div>
              <div className='pre-instructions'>
                <h1>Instructions</h1>
                <p>
                1. Find a quiet room for the interview.<br />
                2. Make sure you have a reliable internet connection.<br />
                3. Test your microphone and speakers/headphones before the interview to ensure that they are working properly.<br />
                4. Speak clearly and at a moderate pace.<br />
                </p>
              </div>
              <div className='int-start-cont'>
                <Link className='button-28' to={`/interview/${id}/start`}>Start</Link>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default PreInterview
