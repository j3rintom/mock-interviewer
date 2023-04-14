import React, { useEffect } from 'react'
import Navbar2 from '../../components/Navbar2/Navbar2'
import "./Evaluation.css"
import Footer from '../../components/Footer/Footer'
const Evaluation = () => {
  useEffect(()=>{
    document.title = 'Evaluation'
  })
  return (
    <>
      <Navbar2 />
      <div className='evaluation-container'>
        
      </div>
      <Footer />
    </>
  )
}

export default Evaluation
