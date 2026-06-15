export default function Prisma3Migration() {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-5">Migrations</h1>

            <div>
                <h2 className="text-2xl font-bold">Main Command</h2>
                <pre><code>
{`</> Bash
npx prisma migrate dev --name <description>
`}
                </code></pre>
                
                <div className="mb-3">
                    <p>The main one durin development.</p>
                    <p>Run this every time <code>schema.prisma</code> changes.</p>
                </div>

                <div className="[&>ol]:ml-10 [&>ol]:list-disc mb-5">
                    <p><strong>Does 3 things</strong> in one command:</p>
                    <ol>
                        <li>Generate a SQL migration file</li>
                        <li>Applies it to the database</li>
                        <li>Regenerates the Prisma client</li>
                    </ol>
                </div>
                
                <div className="[&>ul]:ml-10 [&>ul]:list-disc mb-5">
                    <p><code>--name</code> is just a label for the migration file, like</p>
                    <ul>
                        <li><code>--name add_user_model</code>, or</li>
                        <li><code>--name add_email_to_post</code></li>
                    </ul>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold">Good-to-know Command</h2>
                <pre><code>
{`</> Bash
npx prisma generate
`}
                </code></pre>

                <p><strong>Only generate the Prisma client</strong> without touching the database.</p>
                <p>Run if you somehow have the right schema but your generated client is out of sync.</p>
                <p>Less common command, but good to know.</p>
            </div>
            <hr className="--hr-faded my-5" />

            <div>
                <h2 className="text-2xl font-bold mb-5">Compared to Alembic Workflow:</h2>
                
                <table className="mb-5">
                    <thead>
                        <tr>
                            <th>Alembic</th>
                            <th>Prisma</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Edit your SQLAlchemy model</td>
                            <td>Edit <code>schema.prisma</code></td>
                        </tr>
                        <tr>
                            <td><code>alembic revision --autogenerate</code></td>
                            <td>(built into the next step)</td>
                        </tr>
                        <tr>
                            <td><code>alembic upgrade head</code></td>
                            <td><code>prisma migrate dev --name x</code></td>
                        </tr>
                    </tbody>
                </table>

                <p><strong>Big difference:</strong> Prisma combines revision generation and applying in one command.</p>
            </div>
            <hr className="--hr-faded my-5" />

            <div className="[&>p]:mb-2">
                <h2 className="text-2xl font-bold">Other command worth knowing</h2>
                <pre><code>
{`</> Bash
npx prisma db push
`}
                </code></pre>

                <p>Applies your schema to the database <i>without</i> creating a migration.</p>
                <p>Usefulfor quick prototyping when still figuring out your schema and don't want a migration history yet.</p>
                <p>Think this as "just sync it, I don't care about tracking this change" mode.</p>
                <p>Switch to <code>migrate dev</code> once more settled on you schema and proper history.</p>
            </div>
            <hr className="--hr-faded my-5" />

            <div>
                <h2 className="text-2xl font-bold mb-5">Overwriting <code>schema.prisma</code> Based from Tables in Database</h2>
                
                <div className="mb-5">
                    <p>To introspect your existing MySQL database and generate Prisma schema from it:</p>
                    <pre><code>
    {`</> Bash
    npx prisma db pull
    `}
                    </code></pre>
                    <p>This reads your database connection from <code>DATABASE_URL</code> in <code>.env</code> and overwrites your <code>schema.prisma</code> with models that reflect the current tables.</p>
                </div>

                <div>
                    <p>After that, you'll typically want a generate the Prisma client:</p>
                    <pre><code>
{`</> Bash
npx prisma generate
`}
                    </code></pre>
                </div>
            </div>
        </div>
    )
}