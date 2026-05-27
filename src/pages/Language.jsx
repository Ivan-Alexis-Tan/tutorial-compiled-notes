import { useParams, Outlet, Link, Navigate} from 'react-router-dom'

import { getGuideCode, getGuideData, getLibraries } from "../routeData"
import LanguageCard from '../components/LanguageCard';

export default function LanguagePage() {
    const { language, library } = useParams();
    const guideData = getGuideData(language);
    const librariesData = guideData?.libraries
    
    if (!guideData || !librariesData) return <Navigate to={'/not-found'} replace />

    const libNames = getLibraries(language)
    const guideCode = getGuideCode(language, library)
    
    return (
        <>
            <h2 className='text-2xl font-bold mb-4'>{guideData.text} Guides</h2>
                    
            {(libNames.length >= 1)
                ? <ul className='px-4 text-[16px] max-h-60 overflow-auto'>
                    {libNames.map(lib => <li key={lib} className='mb-2'>
                        <Link to={`/guides/${language}/${lib}/${guideCode}/1`} 
                            className='inline'
                        >
                            {librariesData[lib].text}
                        </Link>
                    </li>)}
                </ul>
                : <p>No guides at the moment</p>
            }
        </>
    )
}