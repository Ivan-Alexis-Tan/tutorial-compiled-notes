import { useLocation } from "react-router-dom"

const contentGuides = {
    1: 'Installation & Setup',
    2: 'useQuery()',
    3: 'Loading states, Error states, Refetching, etc.',
    4: 'Query Options (parameters)',
    5: 'Constional Querying (kinda)',
    10: 'useMutation()',
    11: 'Invalidating Queries'
}

export default function C19ReactQuery() {
    const loc = useLocation()
    
    return (
        <div>
            <h1>React Query (TanStack Lib <code>useQuery</code>)</h1>
            <div>
                <ul>
                    <li>Are hooks that have <strong>React state</strong> for <i>data</i>, <i>loading</i>, <i>errors</i>, etc.</li>
                    <li>Caching queries.</li>
                    <li>Handling stale data.</li>
                    <li>Performance optimization.</li>
                    <li>Page focus refetching</li>
                    <li>etc.</li>
                </ul>

                <h3 id="tanstack-lib__content-guides">Content Guides:</h3>
                <ol>
                    <li><a href="#tanstack-lib-sec__installation-setup">{contentGuides[1]}</a></li>
                    <li><a href="#tanstack-lib-sec__useQuery-func"><code>{contentGuides[2]}</code></a></li>
                    <li><a href="#tanstack-lib-sec__states-and-fetching">{contentGuides[3]}</a></li>
                    <li><a href="#tanstack-lib-sec__query-options-parameters">{contentGuides[4]}</a></li>
                    <li><a href="#tanstack-lib-sec__conditional-querying">{contentGuides[5]}</a></li>
                    <li><a href="#tanstack-lib_sec__useMutation-func"><code>{contentGuides[10]}</code></a></li>
                    <li><a href="#tanstack-lib-sec__invalidating-queries">{contentGuides[11]}</a></li>
                </ol>
            </div>

            <p>pathname = {loc.pathname}</p>
            <p>hash = {loc.hash}</p>
            <InstallationAndSetup />
            <UseQueryFunc />
            <StatesAndRefetching />
            <QueryOptionParameters />
            <ConditionalQuerying />

            <UseMutationFunc />
            <InvalidatingQueries />
        </div>
    )
}

function InstallationAndSetup() {
    return (
        <div>
            <div id="tanstack-lib-sec__installation-setup">
                <h2><a href="#tanstack-lib__content-guides">1. </a>{contentGuides[1]}</h2>
                <p>CMD Command:</p>
                <pre><code>
npm i @tanstack/react-query
                </code></pre>

                <p>Root setup in <code>main.jsx</code></p>
                <pre><code>
{`import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App.jsx";

// Importing React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Query Setup
const queryClient = new QueryClient()

// React Query Root Setup
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>
)
`}
                </code></pre>
            </div>
        </div>
    )
}

