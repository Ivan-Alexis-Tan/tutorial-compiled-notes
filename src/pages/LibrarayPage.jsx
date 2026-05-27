import { Link, Navigate, Outlet, useParams } from "react-router-dom"
import { useState } from "react";

import { getGuideCode, getLibraryData, routeData } from "../routeData";

export default function LibraryPage() {
    const {language, library, code } = useParams();
    const [showProj, setShowProject] = useState(false)

    const libraryData = getLibraryData(language, library)

    if (!libraryData) return <Navigate to='not-found' replace/>

    const guideTitles = libraryData.titles ?? [];
    const libraryTitleIds = Object.keys(guideTitles) ?? [];

    const projects = libraryData.projects ?? null;
    const projectsId = (projects !== null) ? Object.keys(projects) : null;

    return (
        <div className="flex flex-col min-h-0 h-full">
            <h1 className="text-2xl font-bold mb-5">{libraryData.text}</h1>

            {projects && <div className="mb-5">
                <h2 onClick={_ => setShowProject(prev => !prev)}
                    className="text-xl font-bold mb-2"
                >Projects</h2>
                
                {showProj 
                    && <ul className="mx-5">{projectsId.map(id => (
                    <li key={id} className="mb-1">
                        <Link to={`/guides/${language}/${library}/projects/${libraryData.projCode}/${id}`}>{projects[id]}</Link>
                    </li>))
                }
                </ul>}
            </div>}
            
            <h2 className="text-xl font-bold mb-2">Guides:</h2>
            {(libraryTitleIds.length >=1)
                ? <div className="flex-1 min-h-50 overflow-auto">
                    {libraryTitleIds.map( id => (
                        <Link key={id} 
                            to={`/guides/${language}/${library}/${libraryData.guideCode}/${id}`}
                            style={{ display: "block" }}
                            className="pl-4 p-2 rounded-4xl hover:bg-black transition-colors"
                        >
                            {guideTitles[id]}
                        </Link>
                    ))}
                </div>
                
                : <p>No titles to diplay.</p>
            }
        </div>
    )
}