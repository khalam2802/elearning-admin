import React from 'react'
import Header from '../Header/Header'
import Lottie from "lottie-react";
import bgAnimta from'./HomePage_animate.json'
export default function HomePage() {
  return (
    <div >
      <Header/>
      <div className="flex justify-center items-center h-[50%]  object-cover">
      <Lottie className=''  width={10} animationData={bgAnimta} loop={true} />
      </div>
      
    </div>
  )
}
