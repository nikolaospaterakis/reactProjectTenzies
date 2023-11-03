import React from "react";

export default function Die(props) {
    return (
        <div className="die-face"
        onClick={(props.holdDice)}>
            <h2 className="die-num" >{props.number}</h2>
        </div>
    )
    
}