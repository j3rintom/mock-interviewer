import "./InterviewCard.css"
import React from 'react'
import NorthEastIcon from '@mui/icons-material/NorthEast';
const InterviewCard = ({company,role}) => {
  return (
    <div className="interview-card">
      <h2>{company}</h2>
      <h2>{role}</h2>
      <button><NorthEastIcon /></button>
    </div>
  )
}

export default InterviewCard
