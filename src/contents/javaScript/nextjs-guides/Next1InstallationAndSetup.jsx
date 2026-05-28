import { languageRoute } from "../../../routeData"
import { useParams } from "react-router-dom"

const titles = languageRoute('javascript').libTitles('nextjs')

export default function InstallationAndSetup() {
    return (
        <div>
            <h1>{titles[useParams().id]}</h1>
            <div>
                <h2>A. Installation</h2>
                <li>Only installs the dependencies to setup a Next.js environment (e.g. TypScript, Tailwind CSS, etc.)</li>
                <p>In CMD write:</p>
                <pre><code>
{`npx create-next-app`}
                </code></pre>
                
                <p>Then it will ask many different questions about dependencies to install.</p>
                    <ol>
                        <li>"What is your project name?"</li>
                            <ul><li><code>.</code> if you want the current dir as project folder.</li></ul>
                        <li>"Would you like to use the recommended Next.js defaults?"</li>
                            <ul><li>When it doubt, choose <i>"yes, use recommended defaults"</i></li></ul>
                    </ol>
                
                <p>The terminal could be like this after answering and installing all dependencies.</p>
                <pre><code>
{`C:/Users/Acer/Documents/Software Development/Javascript/tutorial/nextjs-tutorials/nextjs-tutorial>npx create-next-app
Need to install the following packages:
create-next-app@16.1.6

√ What is your project named? ... .
√ Would you like to use the recommended Next.js defaults? » Yes, use recommended defaults
Creating a new Next.js app in C:/Users/Acer/Documents/Software Development/Javascript/tutorial/nextjs-tutorials/nextjs-tutorial.

Using npm.

Initializing project with template: app-tw 


Installing dependencies:
- next
- react
- react-dom

Installing devDependencies:
- @tailwindcss/postcss
- @types/node
- @types/react
- @types/react-dom
- eslint
- eslint-config-next
- tailwindcss
- typescript


added 356 packages, and audited 357 packages in 3m

141 packages are looking for funding
  run "npm fund" for details

found 0 vulnerabilities

Generating route types...
✓ Types generated successfully

Initialized a git repository.

Success! Created nextjs-tutorial at C:/Users/Acer/Documents/Software Development/Javascript/tutorial/nextjs-tutorials/nextjs-tutorial
`}
                </code></pre>
            </div>

            <div>
                <h2>B. Folders and Files Created/Installed</h2>
                <p>There are files created after running <code>npx create-next-app</code>.</p>
                <pre><code>
{`/myApp
├── /.next
├── /app
|   ├── favicon.ico
|   ├── global.css
|   ├── layout.tsx
|   └── page.tsx
├── /node_modules
├── /public
├── package.json
├── postcss.config.mjs
├── README.MD
└── tsconfig.json
`}
                </code></pre>
                
                <table>
                    <thead>
                        <tr>
                            <th>File</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>/.next</th>
                            <td>Contains the build and cache files of next.js app.</td>
                        </tr>
                        <tr>
                            <th>/app</th>
                            <td>The app developing location.</td>
                        </tr>
                        <tr>
                            <th>/app/global.css</th>
                            <td>
                                <li>The main CSS file.</li>
                                <li>If using tailwind, it automatically imports <code>@import "tailwindcss"</code>.</li>
                            </td>
                        </tr>
                        <tr>
                            <th>/app/layout.tsx</th>
                            <td>
                                <li>Where you build and import your next react app.</li>
                                <li>Acts like <code>root.jsx</code> in React.</li>
                            </td>
                        </tr>
                        <tr>
                            <th>/public</th>
                            <td>Contains static files (jpeg, png, mp4, mp3, etc.) that can be served directly to the client.</td>
                        </tr>
                        <tr>
                            <th>eslint.config.mjs</th>
                            <td>An ESLint configuration.</td>
                        </tr>
                        <tr>
                            <th>next-env.d.ts</th>
                            <td>A declaration file for TS (<strong>should not be touched</strong>).</td>
                        </tr>
                        <tr>
                            <th>next.config.ts</th>
                            <td>
                                <li>Serves as configuration file of next.js application.</li>
                                <li>Allow to set up custom webpack configs, add any environments, enable or disable certain features, or even customizing next.js settings.</li>
                            </td>

                        </tr>
                        <tr>
                            <th>package.json</th>
                            <td>
                                <li>Specifies packages and their versions.</li>
                                <li><code>"dev": "next dev"</code> specifies how it runs when <code>npm run dev</code> is executed in terminal.</li>
                                <li>When deployed, it now runs with:</li>
                                    <ul>
                                        <li><code>"build": "next build"</code> with <code>npm build</code>, and</li>
                                        <li><code>"start": "next start"</code> with <code>npm start</code> to start the server.</li>
                                    </ul>
                                <li><code>"lint": "eslint"</code> checks the all code if any linting issues, such as styles or syntax.</li>
                                    <ul>
                                        <li>Running <code>npm run lint</code> finds issues in your code and gives suggestions about it.</li>
                                    </ul>
                            </td>
                        </tr>
                        <tr>
                            <th>postcss.config.mjs</th>
                            <td>A Tailwind plugin if it is one of the installed dependencies.</td>
                        </tr>
                        <tr>
                            <th>tsconfig.json</th>
                            <td>
                                <li>A TS configuration file.</li>
                                <li>JSON file for configuration (e.g. <code>strict: true)</code>.</li>
                                <li>Settings on how TS going to operate.</li>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}