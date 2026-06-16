export default function Next8LoadingUI() {
    return (
        <div className="mb-5">
            <h1 className="h1-title">Loading UI</h1>
            <p className="mb-2">Showing a loading progress while data is being fetched.</p>
            <p>By adding <code>loader.tsx</code> file.</p>
            <pre><code>
{`/app
├── favicon.ico
├── layout.tsx
└── loader.tsx
`}
            </code></pre>
            <p>What the file look like:</p>
            <pre><code>
{`</> TypeScript
const Loading = () => {
    return (
        <div>__ Spinner __</div>
    )
}

export default Loading
`}
            </code></pre>
            <p>Unauthorized and forbidden works the same way (no details provided).</p>
        </div>
    )
}