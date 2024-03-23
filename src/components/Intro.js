import { useContext, useEffect, useState } from 'react'
import backgroundImage from '../images/casino-background.jpg'
import { Link } from 'react-router-dom'
import { GameContext } from './Context'
export default function Intro() {
    const {isVisible, setIsVisible} = useContext(GameContext)
    useEffect(() => {
    setIsVisible(true)    
    },[])
    return <main style={{
        display: 'flex', flexDirection: 'column', height:'100vh',
        alignItems: 'center', justifyContent: 'space-around', backgroundImage: `url(${backgroundImage})`,
        backgroundSize:'cover', backgroundRepeat:'no-repeat', width:'100%'
    }}><h1 className='display-1 text-light ml-4'>Welcome to the shell game!</h1>
        <p style={{
            maxWidth: '60%', color: 'white',
            marginLeft: '150px', display: 'block', backgroundColor: 'black', padding: '1rem 3rem', borderRadius: '15px',
            opacity:isVisible ? '1': '0', transition:'1s ease-in-out'
        }}>A Shell game is a classic gambling game
            that dates back to ancient Greece. Playing it requires three shells, a pea,
            hand dexterity by the operator, and keen observation skills on the part of the player. It's also a classic
            con game since its easy for the operator to swindle the player.
            Thank goodness the latter isn't our intent with this app. Click start to play!</p>
        <Link style={{fontSize:'3rem', padding:'0 50px'}} to={'/game'} className="btn btn-primary btn-dark">Start</Link>
    </main>    
}