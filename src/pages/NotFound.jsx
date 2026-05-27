import { Link, useLocation } from "react-router-dom"

export default function NotFound() {
    const location = useLocation();
    const locArray = location.pathname.split('/')

    const backLoc = locArray.slice(0, locArray.length - 1).join('/')

    return (
        <div>
            <h1>404 Not Found</h1>
            <Link to={backLoc}>&larr; Go Back</Link>
            <br />

            <Link to={'/'}>Home</Link>
        </div>
    )
}