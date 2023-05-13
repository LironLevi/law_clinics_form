import React from "react";

export default function StepNav({num, discription}) {
    return(
    <div className="step-nav">
        <div className="circle">
          <div className="circle-text">{num}</div>
        </div>
        <div className="text-side">{discription}</div>
    </div>
    );
}