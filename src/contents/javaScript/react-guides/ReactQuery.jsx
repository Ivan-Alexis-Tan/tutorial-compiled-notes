import { useState } from "react"
import { useLocation } from "react-router-dom"

export default function C19ReactQuery() {
    const [guideId, setGuideId] = useState(1)
    const loc = useLocation()
    const ids = Object.keys(contentGuides)
    
    return (
        <div className="[&_h2]:text-2xl [&_h2,&_h3]:font-bold [&_h2]:mb-5 [&_h3]:text-xl"
        >
            <h1 className="text-4xl font-bold mb-5">React Query (TanStack Lib <code>useQuery</code>)</h1>
            <div>
                <ul className="[&>li]:ml-10 [&>li]:list-disc mb-5">
                    <li>Are hooks that have <strong>React state</strong> for <i>data</i>, <i>loading</i>, <i>errors</i>, etc.</li>
                    <li>Caching queries.</li>
                    <li>Handling stale data.</li>
                    <li>Performance optimization.</li>
                    <li>Page focus refetching</li>
                    <li>etc.</li>
                </ul>

                <h3>Content Guides:</h3>
                <div className="flex flex-col gap-1 mb-5 [&>span]:pl-5">
                    {ids.map(id => (
                        <span key={id} 
                            className={`py-1 rounded-2xl ${guideId === Number(id) && "bg-black"}
                                        hover:bg-black hover:text-(--link-hover-bg-clr) hover:cursor-pointer`}
                            onClick={_ => setGuideId(Number(id))}
                        >{typeof contentGuides[id].title === "function" ? contentGuides[id].title() : contentGuides[id].title}</span>
                    ))}
                </div>
            </div>
            
            <hr className="--hr-faded"/>
            <div>
                {contentGuides[guideId].comp}
            </div>
        </div>
    )
}

function InstallationAndSetup() {
    return (
        <div>
            <div>
                <h2>{contentGuides[1].title}</h2>
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
            <div>
                <h2><code>{contentGuides[2].title}</code></h2>

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
                    <ul className="[&>li]:mb-1 [&>li]:ml-5 [&>li]:list-disc [&>ul]:mb-5 [&>ul>li]:ml-10 [&>ul>li]:list-">
                        <li>Import <code>useQuery()</code> from <code>"@tanstack/react-query"</code></li>
                        <li><code>&#123; data &#125;</code> is one of <code>useQuery()</code>'s return we can access.</li>
                        <ul className="[&>li]:list-disc">
                            <li>This serves as shortcut to avoid <code>{`<useQueryVar>`}.data</code></li>
                        </ul>

                        <li>Create two properties (<code>queryKey</code> and <code>queryFn</code>)</li>
                        <ul className="[&>li]:list-decimal [&>ul>li]:ml-15 [&>ul>li]:list-disc">
                            <li><code>queryKey</code></li>
                            <ul className="mb-2">
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
        <div className="[&_h3]:mb-3 mb-5">
            <h2>{contentGuides[3].title}</h2>

            <div>
                <h3>A. Loading state</h3>
                <p>Uses <code>&#123; isPending &#125; = useQuery(&#123;...&#125;)</code></p>
                <ul className="[&>li]:ml-10 [&>li]:list-disc mt-1">
                    <li>Returns <code>true</code> if still fetching, <code>false</code> if fetching finished.</li>
                </ul>
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
                <div className="mb-5">
                    <p><code>isPending</code> is another <code>userQuery()</code>'s accessible returns.</p>
                    <ul className="[&>li]:ml-10 [&>li]:list-disc mt-1">
                        <li>Will display <code>Loading...</code> if still fetching, but displays <code>data</code> if fetching is finished.</li>
                    </ul>
                </div>
            </div>
            <hr className="--hr-faded"/>

            <div>
                <h3>B. Refetch</h3>
                <p>Uses <code>&#123; refetch &#125; = useQuery(&#123;...&#125;)</code></p>
                <ul className="mt-1">
                    <li className="ml-10 list-disc">Refetches data from cached data.</li>
                </ul>
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
                <div className="[&>ul]:mb-5 [&>ul>li]:ml-10 [&>ul>li]:list-disc [&>ul>li]:mb-1 [&>p]:mb-1 mb-5">
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
            </div>
            <hr className="--hr-faded"/>

            <div>
                <h2>C. Error State</h2>
                <p>Uses <code>&#123; error &#125; = useQuery(&#123;...&#125;)</code></p>
                <ul>
                    <li className="ml-10 mt-1 list-disc">Accesses the error.</li>
                </ul>
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
        <div>
            <h2>{contentGuides[4].title}</h2>
            <ul>
                <li className="ml-10 list-disc">Neccessity to pass in some parameters to the query.</li>
            </ul>

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
        <div>
            <h2>{contentGuides[5].title}</h2>
            <div>
                <pre><code>

                </code></pre>
            </div>
        </div>
    )
}

