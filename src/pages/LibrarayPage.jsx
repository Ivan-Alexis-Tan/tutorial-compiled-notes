import { Link, Navigate, Outlet, useLocation, useParams } from "react-router-dom"
import { useState } from "react";

import { languageRoute } from "../routeData";

export default function LibraryPage() {
    const {language, library, id } = useParams();
    const { pathname } = useLocation();
    const [showProj, setShowProject] = useState(false)

    const { data, url, libraries, libCode, libData, libTitles, libProjects } = languageRoute(language)
    const libraryData = libData(library)

    if (!libraryData) return <Navigate to='not-found' replace/>

    const guideTitles = libTitles(library) ?? [];
    const libraryTitleIds = Object.keys(guideTitles) ?? [];

    const projects = libProjects(library) ?? null;
    const projectsId = Object.keys(projects);

    function highlightActive(activeId, field = "guides") {
        if (id !== activeId) return ""
        const activeStyle = "bg-black"

        switch(field) {
            case "projects":
                if (!pathname.split('/').includes("projects")) return "";
                return activeStyle
            default:
                if (pathname.split('/').includes("projects")) return "";
                return activeStyle
        }
    }

    return (
        <div className="flex flex-col min-h-0 h-full">
            <h1 className="text-2xl font-bold mb-3">{libraryData.text}</h1>

            {projectsId.length >= 1 
                && <div className="flex flex-col mb-3">
                        <h2 onClick={_ => setShowProject(prev => !prev)}
                            className="inline text-xl font-bold mb-2 cursor-pointer hover:text-(--link-hover-text-clr)"
                            title={showProj ? "Close projects" : "Open projects"}
                        >
                            Projects
                        </h2>
                    
                    {showProj 
                        && <div className="flex flex-col">
                            {projectsId.map(id => (
                                <Link key={id}
                                    className={`pl-4 pr-2 py-1 rounded-2xl hover:bg-black ${highlightActive(id, "projects")}`}
                                    to={`/guides/${language}/${library}/projects/${libraryData.projCode}/${id}`}
                                >
                                    {projects[id]}
                                </Link>))
                            }
                        </div>
                    }
                </div>
            }
            
            <h2 className="text-xl font-bold mb-2">Guides:</h2>
            {(libraryTitleIds.length >=1)
                ? <div className="flex-1 min-h-50 overflow-auto">
                    {libraryTitleIds.map( id => (
                        <Link key={id} 
                            to={`/guides/${language}/${library}/${libraryData.guideCode}/${id}`}
                            style={{ display: "block" }}
                            className={`${highlightActive(id, "guides")} pl-4 pr-2 p-1 rounded-4xl hover:bg-black transition-colors`}
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