import React from 'react'
import { NavLink } from 'react-router-dom'
import peekCat from "../images/PeekCat.png"

const LostPage = () => {
  return (
    <>
      <div className="position-relative text-center">
        <h1>u seem 2 b lost..</h1><br />
        <NavLink to='/dashboard'><div className='btn btn-accent'>oh nyo</div></NavLink>
        <img className="h-[600px] w-auto object-contain absolute right-0 bottom-0" src={peekCat} />   
      </div>   


    </>
  )
}

export default LostPage