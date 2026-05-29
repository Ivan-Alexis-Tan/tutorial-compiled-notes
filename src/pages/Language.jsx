import { useParams, Link, Navigate } from 'react-router-dom'

import { languageRoute } from "../routeData"

export default function LanguagePage() {
    const { language, library } = useParams();
    const { data, libraries, libCode, langTitle, libData } = languageRoute(language)
    const librariesData = data?.libraries
    
    if (!data || !librariesData) return <Navigate to={'/not-found'} replace />

    return (
        <div className='flex flex-col min-h-0 h-full'>
            <h2 className='text-2xl font-bold mb-4'>{langTitle} Guides</h2>
                    
            {(libraries.length >= 1)
                ? <div className='flex flex-col gap-2 min-h-0 overflow-auto h-full'>
                    {libraries.map(lib => (
                        <Link to={`/guides/${language}/${lib}/${libCode(lib)}/1`}
                            className={`block pl-4`}
                        >
                            {libData(lib).text}
                        </Link>
                    ))}
                </div>
                : <p>No guides at the moment</p>
            }
        </div>
    )
}