function UseMutationFunc() {
    return (
        <div>
            <h2><code>{contentGuides[10].title}</code></h2>
            <ul className="[&>li]:ml-5 [&>li]:list-disc [&_li]:mb-1">
                <li>Allows to operate CRUD in database.</li>
                <li>Use of <code>useMutation</code> from <code>@tanstack/react-query</code></li>
                    <ul>
                        <li className="ml-10 list-disc">Needed to be imported.</li>
                    </ul>
            </ul>

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
                <h3 className="mb-3">What happened?</h3>
                <ol className="[&>li]:list-decimal [&>li]:ml-5 [&_li]:mb-1
                                [&>ul]:mb-5 [&>ul>li]:ml-10 [&_ul>li]:list-disc"
                >
                    <li><strong>Created a function <code>mutationFunc()</code></strong> outside the component.</li>
                        <ul>
                            <li>This avoids messy script and optimize readability.</li>
                            <li>Since it is adding new data, <strong>param <code>newData=</code></strong> is also set.</li>
                        </ul>

                    <li><strong>Fetched the data</strong> using <code>fetch()</code>.</li>
                        <ul>
                            <li>First arg is an URL to fetch data.</li>
                            <li>Second arg is request object.</li>
                                <ul className="[&>li]:ml-15">
                                    <li><code>"method"</code> is the request method.</li>
                                    <li><code>"body"</code> is the data to add (since it is a POST request).</li>
                                        <ul>
                                            <li className="ml-20">Used <code>JSON.stringify()</code> to be parsed.</li>
                                        </ul>
                                    
                                    <li><code>"headers"</code> further details about the request status.</li>
                                </ul>
                            <li><strong>Returns JSON of <code>res</code></strong>.</li>
                        </ul>

                    <li><strong>Created <code>useMutation()</code> object</strong>, but <strong>unpacked with only key <code>&#123; mutate &#125;</code></strong> for easy access for demonstration only.</li>
                        <ul>
                            <li><code>mutationFn:</code> places the function name that will execute.</li>
                                <ul>
                                    <li className="ml-15">Must not be called, <strong><code>{`<mutationObj>`}.mutate()</code> will do the func calling</strong>.</li>
                                </ul>
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
        <div>
            <h2><code>{contentGuides[11].title}</code></h2>
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

const contentGuides = {
    1: {title: 'Installation & Setup', comp: <InstallationAndSetup />},
    2: {title: <code>useQuery()</code>, comp: <UseQueryFunc />},
    3: {title: 'Loading states, Error states, Refetching, etc.', comp: <StatesAndRefetching />},
    4: {title: 'Query Options (parameters)', comp: <QueryOptionParameters />},
    5: {title: 'Constional Querying (kinda)', comp: <ConditionalQuerying />},
    10: {title: <code>useMutation()</code>, comp: <UseMutationFunc />},
    11: {title: 'Invalidating Queries', comp: <InvalidatingQueries />},
}