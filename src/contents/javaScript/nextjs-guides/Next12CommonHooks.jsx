import { useState } from "react"

export default function Next12CommonlyUsedHooks() {
    const [id, setId] = useState(0)
    const guideIds = Object.keys(guideInfo)
    
    return (
        <div>
            <h1>Commonly Used Hooks</h1>
            <p onClick={_ => setId(0)}>&rarr; Hooks Summary Table</p>
            <ol>{guideIds.map(id => (
                <li key={id} onClick={_ => setId(Number(id))}>
                    <code>{guideInfo[id]?.title}</code>
                </li>
            ))}</ol>
            <hr className="--hr-faded" />
            
            {(id === 0) && <SummaryTable 
                ids={guideIds} 
                guideInfo={guideInfo} 
                setIdFn={setId} 
            />}

            {(id >= 1) && guideInfo[id]?.comp}
        </div>
    )
}

const UseRouterHook = () => {
    return (
        <div>
            <h2><code>useRouter</code></h2>
            <p>Allows programmatic navigation.</p>

            <h3>When you need it:</h3>
            <ul>
                <li>After a form submission succeeds, redirect the user.</li>
                <li>On a button click that isn't a link.</li>
            </ul>

            <pre><code>
{`</> tsx
"use client"

import { useRouter } from "next/navigation"

export default function CreatePostForm() {
    const router = useRouter()

    async function handleSuccess() {
        router.push("/posts")       // Navigate, add to browser history
        router.replace("/posts")    // Navigate, replaces current history entry (no back butoon)
        router.back()               // Equivalent of hitting browser back
        router.refresh()            // Re-runs server components on current page without full navigation
    }
`}
            </code></pre>
            <p><code>router.refresh()</code> commonly used after a mutation to reflect new database state without full reloading the page.</p>
        </div>
    )
}

const UsePathnameHook = () => {
    return (
        <div>
            <h2><code>usePathname</code></h2>
            <p>Returns the current URL path as a plain string.</p>
            <p>Used to hightight the active link in a navbar or sidebar.</p>
            <p>Example:</p>
            <pre><code>
{`</> tsx
"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Navbar() {
    const pathname = usePathname()      // e.g. "/posts"

    return (
        <nav>
            <Link href="/posts" className={pathname === "/posts" ? "font-bold text-blue500" : ""}>
                Posts
            </Link>
            <Link href="/about" className={pathname === "/about" ? "font-bold text-blue500" : ""}>
                Posts
            </Link>
        </nav>
    )
}
`}
            </code></pre>
            <p>Wihtout this, you have no way to know where you are inside a client component.</p>
        </div>
    )
}

const UseSearchParamsHook = () => {
    return (
        <div>
            <h2><code>useSearchParams</code></h2>
            <p>Reads the query string of the current URL &mdash; the <code>?key=value</code> part.</p>
            <p>Used <strong>when needs search input, filters, pagination</strong> &mdash; anything that lives in the URL as query param.</p>

            <pre><code>
{`</> tsx
"use client"
import { useSearchParams } from "next/navigation"

// Current URL: /posts?category=tech&page=2
export default function PostFilter() {
    const searchParams = useSearchParms()

    const category = searchParams.get("category")   // "tech"
    const page = searchParams.get("page")           // "2" (always a string)

    return <p>Showing {category} posts, page {page}</p>
}
`}
            </code></pre>
            <p><strong>Note:</strong> values are always strings, even if you put a number in the URL &mdash; parse them yourself if you need a number.</p>
        </div>
    )
}

const UseParamsHook = () => {
    return (
        <div>
            <h2><code>useParams</code></h2>
            <p>Reads the dynamic segments of the current route.</p>
            <p>Use when you have a route like <code>app/posts/[slugs]/page.tsx</code> and you need the <code>slug</code> value inside a client component on that page.</p>
        
            <pre><code>
{`</> tsx
"use client"
import { useParams } from "next/navigation"

// Route definition: app/posts[slug]/page.tsx
// Current URL: /posts/my-first-post
export default function PostAction() {
    const params = useParams();
    const slug = params.slug        // "my-first-post"

    return (
        <button onClick={() => console.log(${"`Deleting ${slug}`"})}>
            Delete
        </button>
    )
}
`}
            </code></pre>
            <p><strong>Note:</strong> In server component, this is passed directly as props &mdash; use only when needs params inside a client component that isn't the page.</p>
        </div>
    )
}

