import { useContext, useEffect, useRef } from 'react'
import backgroundImage from '../images/Casino-table.jpg'
import { Link } from 'react-router-dom'
import { shuffle } from '../utilities'
import { GameContext } from './Context'
export default function Game() {
    const gameCountRef = useRef(null)
    const timerRef = useRef(null)
    const { cups, setCups, revealAnswer, setRevealAnswer, gameCountDown, setGameCountDown,
        minusOrPlus, rounds, setRounds, correct, answer, setAnswer, setCorrect,
        isTimerPresent, setIsTimerPresent, isClickable, setIsClickable, isTimerRunning, setIsTimerRunning,
    finishedGame, setFinishedGame, roundLevel} = useContext(GameContext)
    
    useEffect(() => {
    startGame()    
        return () => {
            if (gameCountRef.current) {
     clearInterval(gameCountRef.current) 
            }  
            if (timerRef.current) {
            clearTimeout(timerRef.current)    
            }
 }       
    }, [gameCountDown])
    function startGame() {
        gameCountRef.current = setInterval(() => {
            setGameCountDown(oldValue => oldValue > 0 ? oldValue - 1 : oldValue)
        }, 1000);
        if (gameCountDown == 0) {
            if (rounds < 5) {
                setTimeout(() => {
                    setIsTimerPresent(false)
                }, 1000);
                    setRevealAnswer(true)
                    setIsTimerRunning(true)
                    timerRef.current = setTimeout(() => {
                        setRevealAnswer(false)
                        rearrangeCups()
                        setTimeout(() => {
                            rearrangeCups()
                            setTimeout(() => {
                                rearrangeCups()
                                setTimeout(() => {
                                    rearrangeCups()
                                    setTimeout(() => {
                                        rearrangeCups()
                                      setTimeout(() => {
                                          rearrangeCups()
                                          setTimeout(() => {
                                              rearrangeCups()
                                              setTimeout(() => {
                                                  resetCups()
                                                  setIsClickable(true)
                                              }, roundLevel);
                                          }, roundLevel);
                                      }, roundLevel);  
                                    }, roundLevel);
                                }, roundLevel);
                            }, roundLevel);
                        }, roundLevel);
                    }, roundLevel);
            }
}     
    }
    
    function rearrangeCups() {
            const randomIndex = Math.floor(Math.random() * minusOrPlus.length)
            let cupCopy = [...cups]
            const newCups = cupCopy ? cupCopy.map(data => {
                data.coords = Math.floor(Math.random() * 100) + '%'
                data.Ycoords = Math.floor(Math.random() * 100) + '%'
                return data
            }) : ''
            setCups(cupCopy)
    }
    

    function resetCups() {  
        setIsTimerRunning(false)
        const newOrder = [25, 50, 75]   
        shuffle(newOrder)
        const cupsCopy = cups.map((data, index) => {
            data.coords = newOrder[index] + '%'
            data.Ycoords = '50%'
            return data
        })
        setCups(cupsCopy)
    }
    
    function checkAnswer(data) {
        setIsClickable(false)
        setAnswer(data)
        if (rounds == 4) {
            setTimeout(() => {
                setRounds(oldValue => oldValue + 1)
                setFinishedGame(true)
            }, 1000);
        }
        else {
        setRounds(oldValue => oldValue + 1)    
        }
     setTimeout(() => {
     setAnswer('')   
     }, 1000);   
    setTimeout(() => {
    startGame()    
    }, 2000);
        if (data.containsBall) {
            const correctCopy = [...correct]
            correctCopy[rounds] = true
            setCorrect(correctCopy)
        }
    }
    const score = correct.filter(data => data == true)
    
    const cupsElem = cups.map((data, index) => {
        if (data.containsBall) {
    return   <div onClick={()=> checkAnswer(data)} key={index} style={{
        display: 'flex', width: '100px', height: '100px', transition: '1s ease-in', position: 'absolute',
        backgroundColor: answer == data ? 'green':'grey', borderRadius: '10px', alignItems: 'center', justifyContent: 'center',
        left: data.coords, top: data.Ycoords, pointerEvents: isClickable && rounds < 5  ? 'all' : 'none',
        cursor: isTimerRunning ? 'none' : 'pointer'
            }}>
        <div style={{
            backgroundColor: 'red', width: '50px', transition:'1s ease-in',
            height: '50px', borderRadius: '50%', opacity: revealAnswer ? '1' : '0'
        }}></div>   
        </div>  
        } else {
            return <div onClick={()=> checkAnswer(data)} key={index} style={{
                width: '100px', height: '100px', position:'absolute',left: data.coords, top:data.Ycoords,
                backgroundColor: answer == data ? 'red' : 'grey', borderRadius: '10px', transition: '1s ease-in-out',
                pointerEvents:isClickable && rounds < 5 ? 'all': 'none', cursor: isTimerRunning? 'none' : 'pointer'
            }}></div>   
    }    
    })
    return <main style={{
        background: `url(${backgroundImage})`,cursor:!isTimerRunning && rounds <= 5 || finishedGame ? 'default': 'none',
        height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', display: 'flex',
        justifyContent:'center', alignItems:'center', position:'relative', overflow:'hidden'
    }}> {rounds < 5 ? <div style={{ display: 'flex', justifyContent: 'space-around', width: '50vw' }}>
        <h1 style={{
            position: 'absolute', top: '90px', left: '50%',
            fontWeight: 'bold', fontSize: '3rem', padding: '2rem', color: 'blanchedalmond', borderRadius:'15px',
            backgroundColor: '#303030', fontFamily: 'cursive'
        }}>{isTimerPresent ? gameCountDown == 0 ? 'Go!' : gameCountDown : `Round:${rounds + 1}`}</h1>
        {cupsElem}
        </div> : <div style={{
            padding: '2rem', color: 'blanchedalmond', borderRadius:'15px',
            backgroundColor: '#303030', fontFamily: 'cursive'
        }}>
            <h1>This is the end of the game!</h1><h3>You got {score.length}/5!</h3>
            <Link to='/'>Go back</Link></div>}</main>  
}