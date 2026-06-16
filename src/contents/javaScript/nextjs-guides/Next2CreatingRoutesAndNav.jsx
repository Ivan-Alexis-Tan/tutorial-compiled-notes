import { languageRoute } from "../../../routeData"
import { useParams } from "react-router-dom"

const titles = languageRoute('javascript').libTitles('nextjs')

export default function CreatingRoutesAndNav() {
    return (
        <div className="mb-5">
            <h1 className="h1-title">{titles[useParams().id]}</h1>

            <div className="mb-5">
                <h2 className="h2-title">A. Creating Routes</h2>
                <p>Just <strong>simply create folder in <code>/app</code></strong> and it will automatically create route for it.</p>
                <pre><code>
{`/myApp
└── /app
    └── /newFolder
        └── page.tsx
`}
                </code></pre>

                <p>Automatically creates rout for it.</p>
                <pre><code>http://localhost:3000/newFolder</code></pre>

                <div className="mb-5">
                    <h3 className="h3-title">Example of Creating Route:</h3>
                    <p className="mb-1"><strong>Goal:</strong> Create an "About" route in home page.</p>
                    <p className="font-bold">Directory:</p>
                    <pre><code>
{`/myApp
├── /.next
└── /app
    ├── /about
    |   └── /page.tsx
    ├── /contact
    |   └── /page.tsx
    ├── layout.tsx
    └── page.tsx
`}
                    </code></pre>

                    <p>In <code>/about/page.tsx</code>:</p>
                    <pre><code>
{`export default function About() {
    return (
        <div>
            <h1>About Page</h1>
        </div>
    )
}
`}
                    </code></pre>

                    <p>In <code>/contact/page.tsx</code>:</p>
                    <pre><code>
{`export default function Contact() {
    return (
        <div>
            <h1>Contact Page</h1>
        </div>
    )
}
`}
                    </code></pre>

                    <p>URL Route:</p>
                    <pre><code>
{`Abouts page `}{<span>&rarr;</span>} {`http://localhost:3000/about
Contacts page `}{<span>&rarr;</span>} {`http://localhost:3000/contact
`}
                    </code></pre>

                    <p>This enables the client to navigate to about and contact pages.</p>
                </div>
            </div>
            <hr className="--hr-faded" />

            <div className="mb-5">
                <h2 className="h2-title">B. Creating Navigation (Nav Bar)</h2>
                <ul className="[&>li]:mb-2 [&>li]:ml-5 [&>li]:list-disc">
                    <li>Import <code>Link</code> tag: <code>{'import { Link } from "next/link"'}</code></li>
                    <li>Create <code>{`<Link>`}</code> tag and add a <code>href=</code> attribute.</li>
                        <ul className="ml-10 [&>li]:list-disc">
                            <li><code>href=</code> accepts <i>string value</i> to serve as linking route.</li>
                        </ul>
                </ul>

                <div>
                    <pre><code>
{`import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={${"`$"}{geistSans.variable} ${"$"}{geistMono.variable} antialiased${"`"}}
      >
        {/* Navigation Bar */}
        <div>
          <Link href={"/"}>Home</Link>
          <br />
          
          <Link href={"/about"}>About</Link>
          <br />
          
          <Link href={"/contact"}>Contact</Link>
        </div>

        {children}
      </body>
    </html>
  );
}
`}    
                    </code></pre>
                    <p>This sets navigation bar visible in all pages of the web app.</p>
                </div>
            </div>
        </div>
    )
}