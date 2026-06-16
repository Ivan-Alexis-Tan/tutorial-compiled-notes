export default function Next6Layouts() {
    return (
        <div className="mb-5">
            <h1 className="h1-title">Layouts</h1>
            
            <div className="mb-5">
                <h2 className="h2-title">1. General Layout</h2>
                <p>You can put layout on <code>/app/layout.tsx</code>.</p>
                <pre><code>
{`</> TypeScript
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={${"`${geistSans.variable} ${geistMono.variable} h-full antialiased`"}}
    >
      // Can put Navigation Layout
      // Can put Header Layout
      <body className="min-h-full flex flex-col">{children}</body>
      // Can put Footer Layout
    </html>
  );
}
`}
                </code></pre>
            </div>
            <hr className="--hr-faded"/>

            <div className="mb-5">
                <h2 className="h2-title">2. Specific Page Layout</h2>
                
                <div className="[&>p]:mt-2 mb-5">
                    <p>Add a <code>layout.tsx</code> file in folder you want.</p>
                    <p>File name must be <code>layout.tsx</code> for it be read as "layout" component by Next.js</p>
                </div>
                
                <p><strong>Example DIR:</strong></p>
                <pre><code>
{`</> TypeScript
import Link from "next/link"

interface LayoutChild {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutChild) {
    return (
        <div>
            <Link href={"/"}>Home</Link>
            {children}
        </div>
    )
}
`}
                </code></pre>
            </div>
            <hr className="--hr-faded"/>

            <div className="mb-5">
                <h2 className="h2-title">3. Route Groups</h2>
                
                <div className="[&>p]:mt-2 mb-5">
                    <p>Allows to organize route segments and project structure <strong>without impacting the URL path</strong>.</p>
                    <p>Allows to create folders that <strong>won't show up in the URL</strong>.</p>
                    <p>By wrapping file name inside <code>()</code>.</p>
                </div>
                
                <p><strong>Example 1:</strong></p>
                <pre><code>
{`/app
├── layout.ts
├── /(marketing)
|   ├── /about              -> 🌐/about
|   |   └── page.tsx
|   └── /blog               -> 🌐/blog
|       └── page.tsx
└── /(shop)
    └── /account            -> 🌐/account
        └── page.tsx
`}
                </code></pre>

                <p className="mb-2"><strong>Example 2:</strong> Varied Layout</p>
                <p className="mb-5">Objective: Create a layout component for <code>/root</code> page and another different layout for <code>/dashboard</code> page.</p>
                
                <p className="font-bold">DIR solution:</p>
                <pre><code>
{`/app
├── /(dashboard)
|   └── /dashboard                  -> 🌐/dashboard
|       ├── /analytics              -> 🌐/dashboard/analytics
|       |   └── page.tsx
|       ├── /users                  -> 🌐/dashboard/users
|       |   ├── /[id]               -> 🌐/dashboard/users/{id}
|       |   |   └── page.tsx  
|       |   └── page.tsx  
|       ├── layout.tsx              -> dashboard layout component
|       └── page.tsx        
└── /(root)
    ├── /about                      -> 🌐/about
    |   └── page.tsx
    ├── layout.tsx                  -> root layout component
    └── page.tsx                    -> 🌐/home
`}
                </code></pre>
            </div>
        </div>
    )
}