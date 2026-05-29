import { useParams, Outlet, Link, Navigate } from 'react-router-dom'

import { languageRoute } from "../routeData"

import LanguageCard from '../components/LanguageCard';

export default function LanguagePage() {
    const { language, library } = useParams();
    const { data, libraries, libCode, langTitle, libData } = languageRoute(language)
    const librariesData = data?.libraries
    
    if (!data || !librariesData) return <Navigate to={'/not-found'} replace />

    return (
        <>
            <h2 className='text-2xl font-bold mb-4'>{langTitle} Guides</h2>
                    
            {(libraries.length >= 1)
                ? <ul className='text-[16px] max-h-60 overflow-auto'>
                    {libraries.map(lib => (<li key={lib} className={`mb-2 px-4`}>
                        <Link to={`/guides/${language}/${lib}/${libCode(lib)}/1`}
                            className={`inline`}
                        >
                            {libData(lib).text}
                        </Link>
                    </li>))}
                </ul>
                : <p>No guides at the moment</p>
            }
        </>
    )
}