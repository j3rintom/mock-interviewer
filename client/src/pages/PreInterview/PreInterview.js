import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
const PreInterview = () => {
  const {id} = useParams()
  const [details,setDetails] = useState({})
  useEffect(()=>{
    axios.get(`http://localhost:5000/interview/${id}`)
    .then(response =>{
      setDetails(response.data)
    })
  },[])
  return (
    <div>
      Interview details 
      company - {details.company}
      
    </div>
  )
}

export default PreInterview
