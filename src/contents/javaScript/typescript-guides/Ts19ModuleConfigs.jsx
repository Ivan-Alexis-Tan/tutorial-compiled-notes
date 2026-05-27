export default function Ts19ModuleConfigs() {
    return (
        <div>
            <h1>Module Settings and Configurations</h1>
            <div>
                <h2>Two Module Systems</h2>
                <p><strong>CommonJS</strong> and <strong>ES Module</strong></p>
                <p>Pick one and stay consistent. Mixing them is what causes those errors.</p>
                
                <table>
                    <thead>
                        <tr>
                            <th> </th>
                            <th>CommonJS</th>
                            <th>ES Module</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Importing style</td>
                            <td><code>{`import { <var_func_class> } from "./<ts_file_name>"`}</code></td>
                            <td><code>{`import { <var_func_class> } from "./<file_name>.js"`}</code></td>
                        </tr>
                        <tr>
                            <td>Syntax (compiler)</td>
                            <td><code>require()/module.exports</code></td>
                            <td><code>import</code>/<code>export</code></td>
                        </tr>
                        <tr>
                            <td><code>package.json</code></td>
                            <td><code>"type": "commonjs"</code> (or omitted)</td>
                            <td><code>"type": "module"</code></td>
                        </tr>
                        <tr>
                            <td><code>tsconfig</code> <code>module</code></td>
                            <td><code>"commonjs"</code></td>
                            <td><code>"nodenext"</code> or <code>"esnext"</code></td>
                        </tr>
                        <tr>
                            <td>Common use</td>
                            <td>Node.js scripts, older projects</td>
                            <td>Moern projects, React, etc.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr className="--hr-faded"/>

            <div>
                <h2>The Config That Works for Beginners (CommonJS)</h2>
                <p><code>package.json</code>:</p>
                <pre><code>
{`</> JSON
"type": "commonjs"
`}
                </code></pre>

                <p><code>tsconfig.json</code> &mdash; the key settings:</p>
                <pre><code>
{`</> JSON
{
  "compilerOptions": {
    "module": "commonjs",      // must match package.json
    "target": "esnext",
    "strict": true,
    // "verbatimModuleSyntax": true  <-- keep this commented out for CommonJS
  }
}
`}
                </code></pre>

                <p>Then your exports just work normally:</p>
                <pre><code>
{`</> TypeScript
// exporting
export { exePart1 };
export default MyClass;

// importing
import { exePart1 } from "./part1-base-classes/base-classes";
`}
                </code></pre>
            </div>
            <hr className="--hr-faded"/>
            
            <div>
                <h2>The One Rule to Remember</h2>
                <p className="--indented-meaning-text">
                    <code>verbatimModuleSyntax: true</code> + <code>"module": "commonjs"</code> = error. 
                    They are compatible. If you're on CommonJS, keep <code>verbatimModuleSyntax</code> off.
                </p>
            </div>
        </div>
    )
}