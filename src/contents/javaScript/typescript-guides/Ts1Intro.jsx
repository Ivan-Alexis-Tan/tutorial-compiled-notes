
export default function Ts1Introduction() {
    return (
        <div>
            <h1>TypeScript Introduction</h1>
            <div>
                <h2>1. Typescript Setup</h2>
                <div>
                    <h3>Typescript Installation</h3>
                    <ul>
                        <h3>Step 1: Install Node JS</h3>
                        <p>To check if installed, run <code>node -v</code> on terminal.</p>
                        <ul>
                            <li>If show like <code>v24.11.1</code>, you have it installed</li>
                            <li>If nothing found, install from <code>nodejs.org</code></li>
                        </ul>
                         
                        <h3>Step 2: Run <code>npm install -g typescript</code></h3>
                        <p><code>-g</code> means global &mdash; installs globally to access Typescript compiler</p>
                        <p>If throws error during installation, run <code>sudo npm install -g typescript</code></p>
                        <ul><li><strong>Sudo</strong> provides an efficient way to temporarily grant users or user groups previlidged access to system resources.</li></ul>
                    </ul>
                </div>

                <div>
                    <h3>Creating a New Project</h3>
                    <p>Run:</p>
                    <pre><code>
{`</> Bash
npm init -y
`}
                    </code></pre>
                    <ul><p>This creates <code>package.json</code> file.</p></ul>

                    <p>Then run:</p>
                    <pre><code>
{`</> Bash
npm install typescript --save-dev
`}
                    </code></pre>
                    <ul>
                        <p>This creates:</p>
                        <ul>
                            <li><code>node_modules</code> folder</li>
                            <li><code>package-lock.json</code> file</li>
                        </ul>
                    </ul>

                    <p>Finally, add typescript configuration json file:</p>
                    <pre><code>
{`</> Bash
npx tsc --init
`}
                    </code></pre>
                </div>
            </div>
            <hr />

            <div>
                <h2>2. Running & Scripts</h2>
                <div>
                    <h3>TypeScript can't run directly &mdash; Node.js only understands JavaScript</h3>
                    <p>Compile first the <code>.ts</code> file &rarr; <code>.js</code> file, then run the <code>.js</code> file.</p>
                    <p>Run:</p>
                    <pre><code>
{`</> Bash
tsc <file_name>.ts              # Creates .js files
node <file_name>.js             # Runs the .js file (the compiled from .ts file)
`}
                    </code></pre>
                    <p>The <code>tsc</code> command produces a <code>.js</code> file and a <code>.map</code> files.</p>
                    <p>The <code>.map</code> file is a <strong>source map</strong> &mdash; used for debugging, maps compiled JS back to your original TS.</p>
                </div>

                <div>
                    <h3>Why <code>node {`<file_name>.ts`}</code> Works.</h3>
                    <p>✔️ Has TypeScript runner installed.</p>
                    <p>Tools like <code>tsx</code> or <code>ts-node</code> let you skip compilation.</p>
                    <p>Node v22.6+ also has experimental built-in TypeScript support.</p>
                    <p>Check verision:</p>
                    <pre><code>
{`</> Bash
node -v
`}
                    </code></pre>
                    <p>On Node 22.6 or newer, Node can strip TypeScript types and run <code>.ts</code> files directly &mdash; no extra tools needed.</p>
                </div>

                <div>
                    <h3>NPM Scripts &mdash; <code>package.json</code></h3>
                    <p>A shortcut defined in <code>package.json</code> so you don't have to remember or type long commands.</p>
                    <pre><code>
{`</> Bash
"scripts": {
    "dev": "tsc && node <file_name>.js"
}`}
                    </code></pre>
                    <p>With this, running <code>npm run dev</code> executes that whole command for you.</p>
                </div>

                <div>
                    <h3>What <code>&&</code> means</h3>
                    <p>&ndash; Run the second command <i>only if the first one succeeds</i>.</p>
                    <p>If <code>tsc</code> fails (e.g. type error), <code>code {`<file_name>.js`}</code> won't run &mdash; protecting you from running broken code.</p>
                </div>

                <div>
                    <h3>Why it matters in real projects</h3>
                    <p>Scripts grow over time. Your whole team can use the same short commands wihtout knowing what's behind them.</p>
                    <pre><code>
{`</> Bash
"scripts": {
  "dev":   "tsx watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "test":  "jest",
  "lint":  "eslint src/"
}`}
                    </code></pre>
                </div>

                <div>
                    <h3>Quick Reminder:</h3>
                    <p><strong>Learning</strong> &mdash; <code>node {`<file_name>.ts`}</code> is fine for quick experiments.</p>
                    <p><strong>Real Projects</strong> &mdash; Always use a build step + <code>npm run</code> scripts.</p>
                </div>
            </div>
            <hr />

            <div>
                <h2>3. Dynamic VS Static Typing</h2>

                <h3>Dynamic Typing</h3>
                <p>The type of variables <strong>can change at runtime.</strong></p>
                <p>Example:</p>
                <pre><code>
{`</> JavaScript
let myVariable = 10;
console.log(${"`type: ${typeof myVariable}, value: ${myVariable}`"})

myVariable = "Hello World!"
console.log(${"`type: ${typeof myVariable}, value: ${myVariable}`"})
`}
                </code></pre>

                <p>Console Log:</p>
                <pre><code>
{`type: number, value: 10
type: string, value: Hello World!
`}
                </code></pre>
                <p>Reassigning works perfectly fine. No errors.</p>

                <h3>Static Typing</h3>
                <p>Throws and error if a defined variable reassigned with different data type.</p>
                <p>Example: from <code>str</code> type to <code>int</code> type</p>
            </div>
        </div>
    )
}