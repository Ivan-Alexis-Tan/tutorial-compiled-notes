import { useParams } from 'react-router-dom'

import { routeData } from '../../routeData';

import C19ReactQuery from './react-guides/ReactQuery';
import C20ZustandGuide from './react-guides/ReactZustand';
import C21ReactHookForm from './react-guides/ReactHookForm';
import C22ZodGuides from './react-guides/ReactZod';

const jsLibs = routeData.javascript.libraries

export default function ReactGuide() {
    const { id } = useParams();
    const currentId = Number(id)

    switch (currentId) {
        case 1:
            return <C1CreatingReactEnvironment />
        case 2:
            return <C2ProjectStructure />
        case 3:
            return <C3ComponentBasics />
        case 4:
            return <C4CardComponents />
        case 5:
            return <C5AddingCssStyle />
        case 6:
            return <C6PropsPropTypesAndDefaultProps />
        case 7:
            return <C7ConditionalRendering />
        case 8:
            return <C8RenderingList />
        case 9:
            return <C9ClickEvents />
        case 10:
            return <C10ReactHookAndUseState />
        case 11:
            return <C11OnChange />
        case 12:
            return <C12UpdaterFunction />
        case 13:
            return <C13UpdateObjectInState />
        case 14:
            return <C14UpdateArraysInState />
        case 15:
            return <C15UpdateArrayOfObjectsInState />
        case 16:
            return <C16UseEffect />
        case 17:
            return <C17UseContext />
        case 18:
            return <C18UseRef />
        case 19:
            return <C19ReactQuery />
        case 20:
            return <C20ZustandGuide title={jsLibs.react.titles[currentId]} />
        case 21:
            return <C21ReactHookForm title={jsLibs.react.titles[currentId]} />
        case 22:
            return <C22ZodGuides title={jsLibs.react.titles[currentId]} />
        default:
            break;
    }
}

function C1CreatingReactEnvironment() {
    return (
        <div>
            <section id="react-notes__creating-react-environment">
                <h1><a href="#">1.</a> Creating React Environment</h1>
                <article>
                    <div>
                        <ol>
                            <li>Make sure <code>Node.js</code> is already installed in the computer (download source: <code>nodejs.org</code>)</li>
                            
                        </ol>
                    </div>

                    <div>
                        <h2>A. Install <code>node.js</code> in computer.</h2>
                        <ol>
                            <li>Download <code>node.js</code> in <a href="https://nodejs.org/en">nodejs.org</a></li>
                            <li>Select "<strong>Get Node.js</strong>".</li>
                            <li>Select "<strong>Windows Installer (.msi)</strong>" to download.</li>
                            <li>Install the file.</li>
                        </ol>
                    </div>

                    <div>
                        <h2>B. Create React environment using Terminal</h2>
                        <ol>
                            <li>Open new Terminal</li>
                            <li>Navigate to the directory on where you wanna set your react environment; like <code>cd C:\Users\Acer\Documents\Software Development</code></li>
                            <li>Type <code>npm create vite@latest</code></li>
                            <li>It will ask about the folder name of the environment. Use the <strong>kebab case</strong> convention (e.g. <code>my-react-app</code>) to name the folder.</li>
                            <li>It asks what framework. Choose "React" by using arrow keys, then press enter.</li>
                            <li>It asks again what variant. Choose "JavaScript" for now, then press enter.</li>
                            <li>Another question if to use rolldown-vite (experimental). As a beginner, choose "no" and press enter.</li>
                            <li>If it asks about downloading <code>npm</code> and start, select "yes" then press enter.</li>
                        </ol>
                    
                        <p>The Terminal will gonna look like this.</p>
                        <pre><code>
{`C:/Users/Acer/Documents/Software Development

C:/Users/Acer/Documents/Software Development>npm create vite@latest

> npx
> create-vite

│
◇  Project name:
│  my-react-app
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  JavaScript
│
◇  Use rolldown-vite (Experimental)?:
│  No
│
◇  Install with npm and start now?
│  Yes
│
◇  Scaffolding project in C:/Users/Acer/Documents/Software Development/Javascript/tutorial/brocode/react/my-react-app...
│
◇  Installing dependencies with npm...

added 157 packages, and audited 158 packages in 44s

33 packages are looking for funding
run "npm fund" for details

found 0 vulnerabilities
│
◇  Starting dev server...

> my-react-app@0.0.0 dev
> vite


VITE v7.3.0  ready in 728 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help`}
                        </code></pre>
                        <p>Environment successfully set and already running. You are good to go.</p>
                        <p><code>Local:   http://localhost:5173/</code> is the web url. Press CTRL + left click to open.</p>
                    </div>

                    <div>
                        <h2>C. Starting an existing react application project.</h2>
                        <div>
                            <ol>
                                <li>Open new Terminal.</li>
                                <li>Navigate the terminal (e.g. <code>cd C:\Users\Acer\Documents\Software Development\my-react-app</code>)</li>
                                <li>Then type <code>npm run dev</code> to start the server.</li>
                            </ol>

                            <p>This what the terminal looks like:</p>
                            <pre><code>
{`C:/Users/Acer><span className="--yellow">cd</span> C:/Users/AcerDocuments/Software Development/my-react-app
C:/Users/Acer/Documents/Software Development/my-react-app><span className="--yellow">npm</span> run dev`}
                            </code></pre>
                            <p>After this, the server is now running.</p>
                        </div>
                    </div>

                </article>
            </section>
        </div>
    )
}

