export default function Prisma5AssociationTable() {
    return (
        <div className="mb-5">
            <h1 className="h1-title">Association Table</h1>
            
            <div>
                <h2 className="h2-title">Option 1: Implicit Many-to-Many</h2>
                <p>Prisma creates the join table for you — you never see it, you never touch it.</p>

                <pre><code>
{`</> Prisma
model Post {
    id   Int   @id @default(autoincrement())
    tags Tag[]
}

model Tag {
    id    Int    @id @default(autoincrement())
    posts Post[]
}`}
                </code></pre>
                
                <div className="[&>p]:mb-2">
                    <p>Prisma generates a hidden <code>_PostToTag</code> table in the DB <strong>automatically</strong>.</p>
                    <p>You just reference through the relation directly in queries.</p>
                    <p>Because you don't control that join table, <strong>you can't add extra columns</strong> to it.</p>
                </div>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2 className="h2-title">Option 2: Explicit Join Model</h2>
                <p>When you need extra data on the relationship itself — like <code>enrolledAt</code>, <code>role</code>, <code>status</code> — you make the join table an actual model.</p>
                <pre><code>
{`</> Prisma
model Student {
    id          Int          @id @default(autoincrement())
    enrollments Enrollment[]
}

model Course {
    id          Int          @id @default(autoincrement())
    enrollments Enrollment[]
}

model Enrollment {
    studentId  Int
    courseId   Int
    enrolledAt DateTime  @default(now())
    grade      String?

    student  Student  @relation(fields: [studentId], references: [id])
    course   Course   @relation(fields: [courseId], references: [id])

    @@id([studentId, courseId])
}`}
                </code></pre>
                
                <p className="font-bold mb-2">Things to note:</p>
                <ul className="[&>li]:ml-10 [&>li]:mb-2 [&>li]:list-disc">
                    <li><code>Enrollment</code> is the equivalent of your SQLAlchemy association object.</li>
                    <li><code>@@id([studentId, courseId])</code> is the composite primary key — the pair is what uniquely identifies a row, no auto-increment needed</li>
                    <li>Both <code>Student</code> and <code>Course</code> point to <code>Enrollment[]</code>, not directly to each other</li>
                    <li><code>grade</code> and <code>enrolledAt</code> are extra coluns that live on the relationship itself &mdash; this is exactly what you couldn't do with Option 1</li>
                </ul>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2 className="h2-title">Which to Use:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Situation</th>
                            <th>Use</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Pure association, not extra data</td>
                            <td>Implicit (Option 1)</td>
                        </tr>
                        <tr>
                            <td>Need data on the relationship table</td>
                            <td>Explicit join model (Option 2)</td>
                        </tr>
                        <tr>
                            <td>Familiar pattern from SQLAlchemy</td>
                            <td>Explicit &mdash; it maps directly to what you already know</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}