function UseQueryFunc() {
    return (
        <div>
            <div id="tanstack-lib-sec__useQuery-func">
                <h2><a href="#tanstack-lib__content-guides">2. </a><code>{contentGuides[2]}</code></h2>

                <div>
                    <p>Inside a component:</p>
                    <pre><code>
{`import { useQuery } from "@tanstack/react-query";

export default function App() {
    const { data } = useQuery({
        queryKey: ['<fetchingVar>'],
        queryFn: fetchingFunc
    })

    return (
        <>
            <p>{JSON.stringify(data)}</p>
        </>
    )
}

async function <fetchingFunc>() {
    const res = await fetch("<URL>");
    return await res.json()
}
`}
                    </code></pre>
                    <h3>What happened?</h3>
                    <ul>
                        <li>Import <code>useQuery()</code> from <code>"@tanstack/react-query"</code></li>
                        <li><code>&#123; data &#125;</code> is one of <code>useQuery()</code>'s return we can access.</li>
                        <ul>
                            <li>This serves as shortcut to avoid <code>{`<useQueryVar>`}.data</code></li>
                        </ul>

                        <li>Create two properties (<code>queryKey</code> and <code>queryFn</code>)</li>
                        <ul>
                            <li><code>queryKey</code></li>
                            <ul>
                                <li>Used for fetching data and caching data.</li>
                                <li>Must be an array.</li>
                                <li>Needs to be unique.</li>
                            </ul>

                            <li><code>queryFn</code></li>
                            <ul>
                                <li>The place to <strong>put the function of API call</strong> (fetch, axios, etc.) to get your data.</li>
                            </ul>
                        </ul>
                        <li><code>fetchingFunc()</code> returns JSON and gets parsed as JSON data</li>
                        <li>Place <code>fetchingFunc</code> to <code>queryFn</code>.</li>
                        <li><code>JSON.stringify(data)</code> just displays the data. Not big deal, but to show usage of <code>data</code> variable.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

function StatesAndRefetching() {
    return (
        <div id="tanstack-lib-sec__states-and-fetching">
            <h2><a href="#tanstack-lib__content-guides">3. </a>{contentGuides[3]}</h2>

            <div>
                <h3>A. Loading state</h3>
                <p>Uses <code>&#123; isPending &#125; = useQuery(&#123;...&#125;)</code></p>
                <ul><li>Returns <code>true</code> if still fetching, <code>false</code> if fetching finished.</li></ul>
                <pre><code>
{`import { useQuery } from "@tanstack/react-query";

export default function App() {
    const { data, isPending } = useQuery({
        queryKey: ['<fetchingVar>'],
        queryFn: fetchingFunc
    })

    return (
        <>
            {(isPending)
                ? <p>Loading...</p>
                : <p>JSON.stringify(data)</p>
            }
        </>
    )
}

async function <fetchingFunc>() {
    const res = await fetch("<URL>");
    return await res.json()
}
`}
                </code></pre>
                <p><code>isPending</code> is another <code>userQuery()</code>'s accessible returns.</p>
                <ul><li>Will display <code>Loading...</code> if still fetching, but displays <code>data</code> if fetching is finished.</li></ul>
            </div>

            <div>
                <h3>B. Refetch</h3>
                <p>Uses <code>&#123; refetch &#125; = useQuery(&#123;...&#125;)</code></p>
                <ul><li>Refetches data from cached data.</li></ul>
                <pre><code>
{`import { useQuery } from "@tanstack/react-query";

export default function App() {
    const { data, isPending, refetch } = useQuery({
        queryKey: ['<fetchingVar>'],
        queryFn: fetchingFunc
    })

    return (
        <>
            {(isPending)
                ? <p>Loading...</p>
                : <p>JSON.stringify(data)</p>
            }
            <button onClick={_ => refetch()}>
                Refetch
            </button>
        </>
    )
}

async function <fetchingFunc>() {
    const res = await fetch("<URL>");
    return await res.json()
}
`}
                </code></pre>
                <p>Clicking <i>Refetch</i> button refetches the data.</p>
                <ul>
                    <li><strong>No longer loads the page</strong> since the the query where already fetched once.</li>
                    <li>Once fetched, <strong>it get cached</strong> using <code>queryKey</code> <i>"fetchingVar"</i></li>
                    <li>In other words, it <strong>re-retrieves data from cache</strong>.</li>
                </ul>
                <p>If used <code>isFetching</code> instead of <code>isPending</code>:</p>
                <ul>
                    <li>Page will show <code>Loading...</code> each time it is fetching.</li>
                    <li><strong>Either fetching from db or from cache</strong>, it loads the page</li>
                </ul>
            </div>

            <div>
                <h2>C. Error State</h2>
                <p>Uses <code>&#123; error &#125; = useQuery(&#123;...&#125;)</code></p>
                <ul><li>Accesses the error.</li></ul>
                <pre><code>
{`import { useQuery } from "@tanstack/react-query";

export default function App() {
    const { data, isPending, refetch, error } = useQuery({
        queryKey: ['<fetchingVar>'],
        queryFn: fetchingFunc
    })

    // If error occurs
    if (error) return <h1>
        Oh no! Something went wrong! =(
    </h1>

    return (
        <>
            {(isPending)
                ? <p>Loading...</p>
                : <p>JSON.stringify(data)</p>
            }
            <button onClick={_ => refetch()}>
                Refetch
            </button>
        </>
    )
}

async function <fetchingFunc>() {
    const res = await fetch("<URL>");
    return await res.json()
}
`}
                </code></pre>
                <p>If <code>error</code> is true, the page will only show error message.</p>
            </div>
        </div>
    )
}

function QueryOptionParameters() {
    return (
        <div id="tanstack-lib-sec__query-options-parameters">
            <h2><a href="#tanstack-lib__content-guides">4. </a>{contentGuides[4]}</h2>
            <div>
                <ul>
                    <li>Neccessity to pass in some parameters to the query.</li>
                </ul>
            </div>

            <div>
                <pre><code>
{`import { useQuery } from "@tanstack/react-query";

export default function App() {
    const [id, setId] = useState(1)

    const { data, isPending } = useQuery({
        queryKey: ['<fetchingVar>', id],
        queryFn: () => fetchingFunc(id)
    })

    return (
        <>
            {(isPending)
                ? <p>Loading...</p>
                : <p>JSON.stringify(data)</p>
            }
            <button onClick={_ => setId(prev => prev + 1)}>
                Increment ID
            </button>
        </>
    )
}

async function <fetchingFunc>(id) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const res = await fetch("<URL>");
    return await res.json()
}
`}
                </code></pre>
            </div>
        </div>
    )
}

function ConditionalQuerying() {
    return (
        <div id="tanstack-lib-sec__conditional-querying">
            <h2><a href="#tanstack-lib__content-guides">5. </a>{contentGuides[5]}</h2>
            <div>
                <pre><code>

                </code></pre>
            </div>
        </div>
    )
}

function UseMutationFunc() {
    return (
        <div id="tanstack-lib_sec__useMutation-func">
            <h2><a href="#tanstack-lib__content-guides">10. </a><code>{contentGuides[10]}</code></h2>
            <div>
                <ul>
                    <li>Allows to operate CRUD in database.</li>
                    <li>Use of <code>useMutation</code> from <code>@tanstack/react-query</code></li>
                        <ul><li>Needed to be imported.</li></ul>
                </ul>
            </div>

            <div>
                <pre><code>
{`import { useQuery, useMutation } from "@tanstack/react-query";

export default function App() {
    const { data, isPending } = useQuery({
        queryKey: ['<fetchingVar>'],
        queryFn: fetchingFunc
    })

    const { mutate } = useMutation({
        mutationFn: mutationFunc
    })

    return (
        <>
            {(isPending)
                ? <p>Loading...</p>
                : <p>JSON.stringify(data)</p>
            }
            <button onClick={ _ => mutate({
                    "userId": 5000,
                    "id": 4000,
                    "title": "All things bright are beautiful",
                    "body": "All creatures great and small"
                }) }>
                Add Post
            </button>
        </>
    )
}

async function <fetchingFunc>() {
    const res = await fetch("<URL>");
    return await res.json()
}

async function <mutationFunc>(<newData>) {
    const res = await fetch("<URL>", {
        method: "POST",
        body: JSON.stringify( <newData> ),
        headers: { "Content-type": "application/json" }
    })
    return res.json()
}
`}
                </code></pre>
                <p>What happened?</p>
                <ol>
                    <li><strong>Created a function <code>mutationFunc()</code></strong> outside the component.</li>
                        <ul>
                            <li>This avoids messy script and optimize readability.</li>
                            <li>Since it is adding new data, <strong>param <code>newData=</code></strong> is also set.</li>
                        </ul>

                    <li><strong>Fetched the data</strong> using <code>fetch()</code>.</li>
                        <ul>
                            <li>First arg is an URL to fetch data.</li>
                            <li>Second arg is request object.</li>
                                <ul>
                                    <li><code>"method"</code> is the request method.</li>
                                    <li><code>"body"</code> is the data to add (since it is a POST request).</li>
                                        <ul><li>Used <code>JSON.stringify()</code> to be parsed.</li></ul>
                                    
                                    <li><code>"headers"</code> further details about the request status.</li>
                                </ul>
                            <li><strong>Returns JSON of <code>res</code></strong>.</li>
                        </ul>
                    <li><strong>Created <code>useMutation()</code> object</strong>, but <strong>unpacked with only key <code>&#123; mutate &#125;</code></strong> for easy access for demonstration only.</li>
                        <ul>
                            <li><code>mutationFn:</code> places the function name that will execute.</li>
                                <ul><li>Must not be called, <strong><code>{`<mutationObj>`}.mutate()</code> will do the func calling</strong>.</li></ul>
                        </ul>
                    
                    <li>Set <code>{`<mutationObj>`}.mutate()</code> as <code>onClick=</code> attrib in <code>{`<button>`}</code> tag.</li>
                        <ul><li>Calls <code>mutationFunc()</code> to execute when clicked.</li></ul>
                </ol>
            </div>
        </div>
    )
}

function InvalidatingQueries() {
    return (
        <div id="tanstack-lib-sec__invalidating-queries">
            <h2><a href="#tanstack-lib__content-guides">11. </a><code>{contentGuides[11]}</code></h2>
            <div>
                <pre><code>
{`import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function App() {
    const queryClient = useQueryClient();

    const { data, isPending } = useQuery({
        queryKey: ['<fetchingVar>'],
        queryFn: fetchingFunc
    })
    
    const { mutate } = useMutation({
        mutationFn: mutationFunc,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['<fetchingVar>'] })
        }
    })

    return (
        <>
            {(isPending)
                ? <p>Loading...</p>
                : <p>JSON.stringify(data)</p>
            }
            <button onClick={ _ => mutate{
                    "userId": 5000,
                    "id": 4000,
                    "title": "All things bright are beautiful",
                    "body": "All creatures great and small"
                }}>
                Add Post
            </button>
        </>
    )
}

async function <fetchingFunc>() {
    const res = await fetch("<URL>");
    return await res.json()
}

async function <mutationFunc>(<newData>) {
    const res = await fetch("<URL>", {
        method: "POST",
        body: JSON.stringify( <newData> ),
        headers: { "Content-type": "application/json" }
    })
    return res.json()
}
`}
                </code></pre>
            </div>
        </div>
    )
}
