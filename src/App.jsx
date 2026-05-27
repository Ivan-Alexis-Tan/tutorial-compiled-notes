import { useState, useContext, useEffect, useRef } from 'react'
import {Routes, Route} from 'react-router-dom'
import TestingShit from './assets/pages/Testing.jsx'

// Pages Imports
import Home from './assets/pages/Home.jsx'
import NavBar from './assets/pages/Nav.jsx'

// Guides Section
import PythonGuides from './assets/contents/python/PythonGuides.jsx'
import JavaScriptGuides from './assets/contents/JavaScript/JavaScriptGuides.jsx'

// Python Guides Imports
import FastAPIGuides from './assets/contents/python/fastapi-guides/FastAPIGuides.jsx'
import FlaskGuide from './assets/contents/python/flask-guides/FlaskGuides.jsx'

// JavaScript Guides Import
import ReactContent from './assets/contents/JavaScript/react-guides/ReactContents.jsx'
import JsBasics from './assets/contents/javaScript/basics/JavascriptBasicsGuide.jsx'

function App() {
  const [jsonRoutes, setJsonRoutes] = useState([])
  const [error, setError] = useState('')

  useEffect( () => {
    async function loadRoute() {
      try {
        const jsonFile = await fetch('/file-routes.json');
        setJsonRoutes(await jsonFile.json())
      }
      catch(err) {
        console.error(err)
        setError(err)
      }
    }

    loadRoute()
  }, [])

  console.log(jsonRoutes)

  return (
    <>
      <div>
        <NavBar />

        <main>
          <Routes>
            <Route path='/' element={<Home jsonRoutes={jsonRoutes} />} />

            {/* Python Guides */}
            <>
              <Route path='/python-guides' element={<PythonGuides jsonRoutes={jsonRoutes} />}>
                <Route path='fast-api' element={<FastAPIGuides />} />
                <Route path='flask' element={<FlaskGuide />} />
              </Route>
            </>
            
            {/* JavaScript Guides */}
            <>
              <Route path='/javascript-guide' element={<JavaScriptGuides />}>

                <Route path='basics' element={<JsBasics />} />
                <Route path='react' element={<ReactContent />} />
              </Route>
            </>

            {/* CSS Guides */}
          </Routes>
          {/* <TestingShit /> */}
        </main>
      </div>
    </>
  )
}

export default App
