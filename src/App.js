import React from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


export default function App() {

    const [tenzies, setTenzies] = React.useState(false)
    const [diceSet, setDiceSet] = React.useState(allNewDice)

    React.useEffect(() => {
       const allHeld = diceSet.every(dice => dice.isHeld)
       const firstValue = diceSet[0].value
       const allSame = diceSet.every(dice => dice.value === firstValue)
       if(allHeld && allSame) {
        setTenzies(true)
        console.log("You won!")
       }
    }, [diceSet])

    function allNewDice() {

        const randomDice = []
        
        for(let i=0;i<10;i++) {
            randomDice.push(generateNewDie())
        }
        return randomDice
    }

    function holdDice(idValue) {
        setDiceSet(prevDiceSet => prevDiceSet.map(dice => {
            return dice.id === idValue ? {...dice, isHeld: !dice.isHeld} : dice
        }))
    }

    function giveRandomDices() {
        if(!tenzies) {
            setDiceSet(prevDiceSet => prevDiceSet.map(dice => {
                return dice.isHeld === false ? generateNewDie() : dice
            }))
        } else {
            setTenzies(false)
            setDiceSet(allNewDice())
        }
    }

    const dices = diceSet.map(dice => {
        return (
            <div className={`title ${
                dice.isHeld === true ? "selected-dice" : ""
            }`}>
                <Die
                key={dice.id}
                number={dice.value}
                holdDice={() => holdDice(dice.id)}/>
            </div> 
        )
    })

    function generateNewDie() {
        return {
            value: Math.floor(Math.random()*6) + 1,
            isHeld: false,
            id: nanoid()
        }
    }

    return (
        <main>
            {tenzies && <Confetti/>}
            <h1>Tenzies</h1>
            <h4>Roll until all dice are the same.Click each die to freeze it at its current value between rolls</h4>
            <div className="dies">
                {dices}
            </div>
            <button className="roll-button" onClick={giveRandomDices}>
                {tenzies === true ? "New Game" : "Roll"}
            </button>
        </main> 
    ) 
}