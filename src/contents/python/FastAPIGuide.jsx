import { useParams } from 'react-router-dom'

import HTTPStatusGuide from "./fastapi/HttpStatusGuide";

export default function FastAPIGuide() {
    const { id } = useParams()

    if (Number(id) === 2) return <HTTPStatusGuide />
    
    return (
        <>
            <div>
                <h3>FastAPI Guides</h3>
            </div>
        </>
    )
}