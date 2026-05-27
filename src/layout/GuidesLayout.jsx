import { useParams, Outlet, Link, Navigate} from 'react-router-dom'

import { routeData } from "../routeData"
import LanguagePage from '../pages/Language';
import LibraryPage from '../pages/LibrarayPage';
import SideBarLayout from './SideBarLayout';

export default function GuidesLayout() {
    return (
        <>  
            <div className='flex gap-5'>
                <div className='sticky top-32 sm:top-23 w-[30vw] max-w-62 min-h-0 overflow-auto h-[calc(100vh-8.5rem)] sm:h-[calc(100vh-6rem)]'>                  
                    <SideBarLayout />
                </div>
                

                <div className=' min-w-0 flex-10'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}