import { useParams } from "react-router-dom"

export default function Projects() {
    const { library,  } = useParams();

    return (
        <div>
            <p>projects</p>
            {library}
        </div>
    )
}