const UseActionStateHook = () => {
    return (
        <div>
            <h2><code>useActionState</code></h2>
            <p>Wires a Server Action to a form to track what the action returned after submission.</p>
            <p><strong>The mechanism:</strong> Every time your form submits, <code>useActionState</code> calls your action with two arguments</p>
            <ol>
                <li><code>prevState</code> &ndash; what your action returned last time, or the initial state on first submit</li>
                <li><code>formData</code> &ndash; a <code>FormData</code> type</li>
            </ol>
            <p>The action's return value becomes the new <code>state</code> in your component.</p>

            <p>Example:</p>
            <pre><code>
{`</> tsx
"use client"
import { useActionState } from "react"
import { createPost } from "@/actions/actions"  // a DIR "app/actions/actions.tsx" with  ${"`createPost`"} async function

export default function CreatePostForm() {
    const [state, formAction] = useActionState(createPost, { error: null })

    return (
        <form action={formAction}>
            {state.error && <p className="text-red-500"}>{state.error}</p>}
            <input name="title" placeholder="Title" />
            <button type="submit">Create Post</button>
        </form>
    )
}
`}
            </code></pre>
            <ul>
                <li><code>state</code> &ndash; what <code>createPost</code> last return (starts as <code>{"{ error: null }"}</code>)</li>
                <li><code>formAction</code> &ndash; the wired version of <code>createPost</code> &mdash; pass this to the form</li>
            </ul>

            <p>And inside <code>createPost</code> function, write <code>_prevState</code> as its parameter:</p>
            <pre><code>
{`</> ts
export async function createPost(
    _prevState: { error: string | null },
    formData: FormData
) {
    // _prevState is injected by useActionState automatically
    // you don't use it here, but TypeScript requires it in the signature.
}
`}
            </code></pre>

            <p>Where <code>prevState</code> becomes actually useful &mdash; accumulating across submissions.</p>
            <pre><code>
{`</> ts
export async function createPost(
    prevState: { 
        error: string | null, 
        attempts: number 
    },
    formData: FormData
) {
    if (formData.get("title") === "") return {
        error: "Ttle is required",
        attempts: prevState.attempts + 1
    }

    return { error: null, attempts: prevState.attempts }
}
`}
            </code></pre>
        </div>
    )
}

const UseFormStatusHook = () => {
    return (
        <div>
            <h2><code>useFormStatus</code></h2>
            <p>Tells you whether the parent form is currently submitting.</p>
            <p>This reads the context from the nearest <code>{"<form>"}</code> tag above it in the DOM.</p>
            <p>That's why this <strong><i>must</i> live in a separate child component</strong> &mdash; if in the same component as the form, it's <i>not inside the form yet when it renders</i>.</p>

            <pre><code>
{`</> tsx
"use client"
import { useFormStatus } from "react-dom"

const SubmitButton = () => {
    const { pending } = useFormStatus()
    // ${"`pending = true`"} while the server action is running 

    return (
        <button type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Create Post"}
        </button>
    )

}

export default function CreatePostForm() {
    return (
        <form action={createPost}>
            <input name="title" placeholder="Title" />
            
            {*/ ${"`SubmitButton`"} is a child of form, so ${"`useFormStatus`"} works */}
            <SubmitButton />
        </form>
    )
}
`}
            </code></pre>
            <p>If the submit button applied directly, <code>pending</code> would always be <code>false</code>.</p>
        </div>
    )
}

const SelectedLayoutSegmentHooks = () => {
    return (
        <div>
            <h2><code>useSelectedLayoutSegment</code> and <code>useSelectedLayoutSegments</code></h2>
            <p>From inside a <code>layout.tsx</code>, tells you which route segment below it is currently active.</p>
            <p>Used when you have a layout with a sidebar or tab bar, and you want to highlight the active section without prop drilling or reading the full pathname.</p>
            <pre><code>
{`</> tsx
import { useSelectedLayoutSegment } from "next/navigation

// This lives in app/layout.tsx
// If user is at /posts -> segment = "posts"
// If user is at /about -> segment = "about"
// If user is at /      -> segment = null
export default function Sidebar() {
    const segment = useSelectedLayoutSegment()

    return (
        <aside>
            <a href="/posts" className={segment === "post" ? "font-bold" : ""}>Posts</a>
            <a href="/about" className={segment === "about" ? "font-bold" : ""}>About</a>
        </aside>
    )
}
`}
            </code></pre>
            
            <p>Meanwhile <code>useSelectedLayoutSegments()</code> returns an array of all active segments below the current layout:</p>
            <p>Used when have a deeply nested routes and need to know the full active path, not just the immediate child.</p>
            <pre><code>
{`</> tsx
// User is at /posts/my-first-post

const segments = useSelectedLayoutSegment()
// segments = ["posts", "my-first-post"]
`}
            </code></pre>
        </div>
    )
}

const SummaryTable = ({ ids = [], guideInfo = {}, setIdFn = () => {} } = {}) => {
    return (
        <div>
            <h2>Summary Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Hook</th>
                        <th>Use when you need...</th>
                    </tr>
                </thead>
                <tbody>
                    {ids.map(id => {
                        const title = guideInfo[id]?.title
                        const summary = guideInfo[id]?.summary
                        
                        return (
                            <tr>
                                <td onClick={_ => setIdFn(Number(id))}>
                                    <code>{guideInfo[id]?.title}</code>
                                </td>
                                <td>{(typeof summary === "string") ? summary : summary()}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const guideInfo = {
    1: {
        title: "useRouter", 
        comp: <UseRouterHook/>, 
        summary: "To navigate in code, not through links and tags",
    },
    2: {
        title: "usePathname", 
        comp: <UsePathnameHook/>,
        summary: "To know the current path (active nav links)",
    },
    3: {
        title: "useSearchParams", 
        comp: <UseSearchParamsHook/>,
        summary: _ => <td>"To read <code>?key=value</code> from the URL"</td>,
    },
    4: {
        title: "useParams", 
        comp: <UseParamsHook/>,
        summary: _ => <td>"A dynamic route segment (<code>[slug]</code>) inside a client component."</td>,
    },
    5: {
        title: "useActionState", 
        comp: <UseActionStateHook/>,
        summary: "To show results of Server Action on a form.",
    },
    6: {
        title: "useFormStatus", 
        comp: <UseFormStatusHook/>,
        summary: "To show loading state while a form action is running",
    },
    7: {
        title: "useSelectedLayoutSegment(s)", 
        comp: <SelectedLayoutSegmentHooks/>,
        summary: "To know which child route is active in a layout.",
    },
}