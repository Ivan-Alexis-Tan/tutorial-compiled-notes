import { Link, Outlet, useParams } from "react-router-dom"

import { routeData } from "../routeData";
import { useState } from "react";

export default function ContentGuideLayout() {
    const {language, library, code } = useParams();
    const [showProj, setShowProject] = useState(false)

    const libraryData = routeData[language].libraries[library] ?? null

    if (!libraryData) return null

    const guideTitles = libraryData.titles ?? [];
    const libraryTitleIds = Object.keys(guideTitles) ?? [];

    const projects = libraryData.projects ?? null;
    const projectsId = (projects !== null) ? Object.keys(projects) : null;

    function test() {
        console.log(routeData)
        console.log(`language =`, language)
        console.log(`library =`, library)
        console.log(`code =`, code)
        console.log(`libraryData =`, libraryData)
        console.log(`guideTitles =`, guideTitles)
        console.log(`libraryTitleIds =`, libraryTitleIds)
        console.log(libraryData.code)
        console.log(routeData[language].libraries[library])
        console.log(projects)
        console.log(routeData[language].libraries[library].projects)
        console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
    }

    return (
        <div>
            <h1>{libraryData.text}</h1>

            {projects && <h2 onClick={_ => setShowProject(prev => !prev)}>Projects</h2>}
            {showProj && <ul>{projectsId.map(id => <li key={id}>
                    {projects[id]}
                </li>)}
            </ul>}
            
            <h2>Guides:</h2>
            {(libraryTitleIds.length >=1)
                ? <ol>{libraryTitleIds.map( id => <li key={id}>
                    <Link to={`${libraryData.code}/${id}`}>{guideTitles[id]}</Link>
                </li>)}</ol>
                : <p>No titles to diplay.</p>
            }
            <button onClick={test}>test</button>
            <Outlet />
        </div>
    )
}