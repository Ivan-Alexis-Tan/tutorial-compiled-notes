export default function ServerAndClientComponents() {
    return (
        <div className="mb-5">
            <h1 className="h1-title">Server Components and Client Components</h1>

            <div className="mb-5">
                <h2 className="h2-title">🗄️ Server Components</h2>
                <ul className="[&>li]:mt-2 [&>li]:ml-5 [&>li,&>ul>li]:list-disc [&>ul]:ml-10 mb-5">
                    <li>Rendered on the server.</li>
                    <li>HTML output is then sent to the client.</li>
                    <li><strong>Can access serverside resources</strong> (e.g., database, file system)</li>
                    <ul>
                        <li>Reduces the amount of JS to the client.</li>
                        <li>Improving performance.</li>
                    </ul>

                    <li>Reliable for keeping sensitive information (e.g., access token)</li>
                </ul>

                <h3 className="h3-title">When to Use</h3>
                <ul className="[&>li]:mt-1 [&>li]:ml-5">
                    <li><strong>Data Fetching:</strong> Fetching data directly from your backend or database.</li>
                    <li><strong>Static Content:</strong> Rendering blogs, product lists, or layouts.</li>
                    <li><strong>Security:</strong> Keeping sensitive logic and API keys away from the client.</li>
                    <li><strong>Performance:</strong> Reducing the amount of JavaScript sent to the user's device.</li>
                </ul>
            </div>
            <hr className="--hr-faded"/>

            <div className="mb-5">
                <h2 className="h2-title">🖥️ Client Components</h2>
                <ul className="[&>li]:mt-2 [&>li]:ml-5 [&>li]:list-disc mb-5">
                    <li>Rendered on client-side (the browser).</li>
                    <li>Excells on client interactivity (e.g., buttons, page navigation, form submission)</li>
                    <li>Must write <code>'use client'</code> string on the top most of the component file.</li>
                    <pre><code>
{`</> JavaScript
'use client'        //<- Also serves as flag what type of component this is

export default function ClientSideComponent() {
    return (
        <div>
            ...
        </div>
    )
}

`}
                    </code></pre>
                    <li>Components are server component on default until <code>'use client'</code> is written.</li>
                    <li>Pre-rendered on the serverside to create a static shell, then hydrate it to client-side.</li>
                    <li>Everything within the client component that doesn't require interactivity or isn't dependent on the browser is still rendered on the server.</li>
                </ul>

                <h3 className="h3-title">When to Use:</h3>
                <ul className="[&>li]:mt-1 [&>li]:ml-5">
                    <li><strong>Interactivity:</strong> Handling user actions like button clicks, form submissions, or toggles.</li>
                    <li><strong>State Management:</strong> Using hooks like <code>useState</code> or <code>useReducer</code> to manage local UI states.</li>
                    <li><strong>Broswer APIs:</strong> Accessing <code>window</code>, <code>localStorage</code>, <code>navigator</code>, or geolocation</li>
                    <li><strong>Animations:</strong> Using client-side libraries for motion or complex UI updates.</li>
                </ul>
            </div>
            <hr className="--hr-faded"/>

            <div className="mb-5">
                <h2 className="h2-title">Key Difference</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Server Components</th>
                            <th>Client Components</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Execution Environment</th>
                            <td>Runs only on the server</td>
                            <td>Primarily runs on the client; pre-renders on the server for initial load.</td>
                        </tr>
                        <tr>
                            <th>Directive</th>
                            <td>None (Default behavior)</td>
                            <td>Requires <code>"use client"</code> at the top of the file.</td>
                        </tr>
                        <tr>
                            <th>React Hooks</th>
                            <td><strong>No</strong> support for <code>useState</code>, <code>useEffect</code>, or others.</td>
                            <td><strong>Full</strong> support for all hooks.</td>
                        </tr>
                        <tr>
                            <th>Interactivity</th>
                            <td>Static; no event handlers like <code>onClick</code>.</td>
                            <td>Dynamic; supports event listeners and browser</td>
                        </tr>
                        <tr>
                            <th>Bundle Size</th>
                            <td>Smaller; code is not sent to the browser</td>
                            <td>Larger; JS bundle is sent to the client for hydration</td>
                        </tr>
                        <tr>
                            <th>Data Fetching</th>
                            <td>Fetch directly from databases or APIs on the server</td>
                            <td>Fetch via client-side libraries or props from server parents</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}