import { useEffect, useState } from "react"
import { highlightActive } from "../../../lib/helpers"


export default function Prisma4CRUD() {
    const [currentId, setCurrentId] = useState(1)
    const ids = Object.keys(crudCategories)

    return (
        <div>
            <h1 className="text-4xl font-bold mb-5">Prisma CRUD</h1>
            <p>General Prisma CRUD structure:</p>
            <pre><code>
{`</> TypeScript
prisma.<tableName>.<prismaMethod>
`}
            </code></pre>
            
            {/* Guide List */}
            <h2 className="text-xl font-bold mb-2">Guides:</h2>
            <ol className="flex flex-col [&>li]:pl-10 [&>li]:list-disc">
                {ids.map(id => (
                <li key={id}
                    className={`rounded-2xl mb-1 ${highlightActive(Number(id), currentId)}`}
                    onClick={_ => setCurrentId(Number(id))}
                >{crudCategories[id]?.title}
                </li>
            ))}
            </ol>
            <hr className="--hr-faded my-5" />
            
            {/* Guide Contents */}
            {crudCategories[currentId]?.comp}
        </div>
    )
}

const ReadingData = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-5">1. Reading Data</h2>

            <ul>
                <li>Get all rows:</li>
                <pre><code>
{`</> TypeScript
prisma.<tableName>.findMany()
`}
                </code></pre>

                <li>Get one by unique field (e.g., id column):</li>
                <pre><code>
{`</> TypeScript
// Returns null if not found
prisma.<tableName>.findUnique({ where: { id: 1 } })

// Auto-throws instead of returning null
prisma.<tableName>.findUniqueOrThrow({
    where: { id: 1 },
})
`}
                </code></pre>

                <li>Get the first match (non-unique fields)</li>
                <pre><code>
{`</> TypeScript
prisma.<tableName>.findFirst({ where: { <colName1>: "Hello" } })

prisma.<tableName>.findFirstOrThrow({
    where: { <colName1>: "Hello" },
})
`}
                </code></pre>
            </ul>
            <p><code>.findFirst()</code> is what actually used when filtering by something that isn't a unique column.</p>
        </div>
    )
}

const FilteringSortingPagination = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-5">2. Filtering, Sorting, Pagination</h2>
            <pre><code>
{`</> TypeScript
type OrderByType = "desc" | "asc"

prisma.<tableName>.findMany({
  where: {
    <colName1>: <val>,
    <colName2>: { contains: "<val>" },  // SQL LIKE
  },
  orderBy: { <colName2>: OrderByType },
  take: 10,                             // LIMIT
  skip: 20,                             // OFFSET
})
`}
            </code></pre>
            
            <p>Example Usage:</p>
            <pre><code>
{`</> TS
prisma.post.findMany({
  where: {
    published: true,
    title: { contains: "typescript" },  
  },
  orderBy: { createdAt: "desc" },
  take: 10,   
  skip: 20,    
})
`}
            </code></pre>
        </div>
    )
}

const Creating = () => {
    return (
        <div>
            <h2 className="h2-title">3. Creating</h2>
            <pre><code>
{`</> TS
prisma.<tableName>.create({
  data: {
    <colName1>: <val>,
    <colName2>: <val>,
    <colName3>: <val>,
  },
})
`}
            </code></pre>

            <p>Example Usage:</p>
            <pre><code>
{`</> TS
prisma.post.create({
  data: {
    title: "New Post",
    content: "...",
    authorId: 1,
  },
})
`}
            </code></pre>
        </div>
    )
}

const Updating = () => {
    return (
        <div>
            <h2 className="h2-title">4. Updating</h2>
            <p>Update one row:</p>
            <pre><code>
{`</> TS
prisma.<tableName>.update({
  where: { id: <val> },
  data: { <colName1>: <val> },
})
`}
            </code></pre>

            <p>Update many rows at once:</p>
            <pre><code>
{`</> TS
prisma.<tableName>.updateMany({
  where: { <colName>: <val> },
  data: { <colName>: <val> },
})
`}
            </code></pre>

            <p>Example Usage:</p>
            <pre><code>
{`</> TS
// Update one row
prisma.post.update({
  where: { id: 1 },
  data: { title: "Updated Title" },
})

// Update many rows at once
prisma.post.updateMany({
  where: { published: false },
  data: { published: true },
})
`}
            </code></pre>
        </div>
    )
}

