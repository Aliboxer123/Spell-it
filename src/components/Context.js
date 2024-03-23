import { createContext, useState } from "react";

export const GameContext = createContext()

export default function GameContextProvider({ children }) {
 const cupOptions = [{ containsBall: false, coords: '25%', Ycoords: '50%' },
        { containsBall: true, coords: '50%', Ycoords: '50%' },
        { containsBall: false, coords: '75%', Ycoords: '50%' }]
    const [cups, setCups] = useState(cupOptions)
    const [revealAnswer, setRevealAnswer] = useState(false)
    const [gameCountDown, setGameCountDown] = useState(3)
    const [minusOrPlus, setMinusOrPlus] = useState(['-', ''])
    const [rounds, setRounds] = useState(0)
    const [correct, setCorrect] = useState([false, false, false, false, false])
    const [answer, setAnswer] = useState('')
    const [isTimerPresent, setIsTimerPresent] = useState(true)
    const [isClickable, setIsClickable] = useState(false)
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [finishedGame, setFinishedGame] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
     const roundLevels = rounds == 0 ? 1000 : rounds == 1 ? 900 : 
            rounds == 2 ? 700 : rounds == 3 ? 300 : rounds == 4 ? 200 : 
            rounds == 5 ? 100 : ''
    const [roundLevel, setRoundLevel] = useState(roundLevels)
    return <GameContext.Provider value={{
        cups, setCups, revealAnswer, setRevealAnswer, gameCountDown, setGameCountDown,
        minusOrPlus, rounds, setRounds, correct, setCorrect, answer, setAnswer, setCorrect,
        isTimerPresent, setIsTimerPresent, isClickable, setIsClickable, isTimerRunning, setIsTimerRunning,
    finishedGame, setFinishedGame, roundLevel, isVisible, setIsVisible}}>{children}</GameContext.Provider>    
}