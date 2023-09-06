import React, { useEffect } from 'react'
import Header from '../Header/Header'
import Lottie from "lottie-react";
import bgAnimta from'./HomePage_animate.json'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function HomePage() {
  const navigate=useNavigate()
  const admin =useSelector((state) => { 
    return state.userSlice.userInfo
  })
useEffect(() => { 
  if (!admin){
    navigate('/login')
  }
  
 },[])
  return (
    <div >
      <Header/>
      <div className="flex justify-center items-center h-[50%]  object-cover">
      <Lottie className=''  width={10} animationData={bgAnimta} loop={true} />
      </div>
      
    </div>
  )
}
