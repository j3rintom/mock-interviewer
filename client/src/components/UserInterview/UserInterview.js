import React from 'react'
import "./UserInterview.css"
const UserIterview = ({interview}) => {
  return (
    <div className='userInterview'>
      <div className='performance'>
        <h3>Company: <span>{interview.company}</span></h3>
        <h3>Role: <span>{interview.role}</span></h3>
        <h3>Score: <span>{interview.score}</span></h3>
      </div>
      <div className='feedback-container'>
        <h3>Feedback</h3>
        <p>{interview.feedback}</p>
      </div>
    </div>
  )
}

export default UserIterview