function C2ProjectStructure() {
    return (
        <div>
            <section id="react-notes__project-dir-structure">
                <h1><a href="#">2.</a> Quick details about the Project Structure of React Application</h1>
                <article>
                    <div>
                        <ol>
                            <li><code>/node_modules</code></li>
                            <ul>
                                <li>Contains external libraries and packages that the project relies on.</li>
                                <li>Includes build tools, utility libraries, routing libraries, to name a few.</li>
                            </ul>

                            <li><code>/public</code></li>
                            <ul>
                                <li>Contains any public assets.</li>
                                <li>Can contain public fonts, images, videos.</li>
                                <li>One example that already in is the <code>vite.svg</code> image file.</li>
                                <li>They're not bundled during the final output (typically available via URL)</li>
                            </ul>

                            <li><code>/src</code></li>
                            <ul>
                                <li>Short name for "source" folder.</li>
                                <li>99% of the time spends of this folder.</li>
                                <li>Where most of the projects are located.</li>
                                <li>Includes <code>/assests</code> folder</li>
                                <ul>
                                    <li>Contain like images and videos.</li>
                                    <li>Acts like <code>/public</code> folder, but files within <code>/assets</code> are bundled during the final output of the project.</li>
                                </ul>
                            </ul>

                            <li><code>{`<name>`}.jsx</code> files</li>
                            <ul>
                                <li>Stands for <strong>Javascript XML</strong>.</li>
                                <li>Functions as main Javascript file.</li>
                                <li>React works with components by adding them via importing files.</li>
                                <li>Example of root CSS components include:</li>
                                <ol>
                                    <li><code>App.jsx</code></li>
                                    <li><code>index.css</code></li>
                                    <ul>
                                        <li>The main CSS style for the application.</li>
                                        <li>Imported inside by <code>main.jsx</code> file; written as <code>import './index.css'</code>.</li>
                                    </ul>
                                </ol>
                            </ul>

                            <li><code>index.html</code> file</li>
                            <ul>
                                <li>The main entry point of the program.</li>
                                <li>In the the body of the document of the file, it already have:</li>
                                <ul>
                                    <li>A development (<code>{`<div>`}</code> tag) with an ID of <code>"root"</code></li>
                                    <li>A <code>{`<script>`}</code> of the <code>main.jsx</code> file.</li>
                                </ul>
                            </ul>

                            <li><code>package.json</code> file</li>
                            <ul>
                                <li>Contains metadata of the project. Such as:</li>
                                <ul>
                                    <li>Project name</li>
                                    <li>Project version number</li>
                                    <li>Project build used</li>
                                    <li>Project react version number</li>
                                    <li>etc.</li>
                                </ul>
                            </ul>
                        </ol>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C3ComponentBasics() {
    return (
        <div>
            <section id="react-notes__component-basics">
                <h1><a href="#">3.</a> Components Basics</h1>
                <article>
                    <div>
                        <h2>A. Awareness of the Ready-made Sample Projects</h2>
                        <ol>
                            <li><code>App.jsx</code></li>
                            <ul>
                                <li>An already-made sample project.</li>
                                <li>Be exported to <code>main.jsx</code>.</li>
                                <li>The imports and scripts in <code>App()</code> function can be delete as it serves as place holder.</li>
                                <li>It's alright to delete the contents as can serve as server to the root DOM (<code>index.html</code>).</li>
                                <pre><code>
{`import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)                                             // Can be deleted from here ...

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>

                <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>

            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>

                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>

            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )                                                                                 // ... to here.
}`}
                                </code></pre>
                            </ul>

                            <li><code>main.jsx</code></li>
                            <ul>
                                <li>Imports <code>App.jsx</code> components.</li>
                                <li>Think of this as the main Javascript file.</li>
                                <li>Creates root element in the DOM, then tracing it via <code><span className="--blue">document</span><span className="--yellow">.getElementById</span>(<span className="--orange">'root'</span>)</code>, and finally renders it.</li>
                            </ul>

                            <li><code>App.css</code> and <code>index.css</code></li>
                            <ul>
                                <li>A dedicated ready-made CSS for components during react environment creation.</li>
                                <li><strong>Can be deleted</strong> as it is only a sample code.</li>
                            </ul>
                        </ol>
                    </div>

                    <div>
                        <h2>B. Component Creation</h2>
                        <div>
                            <ul>
                                <li>Let's say <i>we wanna put a header</i>, so let's create a folder.</li>
                                <li>Can be done by creating new <code>.jsx</code> file.</li>
                                <li>Mind to <strong>capitalize the file name</strong> as a naming convention.</li>
                            </ul>
                        </div>

                        <div>
                            <p><code>Header.jsx</code>:</p>
                            <ul><li>Creating web site header.</li></ul>
                            <pre><code>
{`export default function Header() {
    return (
        <header>
            <h1>My Website</h1>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <hr />
        </header>
    )
}`}
                            </code></pre>
                            <ul><li>Import to <code>App.jsx</code></li></ul>
                        </div>

                        <div>
                            <p><code>Footer.jsx</code>:</p>
                            <ul><li>Creating footer of the web site.</li></ul>
                            <pre><code>
{`export default function Footer() {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} Your Website Name</p>
        </footer>
    )
}`}
                            </code></pre>
                            <ul><li>Then import to <code>App.jsx</code></li></ul>
                        </div>

                        <div>
                            <p><code>Food.jsx</code></p>
                            <ul><li>Creating list of foods as the body content of the website.</li></ul>
                            <pre><code>
{`export default function Food() {
    const food1 = 'Orange';
    const food2 = 'Banana';

    return (
        <ul>
            <li>'Apple'</li>
            <li>{ food1 }</li>
            <li>{ food2.toUpperCase() }</li>
        </ul>
    )
}`}
                            </code></pre>
                        </div>

                        <div>
                            <p><code>App.jsx</code>:</p>
                            <pre><code>
{`import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import Food from "./Food.jsx"

export default function App() {
    return (
        <>
            <Header /;>
            <Food />
            <Footer /;</span>>
        </>
    )
}`}
                            </code></pre>
                        </div>

                    </div>
                </article>
            </section>
            <hr />
        </div>
    )
}

function C4CardComponents() {
    return (
        <div>
            <section id="react-notes__card-components">
                <h1><a href="#">4.</a> Card Components</h1>
                <article>
                    <div>
                        <ul>
                            <li>Typically involves a picture, a title, and a description.</li>
                            <li>Can be used for all sorts of things.</li>
                        </ul>
                    </div>

                    <div>
                        <p><code>Card.jsx</code>:</p>
                        <pre><code>
{`import profilePic from '../../assets/El-Reine-Pasa.jpg'

export default function Card() {
    return (
        <div className="tutr-2-card">
            <img className='tutr-2-card__pfp' src={profilePic} alt="profile-picture" />
            <h2 className='tutr-2-card__profile-name'>Juan Dela Cruz</h2>
            <p className='tutr-2-card__profile-job-desc'>Web Developer</p>
        </div>
    )
}`}
                        </code></pre>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C5AddingCssStyle() {
    return (
        <div>
            <section id="react-notes__adding-css-styles">
                <h1><a href="#">5.</a> Adding CSS Styles</h1>
                <article>
                    <div>
                        <p>(The guide does not cover external framework (e.g. tailwind) or preprocessors (e.g. SAS))</p>
                        <p>Convers only basics:</p>
                        <ol>
                            <li><strong>External</strong></li>
                            <ul>
                                <li>Good for global style or small projects.</li>
                            </ul>

                            <li><strong>Modules</strong></li>
                            <ul>
                                <li>Preferred for individual components.</li>
                                <li>Have their own unique <code>className</code> via hashing (internal built-in works)</li>
                            </ul>

                            
                            <li><strong>Inline</strong></li>
                            <ul>Good for any small components with minimal styling.</ul>
                        </ol>
                    </div>
                    
                    <div>
                        <h2>A. External Styling</h2>
                        <p><code>index.css</code></p>
                        <pre><code>
{`.tutr3__button-external-style {
padding: 10px 20px;
border-radius: 5px;
border: none;
cursor: pointer;
}`}
                        </code></pre>

                        <p><code>Button.module.css</code></p>
                        <pre><code>
{`.tutr3__buttonModuleStyle {
padding: 10px 20px;
border-radius: 5px;
border: none;
cursor: pointer;
}`}
                        </code></pre>

                        <p><code>Button.jsx</code></p>
                        <pre><code>
{`import styles from './Button.module.css'

export default function Button() {
    const divStyle = {
        display: "flex",
        flexDirection: 'column',
        width: '200px',
        gap: '10px'
    }

    const inlineStyles = {
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
    }

    return(
        <>
            <div class='tutr3__button-fields' style={divStyle} >
                <button className='tutr3__button-external-style' >External Style</button>
                <button className={styles.tutr3__buttonModuleStyle} >Module Style</button>
                <button style={inlineStyles} >Inline Style</button>
            </div>
        </>
    )
}`}
                        </code></pre>

                        <p><code>Apps.jsx</code></p>
                        <pre><code>
{`import {Button as T3Button} from "./tutorial-based-jsx-files/tutorial-3__add-css-styles/Button.jsx"

export default function App() {
    return (
        <>
            <T3Button />
        </>
    )
}`}
                        </code></pre>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C6PropsPropTypesAndDefaultProps() {
    return (
        <div>
            <section id="react-notes__props-and-prop-types">
                <h1><a href="#">6.</a> Props, PropTypes, and defaultProps (<span class="--red">abandoned module</span>)</h1>
                <article>
                    <div>
                        <p><strong>prop</strong></p>
                        <ul>
                            <li>Short term for "properties".</li>
                            <li>Are read-only properties that are shared between components.</li>
                            <li>A parent component can send data to a child component.</li>
                            <li>Usage construct: <code>{`<Component key=value />`}</code></li>
                        </ul>

                        <p><strong>prop types</strong></p>
                        <ul>
                            <li>A mechanism that ensures that the passed value is of the correct datatype.</li>
                            <li>A good practice when working with props and debugging.</li>
                            <li>Usage construct: <code>{`<propKey>: PropTypes.<propType>`}</code></li>
                        </ul>

                        <p><strong>defaultProps</strong></p>
                        <ul>
                            <li>Are default values for props <i>in case they are not passed from the parent component</i>.</li>
                            <li>Usage construct: <code>&lt;defaultKey: defaultVal</code></li>
                        </ul>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C7ConditionalRendering() {
    return (
        <div>
            <section id="react-notes__conditional-rendering">
                <h1><a href="#">7.</a> Conditional Rendering</h1>
                <article>
                    <div>
                        <ul>
                            <li>Allows to constrol what gets rendered in the application based on certain conditions.</li>
                            <li>Can show, hide, or change components.</li>
                        </ul>
                    </div>

                    <div>
                        <p>Example in <code>UserGreeting.jsx</code> file:</p>
                        <pre><code>
{`import PropTypes from "prop-types";

export default function Tutor5UserGreeting({ isLoggedIn = false, username = "Guest"}) {
    const welcomeMessage = 'Welcome $${`{username}`}';

    const loginNowMessage = <p className="tutor5__login-now-message">
        Please login to continue.
    </p>;

    if (isLoggedIn) {
        return <p className="tutor5__welcome-message">{welcomeMessage}</p>
    }

    return loginNowMessage
}

Tutor5UserGreeting.propTypes = {
    isLoggedIn: PropTypes.bool,
    username: PropTypes.string,
}`}
                        </code></pre>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C8RenderingList() {
    return (
        <div>
            <section id="react-notes__rendering-list">
                <h1><a href="#">8.</a> Rendering List</h1>
                <article>
                    <div>

                    </div>
                    <div>
                        <h2>A. React Component-based List Rendering</h2>
                        <p><code>List.jsx</code></p>
                        <pre><code>
{`function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Tutor6List() {
    const fruits = [
        {id: 1, name: 'apple', calories: 95}, 
        {id: 2, name: 'orange', calories: 45}, 
        {id: 3, name: 'banana', calories: 105}, 
        {id: 4, name: 'coconut', calories: 159}, 
        {id: 5, name: 'pineapple', calories: 37}
    ];
    
    fruits.sort( (a, b) => b.calories - a.calories)                 // Desc Numeric 
    // fruits.sort( (a, b) => a.calories - b.calories)              // Asc Numeric</span>
    // fruits.sort( (a, b) => a.name.localeCompare(b.name))         // Asc Alphabet</span>
    // fruits.sort( (a, b) => b.name.localeCompare(a.name))         // Desc Alphabet</span>  

    // Low calorie Fruits
    const listItems = fruits.map( fruit => {
        const name = capitalizeString(fruit.name);
        const calories = fruit.calories

        return (
            <li key={fruit.id}>
                <strong>{name}</strong>: {calories} cal
            </li>
        )
    })

    const lowCalorieFruit = fruits.filter( fruit => fruit.calories < 100);
    const displayLowCalorieFruit = lowCalorieFruit.map( fruit => {
        const name = capitalizeString(fruit.name)

        return (
            <li key={fruit.id}>
                <strong>{name}</strong>: {fruit.calories} cal
            </li>
        )
    })

    // High Calorie Fruits
    const highCalFruits = fruits.filter( fruit => fruit.calories >= 100)
    const displayHighCalFruits = highCalFruits.map( fruit => {
        const name = capitalizeString(fruit.name)

        return (
            <li key={fruit.id}>
                <strong>{name}</strong>: {fruit.calories} cal
            </li>
        )
    })

    return (
        <> 
            <h3>List of Fruits:</h3>
            <ul>
                {listItems}
            </ul>

            <h3>Fruits with < 100 calories:</h3>
            <ol>
                {displayLowCalorieFruit}
            </ol>

            <h3>Fruits with <= 100 calories:</h3>
            <ol>
                {displayHighCalFruits}
            </ol>
        </>
        
    )
}`}
                        </code></pre>

                        <p><code>App.jsx</code>:</p>
                        <pre><code>
{`import Tutor6List, {Tutor6PropsList} from "./tutorial-based-jsx-files/tutorial-6__rendering-list/List.jsx"

function App() {

    return (
        <>
            <h1>6. Rendering List</h1>
            <h2>A. Basics</h2>
            <Tutor6List />
        </>
    )
}`}
                        </code></pre>
                    </div>

                    <div>
                        <h2>B. Props List Example</h2>
                        <p><code>List.jsx</code></p>
                        <pre><code>
{`export function Tutor6PropsList({ items = [], category = 'List of items'}) {

    if (items.length <= 0) return null

    return (
        <>  
            <h3 className="tutor6__list-category">{category}:</h3>
            <ol className="tutor6__item-list">
                {items.map( item => 
                    <li key={item.id}>
                        <strong>{capitalizeString(item.name)}</strong>: {item.calories} cal
                    </li>
                )}
            </ol>
        </>
    )
}`}
                        </code></pre>

                        <p><code>App.jsx</code>:</p>
                        <pre><code>
{`import Tutor6List, {Tutor6PropsList} from "./tutorial-based-jsx-files/tutorial-6__rendering-list/List.jsx"

function App() {
    const tutor6Fruits = [
        {id: 1, name: 'apple', calories: 95}, 
        {id: 2, name: 'orange', calories: 45}, 
        {id: 3, name: 'banana', calories: 105}, 
        {id: 4, name: 'coconut', calories: 159}, 
        {id: 5, name: 'pineapple', calories: 37}
    ];

    const tutor6Fruits = [
        {id: 6, name: 'potato', calories: 110}, 
        {id: 7, name: 'celery', calories: 15}, 
        {id: 8, name: 'carrots', calories: 25}, 
        {id: 9, name: 'corn', calories: 63}, 
        {id: 10, name: 'broccoli', calories: 50}
    ];

    return (
        <>
            <h1>6. Rendering List</h1>
            <h2>B. Props List Example</h2>
            <Tutor6PropsList items={tutor6Fruits} category='Fruits'/>
            <Tutor6PropsList items={tutor6Vegetables} category='Vegetables'/>
            <hr />
        </>
    )
}`}
                        </code></pre>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C9ClickEvents() {
    return (
        <div>
            <section id="react-notes__click-events">
                <h1><a href="#">9.</a> Click Events</h1>
                <article>
                    <div>
                        <ul>
                            <li>An interaction when a user clicks on a specific element.</li>
                            <li>Can respond to clicks by passing a callback to the <code>onClick</code> event handler.</li>
                        </ul>
                    </div>

                    <div>
                        <p><code>Button.jsx</code></p>
                        <pre><code>
    {`export default function Tutor7Button() {
        const imageUrl = "../../src/assets/El-Reine-Pasa.jpg"
        let greetingFlag = false

        const greetButton = name => {
            console.log('Hello, $${"{name}"}')
        }

        const doubleClickGreeting = e => {
            greetingFlag = !greetingFlag

            if (greetingFlag) {
                e.target.textContent = "Greet (double click)"
            }
            else {
                e.target.textContent = "Oh, hi! Have a good day. 😘"
            }
        }

        function printCatchPhrase() {
            console.log("Ichiban saikyou wa? Sou, El Reine Pasa!")
        }

        return (
            <>
                <div className="tutor7__click-event-buttons">
                    <button onClick={ _ => {greetButton('Juan')} } >Greet (in console)</button>
                    <button onDoubleClick={e => {doubleClickGreeting(e)} } >Greet (double click)</button>
                    <img onClick={printCatchPhrase} src={imageUrl} alt="el-reine-pasa-image"/>
                </div>
            </>
        )
    }`}
                        </code></pre>

                        <p><code>App.jsx</code></p>
                        <pre><code>
{`import Tutor7Button from "./tutorial-based-jsx-files/tutorial-7__click-events/Button.jsx"

function App() {
    return (
        <>
            <h1>7. Click Events</h1>
            <Tutor7Button />
        </>
    )
}`}
                        </code></pre>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C10ReactHookAndUseState() {
    return (
        <div>
            <section id="react-notes__react-hook-and-useState">
                <h1><a href="#">10.</a> React Hook and <code>useState()</code></h1>
                <article>
                    <div>
                        <h3>React Hook</h3>
                        <ul>
                            <li>Special function that allows functional components to use React features without writing class components (React v16.8)</li>
                            <li>Includes:</li>
                            <ul>
                                <li><code>useState()</code></li>
                                <li><code>useEffect()</code></li>
                                <li><code>useContext()</code></li>
                                <li><code>useReducer()</code></li>
                                <li><code>useCallback()</code></li>
                                <li>etc.</li>
                            </ul>
                        </ul>

                        <h3><code>useState()</code></h3>
                        <ul>
                            <li>A React hook that allows the creation of a stateful variable.</li>
                            <li>Also a setter function to update its value in the virtual DOM.</li>
                            <li>Usage construct: <code>{`[&lt;name>, &lt;setName>]`}</code></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3>Example:</h3>
                        <p><code>MyComponent.jsx</code></p>
                        <pre><code>
{`import React, {useState} from "react"

export default function Tutor8MyComponent() {
    const [name, setName] = useState('Guest');
    const [age, setAge] = useState(0)
    const [isEmployed, setIsEmployed] = useState(false)

    return (
        <>
            <div>
                <p>Name: {name}</p>
                <button onClick={ _ => setName('Juan Dela Cruz') } >Set Name</button>

                <p>Age: {age}</p>
                <button onClick={ _ => setAge(age + 1) } >Increment Age</button>

                <p>Employed: {isEmployed ? 'Yes' : 'No'}</p>
                <button onClick={ _ => setIsEmployed(!isEmployed) } >Toggle Employed Status</button>
            </div>
        </>
    )
}

export function Tutor8Counter() {
    const [count, setCount] = useState(0)
    
    return (
        <> 
            <div className="tutor8__counter-container">
                <p className="tutor8__count-display" >{count}</p>
                <button onClick={ _ => setCount(count - 1)} >-</button>
                <button onClick={ _ => setCount(0)} >&#8635;</button>
                <button onClick={ _ => setCount(count + 1)} >+</button>
            </div>
        </>
    )
}`}
                        </code></pre>

                        <p><code>App.jsx</code></p>
                        <pre><code>
{`import Tutor8MyComponent, {Tutor8Counter} from "./tutorial-based-jsx-files/tutorial-8__react-hook-and-useState/MyComponent.jsx"

export default function App() {
    return (
        <>
            <h1>8. React hook and <code>useState()</code></h1>

            <h2>A. Basics</h2>
            <Tutor8MyComponent />

            <h2>B. Counter App</h2>
            <Tutor8Counter />
        </>
    )
}`}
                        </code></pre>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C11OnChange() {
    return (
        <div>
            <section id="react-notes__onChange-func">
                <h1><a href="#">11.</a> <code>onChange()</code></h1>
                <article>
                    <div>
                        <ul>
                            <li>Event handler used primarily with form element.</li>
                            <li>Examples:</li>
                            <ul>
                                <li><code>{`<input>`}</code></li>
                                <li><code>{`<textarea`}</code></li>
                                <li><code>{`<select>`}</code></li>
                                <li><code>{`<radio>`}</code></li>
                            </ul>

                            <li>Triggers a function every time the value of the input changes.</li>
                        </ul>
                    </div>

                    <div>
                        <p><code>App.jsx</code> import:</p>
                        <pre><code>
{`import Tutor9MyComponent from "./tutorial-based-jsx-files/tutorial-9__onChange-func/MyComponent.jsx"

export default function App() {
    return (
        <>
            <h1>9. <code>onChange()</code></h1>
            <Tutor9MyComponent />
        </>
    )
}`}
                        </code></pre>
                    </div>

                    <div>
                        <h2>A. <code>{`<input>`}</code> and <code>{`<textarea>`}</code></h2>
                        <p><code>MyComponent.jsx</code></p>
                        <pre><code>
{`import React, {useState} from "react";

export default function Tutor9MyComponent() {
    const [name, setName] = useState('Guest');
    let [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState('');

    return (
        <>
            <div>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <p>Name: {name}</p>

                <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
                <p>Quantity: {quantity}</p>

                <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Enter delivery instruction." />
                <p>Comment: {comment}</p>
            </div>
        </>
    )
}`}
                        </code></pre>
                    </div>

                    <div>
                        <h2>B. <code>{`<select>`}</code></h2>
                        <pre><code>
{`import React, {useState} from "react";

export default function Tutor9MyComponent() {
    const [payment, setPayment] = useState('');

    return (
        <>
            <div>
                <select value={payment} onChange={e => setPayment(e.target.value)}>
                    <option value="" >Select Payment Option</option>
                    <option value="Visa" >Visa</option>
                    <option value="Mastercard" >Mastercard</option>
                    <option value="Giftcard" >Giftcard</option>
                </select>
                <p>Payment: {payment}</p>
            </div>
        </>
    )
}`}
                        </code></pre>
                    </div>

                    <div>
                        <h2>C. <code>{`<radio>`}</code></h2>
                        <pre><code>
{`import React, {useState} from "react";

export default function Tutor9MyComponent() {
    const [shipping, setShipping] = useState('Delivery');

    return (
        <>
            <div>
                <p>Shipping: {shipping}</p>
                <label>
                    <input type="radio" value={'Pick up'} name="shipping" 
                        checked={shipping === 'Pick up'}
                        onChange={e => setShipping(e.target.value)}/>
                    Pick up
                </label>
                <br />
                <label>
                    <input type="radio" value={'Delivery'} name='shipping' 
                        checked={shipping === 'Delivery'}
                        onChange={e => setShipping(e.target.value)}/>
                    Delivery
                </label>
            </div>
        </>
    )
}`}
                        </code></pre>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C12UpdaterFunction() {
    return (
        <div>
            <section id="react-notes__updater-function">
                <h1><a href="#">12.</a> Updater Function</h1>
                <article>
                    <div>
                        <ul>
                            <li>A function passed as an argument to <code>setState()</code> usually.</li>
                            <ul><li>Example: <code>{`setYear(prevYear => prevYear + 1)`}</code></li></ul>
                            
                            <li>Allows for safe updates based on the previous state.</li>
                            <li>Used with multiple state updates and asynchronous functions.</li>
                            <li><strong>Good practice</strong>.</li>
                        </ul>
                    </div>

                    <div>
                        <h2>A. Why we need updater function?</h2>
                        <p>Supposed we have this code:</p>
                        <pre><code>
{`import React, {useState} from "react";

export default function Tutor10UpdaterFunction() {
    const [count, setCount] = useState(0);

    function increaseCount() {
        setCount(count + 1);          // count is 1
        setCount(count + 1);          // count still 1
        setCount(count + 1);          // count still 1
    }

    return (
        <>
            <div className="tutor-10__updater-function-container">
                <p>Count: {count}</p>

                <div className="tutor-10__buttons">
                    <button onClick={ increaseCount } >Increase Count</button>
                </div>
            </div>
        </>
    )
}`}
                        </code></pre>
                        <p>The <code>count</code> would only increase by one even there are multiple <code><span className="--yellow">setCount</span>(<span class="--blue">count</span> + 1);</code></p>
                        <p>The reason why so:</p>
                        <ul>
                            <li>It uses the <strong>current</strong> state to calculate the <strong>next</strong> state.</li>
                            <li><code>setX()</code> functions do no trigger an update.</li>
                            <li>React batches together state updates for performance reasons.</li>
                            <li><strong>Next</strong> state becomes the <strong>current</strong> state after an update.</li>
                        </ul>
                        <p>To do so &mdash; <i>use with multiple state updates</i> and <i>asynchronous functions</i>.</p>
                    </div>

                    <div>
                        <h2>B. Updating Function Basics</h2>
                        <pre><code>
{`import React, {useState} from "react";

export default function Tutor10UpdaterFunction() {
    const [count, setCount] = useState(0);

    function increaseCount() {
        useState(count + 1);
        
        setCount( prevCount => prevCount + 1);
        setCount( prevCount => prevCount + 1);
        setCount( c => c + 1);                          // Just another naming convention
    }

    return (
        <>
            <div className="tutor-10__updater-function-container">
                <p>Count: {count}</p>

                <div className="tutor-10__buttons">
                    <button onClick={ increaseCount } >Increase Count</button>
                </div>
            </div>
        </>
    )
}`}
                        </code></pre>
                        <p>Why this works?</p>
                            <ul>
                                <li>It takes the <strong>pending</strong> state to calculate <strong>next</strong> state.</li>
                                <li>React puts your updater function in a queue (waiting in line).</li>
                                <li>During the next render, it will call them in the same order.</li>
                            </ul>
                        <h3>It's a good practice to future proof your code further.</h3>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C13UpdateObjectInState() {
    return (
        <div>
            <section id="react-notes__update-object-in-state">
                <h1><a href="#">13.</a> Update Object in State</h1>
                <article>
                    <div>
                        <pre><code>
{`import React, {useState} from "react";

export default function Tutor11UpdateObjState() {
    const carDefault = {year: 2024, make: 'Ford', model: 'Mustang'}
    const [car, setCar] = useState(carDefault);

    function updateCarYear(e) {
        setCar( carObj => ({...carObj, year: e.target.value}) )
    }

    return (
        <>
            <div>
                <p>Your favorite car is: {car.year} {car.mak} {car.model}</p>

                <input type="number" value={car.year} 
                    onChange={ e => {updateCarYear(e)} } />
                <br />

                <input type="text" value={car.make} 
                    onChange={ e => setCar( carObj => ({...carObj, make: e.target.value}) )} />
                <br />

                <input type="text" value={car.model} 
                    onChange={ e => setCar( carObj => ({...carObj, model: e.target.value}) )} />
                <br />
            </div>
        </>
    )
}`}
                        </code></pre>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C14UpdateArraysInState() {
    return (
        <div>
            <section id="react-notes__update-arrays-in-state">
                <h1><a href="#">14.</a> Update Arrays in State</h1>
                <article>
                    <div>
                        <p>Food list:</p>
                        <ul>
                            <li>Display food list.</li>
                            <li>Add food.</li>
                            <li>Remove food.</li>
                        </ul>
                        <pre><code>
{`import React, {useState} from "react";

export default function Tutor12MyComponent() {
    const [foods, setFoods] = useState(["Apple", "Orange", "Banana"])
    const [inputVal, setInputVal] = useState('')

    function addFood() {
        setFoods( prevF => ([...prevF, inputVal]) );
        setInputVal('')
    }

    function removeFood() {
        setFoods( prevF => prevF.filter( food => food.toLowerCase</span>() !== inputVal.toLocaleLowerCase()))
        setInputVal('')
    }

    eturn (
        <>
            <div>
                <h2>List of Food</h2>
                <ul>
                    {foods.map( (food, idx) => <li key={idx} >{food}</li>)}
                </ul>

                <input type="text" placeholder="Enter food name" value={inputVal} onChange={ e => setInputVal(e.target.value)}/>
                <button onChange={addFood} >Add</button>
                <button onChange={removeFood} >Remove</button>
            </div>
        </>
    )
}`}
                        </code></pre>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C15UpdateArrayOfObjectsInState() {
    return (
        <div>
            <section id="react-note__update-arrays-of-object-in-state">
                <h1><a href="#">15.</a> Update Array of Objects in State</h1>
                <article>
                    <div>
                        <h2>List of Cars:</h2>
                        <ul>
                            <li>Data shape: <code>{`[{year: int, make: str, model: str}, ...]`}</code></li>
                            <li>Display car objects.</li>
                            <li>Add car object.</li>
                            <li>Remove car objects.</li>
                        </ul>
                        <pre><code>
{`import React, {useState} from "react";

export default function Tutor13MyComponent() {
    const [cars, setCars] = useState( [] )
    const [carYear, setCarYear] = useState(new Date().getFullYear())
    const [carMake, setCarMake] = useState('');
    const [carModel, setCarModel] = useState('')
    
    function handleAddCar() {
        const newCar = {year: carYear, make:carMake, model: carModel}
        setCars( prevC => [...prevC, newCar])
    }

    function handleRemoveCar() {
        const carObj = {year: carYear, make:carMake, model: carModel}
        setCars( prevC => prevC.filter( car => 
            car.year !== carObj.year 
                || car.make !== carObj.make
                || car.model !== carObj.model
            )
        )
    }

    return (
        <>
            <div>
                <h2>List of Cars</h2>
                <ul
                    {cars.map( (car, idx) => <li key={idx} >{car.year} {car.make} {car.model}</li>)}
                </ul>

                <input type="number" value={carYear} onChange={ e => setCarYear(e.target.value)} />
                <br />

                <input type="text" value={carMake} onChange={e => setCarYear(e.target.value)} placeholder="Enter car make"/>
                <br />

                <input type="text" value={carModel} onChange={e => setCarYear(e.target.value)} placeholder="Enter car model" />
                <br />
                
                <div
                    <button onClick={handleAddCar} >Add</button>
                    <button onClick={handleRemoveCar} >Remove</button>
                </div>
            </div>
        </>
    )
}`}
                        </code></pre>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C16UseEffect() {
    return (
        <div>
            <section id="react-note__useEffect-func">
                <h1><a href="#">16.</a> <code>useEffect()</code></h1>
                <article>
                    <div>
                        <ul>
                            <li>React hook that tells React DO SOME CODE WHEN (pick one):</li>
                            <ul>
                                <li>This component <strong>re-renders</strong></li>
                                <li>This component <strong>mounts</strong></li>
                                <li>The state of a value</li>
                            </ul>

                            <li>Usage construct: <code>{`useEffect(<func>, < [dependencies] >)`}</code></li>
                            <ol>
                                <li><code>{`useEffect( () => {})`}</code>: runs after every rerender</li>
                                <li><code>{`useEffect( () => {}, [])`}</code>: runs only on mount</li>
                                <li><code>{`useEffect( () => {}, [value])`}</code>: runs on mount + when value changes</li>
                            </ol>

                            <li><strong>Uses:</strong></li>
                            <ol>
                                <li>Event listeners</li>
                                <li>DOM manipulation</li>
                                <li>Subscriptions (real-time updates)</li>
                                <li>Fetching data from API</li>
                                <li>Clean up when a component unmounts</li>
                            </ol>
                        </ul>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C17UseContext() {
    return (
        <div>
            <section id="react-note__useContext-func">
                <h1><a href="#">17.</a> <code>useContext()</code></h1>
                <article>
                    <div>
                        <ul>
                            <li>React Hook that allows you to share values between multiple levels of components without passing props through each level.</li>
                            <li><strong>Provider Component</strong></li>
                            <ol>
                                <li><code>{`import {createContext from 'react'}`}</code></li>
                                <li><code>{`export const <ContextVar> = createContext()`}</code></li>
                                <li><pre><code>
{`<ContextVar.Provider value={<value>} >
    <Child />
</ContextVar</span>.Provider>`}
                                    </code></pre></li>
                            </ol>

                            <li><strong>Consumer Components</strong></li>
                            <ol>
                                <li><pre><code>
{`import React, {useContext} from 'react';
import {<ContextVar>} from './ComponentA';`}
                                </code></pre></li>
                                <li><code>{`const value = useContext(<ContextVar>);`}</code></li>
                            </ol>
                        </ul>
                    </div>
                    
                    <div>
                        <h2>A. Beginners Way (Viable but tedious)</h2>
                        <h3>Example Situation Overview</h3>
                        <p>Folder <code>dir</code>:</p>
                        <pre><code>
{`/src
└── /assets
        ├── ComponentA.jsx
        ├── ComponentC.jsx
        ├── ComponentB.jsx
        ├── ComponentD.jsx
        ├── App.jsx
        ├── main.jsx
        └── index.css`}
                        </code></pre>

                        <p>Importing are chained:</p>
                        <pre><code>ComponentA.jsx <span className="--yellow">&rarr;</span> ComponentB.jsx <span className="--yellow">&rarr;</span> ComponentC.jsx <span className="--yellow">&rarr;</span> ComponentD.jsx</code></pre>

                        <p>Beginner's way (Using Props):</p>
                        <ul><li><code>ComponentA.jsx</code>:</li></ul>
                        <pre><code>
{`import ComponentB from "../tutorial-14__useEffect-hook/ComponentB";
import React, {useState} from "react";

export default function Tutor15MyComponent() {
    const [user, setUser] = useState('JuanDLX')

    return (
        <>
            <div>
                <h2>ComponentA</h2>
                <h3>Hello, {user}</h3>

                <ComponentB user={user}/>
                <br />
            </div>
        </>
    )
}`}
                        </code></pre>
                        <ul><li><code>ComponentD.jsx</code>:</li></ul>
                        <pre><code>
{`export default function ComponentD({ user }) {
    return (
        <>
            <div>
                <h2>ComponentD</h2>
                <p>Bye, {user}</p>
            </div>
        </>
    )
}`}
                        </code></pre>
                    </div>

                    <div>
                        <h2>B. Use of <code>useContext()</code></h2>
                        <p><code>ComponentA.jsx</code>:</p>
                        <pre><code>
{`import ComponentB from "../tutorial-14__useEffect-hook/ComponentB";
import React, {useState, createContext} from "react";


export const UserContext = createContext()

export default function Tutor15MyComponent() {
    const [user, setUser] = useState('JuanDLX')

    return (
        <>
            <div>
                <h2>ComponentA</h2>
                <h3>Hello, {user}</h3>
                
                <UserContext.Provider value={user}>
                    <ComponentB />
                </UserContext.Provider>
            </div>
        </>
    )
}`}
                        </code></pre>
                        
                        <p><code>ComponentD.jsx</code>:</p>
                        <pre><code>
{`import React, {useContext} from "react"
import { UserContext } from "../tutorial-15__useContext-func/MyComponent"

export default function ComponentD() {
    const userContextExample = useContext(UserContext)

    return (
        <>
            <div>
                <h2>ComponentD</h2>
                <p>Bye, {userContextExample}</p>
            </div>
        </>
    )
}`}
                        </code></pre>
                    </div>
                </article>
            </section>
        </div>
    )
}

function C18UseRef() {
    return (
        <div>
            <section id="react-note__useRef-func">
                <h1><a href="#">18.</a> <code>useRef()</code></h1>
                <article>
                    <div>
                        <ul>
                            <li>Means "use Reference"</li>
                            <li>Very similar to <code>useState()</code>.</li>
                            <li>Does not cause re-renders when its value changes.</li>
                            <li>When you want a component to "remember" some information, but you don't want that information to trigger new renders.</li>
                            
                            <li>Helpful on:</li>
                            <ol>
                                <li>Accessing/Interacting with DOM elements</li>
                                <li>Handling Focus, Animations, and Transitions</li>
                                <li>Managing Timers and Intervals</li>
                            </ol>
                        </ul>

                        <p><code>useState()</code></p>
                        <ul><li>Re-renders the component when the state value change.</li></ul>
                    </div>

                    <div>
                        <h2>A. <code>useRef()</code> Does Not Re-renders</h2>
                        <pre><code>
{`import React, {useState, useEffect, useRef} from "react";

export default function Tutor16MyComponent() {
    const ref = useRef(0);

    // useEffect() to confirm if clicking button with useRef() renders or not.
    useEffect(() => {
        console.log('Component Rendered.')
    })
    
    return (
        <>
            <div>
                <button onClick={_ => setNumber(n => n + 1)}>Click me</button>
                <button onClick={_ => {
                        ref.current++; 
                        console.log('ref.current =', ref.current)
                    }} >Click me (useRef)
                </button>
            </div>
        </>
    )
}`}
                        </code></pre>   

                        <p>Console Log:</p>
                        <pre><code>
{`ref.current = {'current': 1}`}
                        </code></pre>
                    </div>

                    <div>
                        <h2>B. Accessing DOM</h2>
                        <pre><code>
{`import React, {useState, useEffect, useRef} from "react";

export default function Tutor16MyComponent() {
    const inputRef = useRef(null);

    useEffect(() => {
        console.log('Component Rendered.')
    })
    
    return (
        <>
            <div>
                <button onClick={_ => {
                        console.log('inputRef =', inputRef)
                        inputRef.current.focus()                      // averts cursor to the <input> field
                        inputRef.current.style.backgroundColor = "hsl(34, 97%, 23%)"
                    }}>Click me (useRef)
                </button>
                <br />

                <input type="text" ref={inputRef}/>
            </div>
        </>
    )
}`}
                        </code></pre>
                    </div>
                </article>
            </section>
            <hr />
        </div>
    )
}