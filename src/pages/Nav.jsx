import {Link} from 'react-router-dom'
import { initLibRoute } from '../routeData'

const navigationLinks = [
    {url: "javascript", text: "Javascript"},
    {url: "html", text: "HTML"},
    {url: "css", text: "CSS"},
    {url: "python", text: "Python"}
]

export default function NavBar() {
    return (
        <>
            <div className='flex flex-col justify-between items-center p-5 sm:flex-row bg-black'>
                <div className='mb-3 sm:mb-0'>
                    <Link to='/' className='hover:text-black'>
                        <span className='text-2xl font-bold'>Web Dev Tutorial Notes</span>
                    </Link>
                </div>
                
                <div className='flex gap-10 text-[16px]'>
                    {navigationLinks.map(nav => {
                        const { initUrl, initLib } = initLibRoute(nav.url)
                        return (
                            <Link key={nav.url} to={`guides/${nav.url}/${initUrl}/1`}>
                                <span>{nav.text}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}