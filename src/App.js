import { Die } from './Die';
import './App.css';
import { useState, useEffect } from 'react';
import { nanoid } from "nanoid"


const App = () => {
  const [tenzies, setTenzies] = useState(false)

  const generateNewDice = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  const allNewDice = () => {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice())
    }
    return newDice
  }
  const [dice, setDice] = useState(allNewDice())
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld) /// .every method is used in Js when all the elements in the array will  follows the condition or something then it will be true
    const firstValue = dice[0].value
    const allValue = dice.every(die => die.value === firstValue)
    if (allHeld && allValue) {
      setTenzies(true)
      console.log("You won")
    }

  }, [dice])
  const rollDice = () => {
    if (!tenzies) {
      setDice(oldDice => oldDice.map((die) => {
        return die.isHeld ?
          die : generateNewDice()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }

  }

  const holdDice = (id) => {
    setDice(oldDice => oldDice.map((die) => {
      return die.id === id ? { ...die, isHeld: !die.isHeld }
        : die
    }))
  }

  return (
    <div className="bg-[#fdf7f7] flex flex-col justify-center items-center h-[400px] max-w-4xl m-auto mt-[150px]">
      <h1 className="mb-[40px] text-4xl">Tenzies</h1>
      <p className="mb-[40px]">Roll until all dice are the same. Click each die to freeze</p>
      <div className=" grid grid-cols-5 gap-[20px]">
        {dice.map(die => <Die
          key={die.id}
          value={die.value}
          isHeld={die.isHeld}
          holdDice={() => holdDice(die.id)}
        />)}
      </div>
      <button onClick={rollDice} className='bg-blue-700 h-[35px] w-[100px] my-[50px] rounded text-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none'>{tenzies ? "New Game" : "Roll"}</button>
    </div>
  );
}

export default App;
