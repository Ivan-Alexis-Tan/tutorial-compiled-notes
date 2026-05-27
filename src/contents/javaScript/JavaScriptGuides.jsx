import {Link, Outlet} from 'react-router-dom';
import { useState, useEffect } from 'react';

// JS Guides Imports
// import ReactContent from "./react-guides/ReactContents";
// import JsBasics from './basics/JavascriptBasicsGuide.jsx';

export default function JavaScriptGuides({ jsonRoutes }) {
    const [javascriptGuide, setJavascriptGuide] = useState([])
    // const guideSections = [
    //     {id: 1, title: 'JavaScript Basics', path: 'basics'},
    //     {id: 2, title: 'React', path: 'react'},
    // ]

    useEffect(() => {
        setJavascriptGuide(getGuides(jsonRoutes, 'javascript') ?? [])
    }, [jsonRoutes])

    return (
        <>
            <div>
                <h2>JavaScript Guides</h2>
                {(javascriptGuide !== null || javascriptGuide.length >= 1)
                    ? <ul>
                        {javascriptGuide.map( guide => <li key={guide.id}>
                            <Link key={guide.id} to={_ => managePath(guide.path)}>{guide.title}</Link>
                        </li>)}
                    </ul>
                    : <p>Nothing to display</p>
                }
                <Outlet />
            </div>
        </>
    )
}

function getGuides(json, language) {
    if (json === null || json.length === 0) return null;
    
    const lang = json.filter(j => j.language.toLowerCase() === language.toLowerCase())
    return lang[0].guides
}

function managePath(path) {
    return (path.length === 0) ? '/' : path
}