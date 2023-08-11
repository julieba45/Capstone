import React from "react";
import "./CircularProgress.css"

const CircularProgress = ({ percentage, label }) => {
    // Calculate the circumference of the circle
    const radius = 16;
    const circumference = 2 * Math.PI * radius;

    if(percentage > 90 && percentage <= 99){
      percentage = 90
    }
    const offset = circumference - (percentage / 100 * circumference);
    // console.log('--------flag', percentage)



    return (
      <div className="circular-progress">
        <svg viewBox="0 0 36 36" className="circular-chart">
          <circle className="circle-bg" cx="18" cy="18" r={radius} />
          <circle className="circle" cx="18" cy="18" r={radius} strokeDasharray={circumference} strokeDashoffset={offset} />
        </svg>
        <p className="progress-label">{label}</p>
      </div>
    );
  };
export default CircularProgress
