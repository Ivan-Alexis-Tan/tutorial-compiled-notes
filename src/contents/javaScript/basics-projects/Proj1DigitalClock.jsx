import imgOldRoom from '../../../assets/old-room-anime.jpg'
import { useEffect, useState } from 'react'

export default function Proj1DigitalClock() {
    const [now, setNow] = useState(new Date())
    const [isMilitary, setIsMilitary] = useState(true)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNow(new Date())
        }, 1000);

        return () => clearInterval(intervalId)
    }, [])

    function timeData() {
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        return {hours, minutes, seconds}
    }
    
    function displayTime() {
        const time = timeData()
        const newHour = time.hours % 12 || 12

        if (isMilitary) return `${padZero(time.hours)}:${padZero(time.minutes)}:${padZero(time.seconds)}`

        const meridiem = (time.hours >= 12) ? 'PM' : 'AM'
        return `${padZero(newHour)}:${padZero(time.minutes)}:${padZero(time.seconds)} ${meridiem}`
    }

    return (
        <div>
            <h1>Digital Clock</h1>
            <div className="proj-1-digital-clock__container" style={containerStyle}>
                <div className="proj-1-digital-clock__display-time" style={timeDisplayStyle} onClick={_ => setIsMilitary(prev => !prev)}>
                    {displayTime()}
                </div>
            </div>
        </div>
    )
}

function padZero(string) {
    return `${string}`.padStart(2, 0)
}

const containerStyle =  {
    color: 'black',
    backgroundImage: `url(${imgOldRoom})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundResize: 'cover',
    width: '100%',
    height: '50rem',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const timeDisplayStyle = {
    fontSize: '5.5em',
    fontWeight: 'bold',
    color: 'hsl(0, 0%, 100%)',
    textAlign: 'center',
    backdropFilter: 'blur(3px)',
    width: '100%',
    textShadow: '3px 3px 5px hsl(0, 0%, 0%)'
}