const Deleting = () => {
    return (
        <div>
            <h2 className="h2-title">5. Deleting</h2>
            <p>Delete one row:</p>
            <pre><code>
{`</> TS
prisma.<tableName>.delete({ where: { id: 1 } })
`}
            </code></pre>

            <p>Delete many rows at once:</p>
            <pre><code>
{`</> TS
prisma.<tableName>.deleteMany({ where: { <colName>: <val> } })
`}
            </code></pre>

            <p>Example Usage:</p>
            <pre><code>
{`</> TS
// One row
prisma.post.delete({ where: { id: 1 } })

// Multiple rows
prisma.post.deleteMany({ where: { published: false } })
`}
            </code></pre>
        </div>
    )
}

const Relations = () => {
    return (
        <div>
            <h2 className="h2-title">6. Relations (the big one)</h2>
            <p>If <code>tableA</code> belongs to <code>tableB</code>, you can fetch related data in one query using <code>include</code></p>
            <ul><li>Example: <code>Post</code> table belongs to <code>User</code> table.</li></ul>
            <pre><code>
{`</> TS
prisma.<tableName>.findUnique({
  where: { id: 1 },
  include: { <colName>: <val> },  // joins the related table row
})
`}
            </code></pre>

            <p>Example Usage:</p>
            <pre><code>
{`</> TS
prisma.post.findUnique({
  where: { id: 1 },
  include: { author: true },  // joins the related User row
})
`}
            </code></pre>

            <p>If only want a specific fields rom the relation, use <code>select</code>:</p>
            <pre><code>
{`</> TS
prisma.<tableName>.findUnique({
    where: { id: 1 },
    select: {
        <colNameA1>: true,
        <colNameA2>: {
            select: {                   //<- Columns from TableB
                <colNameB1>: true, 
                <colNameB2>: true 
            }   
        }
    }
})
`}
            </code></pre>

            <p>Example Usage:</p>
            <pre><code>
{`</> TS
prisma.post.findUnique({
    where: { id: 1 },
    select: {
        title: true,
        author: {
            select: { name: true, email: true }
        }
    }
})
`}
            </code></pre>
        </div>
    )
}

const Upsert = () => {
    return (
        <div>
            <h2 className="h2-title">7. Upsert (Create or Update)</h2>
            <p>If the <strong>row exits &rarr; update</strong>; if <strong>not &rarr; create</strong>.</p>
            <p>Useful for seeding or sync logic.</p>

            <pre><code>
{`</> TS
prisma.<tableName>.upsert({
  where: { id: 1 },
  update: { <colName1>: <val> },
  create: { <colName1>: <val>, <colName2>: <val> },
})
`}
            </code></pre>

            <p>Example Usage:</p>
            <pre><code>
{`</> TS
prisma.post.upsert({
  where: { id: 1 },
  update: { title: "Updated" },
  create: { title: "New Post", content: "..." },
})
`}
            </code></pre>
        </div>
    )
}

const Count = () => {
    return (
        <div>
            <h2 className="h2-title">8. Count</h2>
            <pre><code>
{`</> TS
prisma.<tableName>.count({ 
    where: { <colName>: <condition> },
})
`}
            </code></pre>

            <p>Example Usage:</p>
            <pre><code>
{`</> TS
prisma.post.count({ 
    where: { published: true },
})
`}
            </code></pre>
        </div>
    )
}

const crudCategories = {
    1: {title: "Reading Data", comp: <ReadingData/>},
    2: {title: "Filtering, Sorting and Pagination", comp: <FilteringSortingPagination/>},
    3: {title: "Creating", comp: <Creating/>},
    4: {title: "Updating", comp: <Updating/>},
    5: {title: "Deleting", comp: <Deleting/>},
    6: {title: "Relations", comp: <Relations/>},
    7: {title: "Upsert", comp: <Upsert/>},
    8: {title: "Count", comp: <Count/>},
}