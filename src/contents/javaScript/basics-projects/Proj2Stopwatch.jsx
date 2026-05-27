import { useEffect, useState } from "react"

export default function Proj2Stopwatch() {
    const [isRunning, setIsRunning] = useState(false)
    const [timeStarted, setTimeStarted] = useState(Date.now())
    const [timeElapsed, setTimeElapsed] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isRunning) setTimeElapsed(Date.now() - timeStarted)
        }, 100);

        return () => clearInterval(intervalId)
    }, [isRunning])


    const timeData = {
        hours: timeElapsed / 1000 / 60 / 60,
        minutes: (timeElapsed / 1000 / 60) % 60,
        seconds: (timeElapsed / 1000) % 60,
        milliseconds: (timeElapsed % 1000) / 10,
    }

    function displayTime() {
        const hours = Math.floor(timeData.hours)
        const minutes = Math.floor(timeData.minutes)
        const seconds = Math.floor(timeData.seconds)
        const millisec = Math.floor(timeData.milliseconds)

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZero(millisec)}`
    }
    
    return (
        <div>
            <h1>Stopwatch App</h1>
            <div className="proj-2-stopwatch__container">
                <div className="proj-2-stopwatch__time-display">
                    {displayTime()}
                </div>

                <div className="proj-2-stopwatch__buttons">
                    {(timeElapsed > 0) && (<button className="proj-2-stopwatch__button-reset" 
                        onClick={_ => {setIsRunning(false); setTimeElapsed(0)}}>
                            &#8635;
                    </button>)
                    }
                    <button className="proj-2-stopwatch__button-start" 
                        onClick={_ => {
                            setIsRunning(prev => !prev);
                            if (timeElapsed === 0) setTimeStarted(Date.now())
                        }}>
                            {(isRunning) ? <span>⏸</span> : <span>&#9654;</span>}
                    </button>
                </div>
                
            </div>
        </div>
    )
}

function padZero(string) {
    return `${string}`.padStart(2, 0)
}