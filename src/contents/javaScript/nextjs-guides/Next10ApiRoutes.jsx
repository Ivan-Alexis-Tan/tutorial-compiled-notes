export default function Next10ApiRoutes() {
    return (
        <div className="mb-5">
            <h1 className="h1-title">API Routes</h1>
            <p>Simply <strong>create a folder with any name</strong> and then <strong>create a special file</strong> named <code>route.ts</code> inside it.</p>
            <pre><code>
{`/app
├── page.tsx        -> 🌐/
└── /api
    └── route.ts    -> (POST) 🌐/api 
`}
            </code></pre>
            <p className="mb-5">Then begin writing server code.</p>

            <p><strong>Example:</strong></p>
            <pre><code>
{`</> TypeScript
export async function GET() {
    return Response.json({ 
        message: "Hello, world, from backend!"
    })
}
`}
            </code></pre>
            <hr className="--hr-faded" />

            <div className="mb-5">
                <h2 className="h2-title">Route Handlers</h2>

                <p className="mb-2">Create a folder for the api (common to name as <code>api</code>).</p>
                <p>Then add a database file.</p>

                <pre><code>
{`/app
└── /api
    ├── db.ts
    └── /books
        ├── route.ts
        └── /[id]               -> for dynamic API routing that requires parameters
            └── route.ts
`}
                </code></pre>
                
                <p>Example <code>db.ts</code> contents:</p>
                <pre><code>
{`</> TypeScripts
// app/api/db.ts

const books = [
    { id: 1, name: "Atomic Habbits" },
    { id: 2, name: "Deep Work" },
    { id: 3, name: "Laws of Human Nature" },
]

export default books;
`}
                </code></pre>

                <p>Example <code>/books/route.ts</code> contents:</p>
                <pre><code>
{`</> TypeScript
// app/api/books/route.ts

import books from "@/app/api/db";

export async function GET() {
    return Response.json(books);
}

export async function POST(request: Request) {
    const book = await request.json();
    books.push(book);

    return Response.json(books);
}
`}
                </code></pre>

                <p>Example <code>/books/[id]/route.ts</code> contents:</p>
                <pre><code>
{`</> TypeScript
// app/api/books/[id]/route.ts

import books from "@/app/api/db";

export async function PUT(
    request: Request,
    context: { params: { id: string } },
) {
    const id = +context.params.id;
    const book = await request.json();

    const index = books.findIndex(b => b.id === id);
    books[index] = book;
    
    return Response.json(books)
}

export async function DELETE(
    request: Request,
    context: { params: { id: string } },
) {
    const id = +context.params.id;
    
    const index = books.findIndex(b => b.id === id);
    books.splice(index, 1);

    return Response.json(books);
}
`}
                </code></pre>
            </div>
            <hr className="--hr-faded" />

            <div className="mb-5">
                <h2 className="h2-title">API Route Fetchers</h2>
                <pre><code>
{`/app
├── /api
|   ├── db.ts
|   └── /books
|       ├── route.ts
|       └── /[id]               -> for dynamic API routing that requires parameters
|           └── route.ts
└── /books
    ├── route.ts
    └── page.tsx
`}
                </code></pre>

                <p>The <code>/books/route.ts</code> file:</p>
                <pre><code>
{`</> TypeScript
import books from "@/app/api/db";

export async function GET() {
    return Response.json(books);
}
`}
                </code></pre>

                <p>Then <code>/books/page.tsx</code> file:</p>
                <pre><code>
{`</> TypeScript
// app/books/page.tsx

async function Page() {
    const response = await fetch("http://localhost:3000/api/books");
    const books = await response.json();

    return (
        <main>
            <code>{JSON.stringify(books, null, 2)}</code>
        </main>
    )
}
`}
                </code></pre>
            </div>
        </div>
    )
}