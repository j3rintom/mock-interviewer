import React from 'react'
import { NavLink } from "react-router-dom"
import "./Navbar2.css"
const Navbar2 = () => {
  return (
    <div className='navbar2'>
      <div className="nav-con-1">
        <h1>EIRA</h1>
      </div>
      <div className="nav-con-2">
        <ul>
          <li><NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          } to="/home" style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "800" : "",
              
            };
          }}>Home</NavLink></li>
          <li><NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          } to="/evaluation" style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "800" : "",
              
            };
          }}>Evaluation</NavLink></li>
          <li> <NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          } to="/profile" style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "800" : "",
              
            };
          }}>Profile</NavLink></li>
          
        </ul>
      </div>
    </div>
  )
}

export default Navbar2
