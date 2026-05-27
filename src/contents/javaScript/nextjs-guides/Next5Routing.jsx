export default function Next5Routing() {
    return (
        <div>
            <h1>Routing</h1>
            <p>Uses file-based routing.</p>

            <p>Supposed the file DIR:</p>
            <pre><code>
{`/root-project
├── /.next
├── /app
|   └── /about
|       └── page.tsx
├── /components
├── next.config.ts
└── package.json
`}
            </code></pre>
            <p><code>About</code> web page can be accessed now via <code>http://localhost:3000/about</code>.</p>
            <hr className="--hr-faded" />
            
            <div>
                <h2>🪆 Nested Routes</h2>
                <p>Avoids routing conflicts of having a same route name.</p>
                <p><strong>Example:</strong> Create a <strong>dashboard page</strong> that shows <strong>analytics</strong> and <strong>users</strong> status.</p>
                <p>Can be solve by routing to:</p>
                <ul>
                    <li><code>http://localhost:3000/dashboard/analytics</code></li>
                    <li><code>http://localhost:3000/dashboard/users</code></li>
                </ul>
                <p>Then, the DIR:</p>
                <pre><code>
{`/root-project
├── /.next
├── /app
|   ├── /dashboard
|   |   ├── /analytics
|   |   |   └── page.tsx
|   |   └── /users
|   |       └── page.tsx
|   └── /about
|       └── page.tsx
├── /components
├── next.config.ts
└── package.json
`}
                </code></pre>
                <p>Then in <code>/users/page.tsx</code> file can be:</p>
                <pre><code>
{`</> TypeScript
export default function UserDashboard() {
    const userIds = [1, 2, 3, 4]
    return (
        <div>
            <h1>User Dashboard</h1>

            <ul className="mt-10">{userIds.map(id => <li key={id}
                >User {id}</li>
            )}</ul>
        </div>
    )
}
`}
                </code></pre>
            </div>
            <hr className="--hr-faded"/>
            <div>
                <h2>🧩 Dynamic Routes</h2>
                <p>By adding <code>{`[folderName]`}</code> on the folder name to be dynamic.</p>
                <p><strong>Example:</strong> Create <i>user profile</i> web page on each users.</p>
                <p>This asserts to URL route with <code>http://localhost:3000/dashboard/users/id</code>.</p>
                <p>In this case, <code>/id</code> should be dynamic with certain values like <code>id=1</code>, <code>id=2</code>, <code>id=...</code>.</p>
                <p>The DIR:</p>
                <pre><code>
{`/root-project
├── /.next
├── /app
|   ├── /dashboard
|   |   ├── /analytics
|   |   |   └── page.tsx
|   |   └── /users
|   |       ├── page.tsx
|   |       └── /[id]               <- folder name must be inside '[]'
|   |           └── page.tsx
|   └── /about
|       └── page.tsx
├── /components
├── next.config.ts
└── package.json
`}
                </code></pre>
                <p>The file <code>/users/[id]/page.tsx</code> can be:</p>
                <pre><code>
{`</> TypeScript
interface Params {
    id: string
}

const UserDetails = async ({ params }: { params: Promise<Params> }) => {
    const { id } = await params;

    return (
        <div>
            <h1>User {id}'s Profile</h1>
        </div>
    )
}

export default UserDetails
`}
                </code></pre>
            </div>
        </div>
    )
}