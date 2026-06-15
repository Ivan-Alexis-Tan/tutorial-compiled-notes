export default function Prisma2ModelCreation() {
    return (
        <div>
            <h1 className="h1-title">Model Creation</h1>
            <p>The field structure:</p>
            <pre><code>{`fieldName   FieldType   attributes`}</code></pre>
            <p>Attributes start with <code>@</code> (field-level) or <code>@@</code> (model-level).</p>
            <hr className="--hr-faded" />

            <div>
                <h2 className="h2-title">Scalar Types &mdash; commonly used</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Prisma Type</th>
                            <th>Maps to</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>Int</code></td>
                            <td>integer</td>
                        </tr>
                        <tr>
                            <td><code>String</code></td>
                            <td>text</td>
                        </tr>
                        <tr>
                            <td><code>Boolean</code></td>
                            <td>true/false</td>
                        </tr>
                        <tr>
                            <td><code>Float</code></td>
                            <td>decimal number</td>
                        </tr>
                        <tr>
                            <td><code>DateTime</code></td>
                            <td>timestamp</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr className="--hr-faded" />
        
            <div>
                <h2 className="h2-title">Common Field Attributes:</h2>
                <pre><code>
{`</> Prisma
model User {
    id          Int         @id @default(autoincrement())       // Primary key, auto-increment
    email       String      @unique                             // Unique constraint
    name        String?                                         // The ? means nullable/optional
    createdAt   DateTime    @default(now())                     // Auto-set on creation
    updatedAt   DateTime    @updatedAt                          // Auto-update on every save
}
`}
                </code></pre>
                
                <div className="[&>p]:mb-2 mb-5">
                    <p>The <code>?</code> means optional/nullable &mdash; <strong>no</strong> <code>?</code> means required.</p>
                    <p>If try to create record without a required field, Prisma throws before it even hits the database.</p>
                </div>

                <h3 className="h3-title">Field Attributes Details</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Effects</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>@id</code></td>
                            <td>Marks the field as <strong>primary key</strong></td>
                        </tr>
                        <tr>
                            <td><code>@default( ... )</code></td>
                            <td>Sets value when none is provided. Could be:
                                <pre><code>
{`@default(autoincrement())   -> 1, 2, 3, ...
@default(uuid())            -> "a1b2c3d4-..."
@default(true)              -> literal value
@default(now())             -> timestamp`}
                                </code></pre>
                            </td>
                        </tr>
                        <tr>
                            <td><code>@unique</code></td>
                            <td>Adds unique contraint</td>
                        </tr>
                        <tr>
                            <td><code>@updateAt</code></td>
                            <td>
                                <p>Only valid on <code>DateTime</code> field types.</p>
                                <p>Automatically updates the field to current timestamp everytime the row is modified.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2 className="h2-title">Relations</h2>

                <pre><code>
{`</> Prisma
model User {
    id  Int @id @default(autoincrement())
    post Post[]                 // 1-to-many: one user has many posts
}

model Post {
    id          Int     @id @default(autoincrement())
    author      User    @relation(fields: [authorId], references: [id])
    authorId    Int             // Actual foreign key column
}
`}
                </code></pre>
                <p>Prisma requires to define <strong>both sides</strong> of a relation.</p>
                <ul className="[&>li]:ml-10 *:list-disc [&>li]:mb-2 [&>ul]:ml-15">
                    <li>The <code>Post</code> side holds the actual foreign key column (<code>authorId</code>)</li>
                    <li><code>User</code> side holds the virtual <code>posts</code> field.</li>
                    <ul><li>Doesn't exists as a real column &mdash; just for querying convenience</li></ul>
                </ul>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2 className="h2-title">Model-level Attributes (<code>@@</code>)</h2>
                <pre><code>
{`</> Prisma
model Post {
    id          Int     @id @default(autoincrement())
    authorId    Int
    title       String

    @@index([authorId])                 // Adds a database index
    @@unique([authorId, title])         // Composite unique constraint
}
`}
                </code></pre>

                <div className="mb-5">
                    <h3 className="h3-title">
                        <code>@@unique([fieldA, fieldB])</code>
                    </h3>
                    <p className="mb-5">A <strong>composite unique constraint</strong> &mdash; the <i>combination</i> of those two fields must be unique, not each filed individually.</p>
                    
                    <p><strong>Example:</strong></p>
                    <pre><code>
{`</> Prisma
model Enrollment {
    studentId  Int
    courseId   Int

    @@unique([studentId, courseId])
}
`}
                    </code></pre>
                    
                    <div className="[&>p]:mb-2">
                        <p>A student can appear many times (in different courses).</p>
                        <p>A course can appear many times (with different students).</p>
                        <p>But the pair (studentId, courseId) must be unique — a student can only be enrolled in the same course once.</p>
                    </div>
                </div>

                <div className="mb-5">
                    <h3 className="h3-title"><code>@@index([field])</code></h3>
                    
                    <div className="[&>p]:mb-2 mb-5">
                        <p>A database index is a separate data structure the DB maintains so it can look up rows by that column fast — instead of scanning every row.</p>
                        <p>It doesn't change what data you can insert; it only affects query performance.</p>
                    </div>
                    <p><strong>Example:</strong></p>
                    <pre><code>
{`</> Prisma
model Post {
    authorId  Int

    @@index([authorId])
}
`}
                    </code></pre>
                    
                    <div className="[&>p]:mb-2 mb-5">
                        <p>Without this, <code>WHERE authorId = 5</code> means the DB reads every single Post row.</p>
                        <p>With the index, it <strong>jumps directly to the matching rows</strong>.</p>
                        <p>At small scale this doesn't matter; at real scale (thousands to millions of rows) queries on un-indexed foreign keys get noticeably slow.</p>
                        <p>You'd commonly put an index on any foreign key column you're going to filter or join on frequently — which is almost always.</p>
                    </div>
                    
                    <p><strong>You can also index multiple fields together:</strong></p>
                    <pre><code>
{`</> Prisma
@@index([authorId, createdAt])`}
                    </code></pre>
                    <p>This optimizes queries that filter by both, like "all posts by this author sorted by date."</p>
                </div>
            </div>

            <div className="mb-5">
                <h3 className="h3-title"><code>@@id([fieldA, fieldB])</code></h3>
                <p className="mb-5">A <strong>composite primary key</strong> — when no single field is the unique identifier, but the combination of two fields is.</p>
                
                <p className="font-bold">Common in join tables:</p>
                <pre><code>
{`</> Prisma
model PostTag {
    postId  Int
    tagId   Int

    @@id([postId, tagId])
}`}
                </code></pre>
                <p className="mb-5">No auto-increment ID needed because <code>(postId, tagId)</code> is already uniquely identifying.</p>

                <h3 className="h3-title">Practical Rule for When to Use</h3>
                <table>
                    <thead>
                        <tr>
                            <th>If...</th>
                            <th>Use</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>This field is unique on its own</td>
                            <td><code>@unique</code></td>
                        </tr>
                        <tr>
                            <td>These two fields together must be unique</td>
                            <td><code>@@unique([a, b])</code></td>
                        </tr>
                        <tr>
                            <td>Speed up queries filtering by this field</td>
                            <td><code>@@index([field])</code></td>
                        </tr>
                        <tr>
                            <td>Primary key is a combination of fields.</td>
                            <td><code>@@id([a, b])</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}