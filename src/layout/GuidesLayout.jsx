import { useParams, Outlet, Link, Navigate} from 'react-router-dom'
import { useEffect, useState } from 'react';

import { languageRoute } from '../routeData';

import LanguagePage from '../pages/Language';
import LibraryPage from '../pages/LibrarayPage';
import SideBarLayout from './SideBarLayout';

export default function GuidesLayout() {
    const { language, library, id } = useParams()
    const { langTitle, libData } = languageRoute(language)
    const [showSidebar, setShowSidebar] = useState(false)

    const libGuideTitle = libData(library)?.text
    const isSimilarTitle = langTitle === libGuideTitle

    useEffect(() => {
        setShowSidebar(false)
    }, [id])

    return (
        <>  
            {/* Mobile Device Sidebar Drawer */}
            <div className='sticky top-28 flex items-center sm:hidden mb-3 border p-2 rounded-2xl bg-[hsl(0,0%,0%)]'>
                <button onClick={_ => setShowSidebar(true)}>
                    ☰ Guides
                </button>

                <div className={`flex flex-1 gap-5 justify-center 
                    [&>div]:font-bold [&>div]:hover:text-(--link-hover-text-clr) [&>div]:cursor-pointer`}>
                    <div onClick={_ => setShowSidebar(true)}>
                        {langTitle}
                    </div>
                    
                    {!isSimilarTitle
                        && <>
                            &rarr;
                            <div onClick={_ => setShowSidebar(true)}>
                                {libGuideTitle}
                            </div>
                        </>
                    }
                </div>
            </div>
            
            {/* Mobile Device Sidebar */}
            <div className={`
                    fixed inset-0 z-(--z-ui-toggles) sm:hidden
                    ${showSidebar ? "opacity-100 visible" : "opacity-0 invisible"}
                    transition-all duration-200
                    overflow-auto m-5 mt-27 min-h-0 rounded-2xl bg-[hsla(0,0%,27%,.93)]
                `}
            >
                <div className='absolute top-1 right-1 hover:bg-black rounded-4xl'
                    onClick={_ => setShowSidebar(false)}
                >❌</div>

                <SideBarLayout />
            </div>
            
            {/* Desktop Sidebar */}
            <div className='flex gap-5'>
                <div className='hidden sticky top-32 sm:top-23 w-[30vw] max-w-62 min-h-0 overflow-auto h-[calc(100vh-8.5rem)] sm:block sm:h-[calc(100vh-6rem)]'>                  
                    <SideBarLayout />
                </div>

                <div className='min-w-0 flex-10 overflow-auto'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}