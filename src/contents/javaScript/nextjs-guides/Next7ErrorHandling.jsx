export default function Next7ErrorHandling() {
    return (
        <div className="mb-5">
            <h1 className="h1-title">Error Handling</h1>
            <p>Needs a <code>error.ts</code> file as error handler file.</p>
            <pre><code>
{`/app
├── layout.tsx
├── error.tsx           -> error handler file
└── /dashboard
    ├── layout.tsx
    ├── error.tsx       -> error handler file
    └── page.tsx
`}
            </code></pre>

            <p>What <code>error.tsx</code> file look like:</p>
            <pre><code>
{`</> TypeScript
"use client"        // Error boundaries must be Client component

import { useEffect } from "react"

interface ErrorHandler {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset, }: ErrorHandler) {
    useEffect(() => {
        // log the error to an error reporting service
        console.error(error)
    }, [error])
    return (
        <div>
            <h2>Something went wrong!</h2>
            <button onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
            }>
                Try again
            </button>
        </div>
    )
}
`}
            </code></pre>

            <div className="mb-5">
                <h2 className="h2-title">One Global Error Handler File</h2>
                <p className="mb-2">By creating one <code>global-error.tsx</code> file in the root of the app folder.</p>
                <p className="mb-2"><strong>Only the closest error file</strong> to the route takes priority &mdash; you won't see the content both from <code>global-error.tsx</code> and the <code>error.tsx</code> file.</p>
                <pre><code>
{`/app
├── layout.tsx
├── global-error.tsx
└── /dashboad
    ├── layout.tsx
    ├── error.tsx
    └── page.tsx
`}
                </code></pre>
            </div>
        </div>
    )
}