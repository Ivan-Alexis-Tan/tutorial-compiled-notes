export default function Prisma3Migration() {
    return (
        <div>
            <h1>Migrations</h1>

            <div>
                <h2>Main Command</h2>
                <pre><code>
{`</> Bash
npx prisma migrate dev --name <description>
`}
                </code></pre>
                <p>The main one durin development.</p>
                <p>Run this every time <code>schema.prisma</code> changes.</p>
                <p><strong>Does 3 things</strong> in one command:</p>
                <ol>
                    <li>Generate a SQL migration file</li>
                    <li>Applies it to the database</li>
                    <li>Regenerates the Prisma client</li>
                </ol>

                <p><code>--name</code> is just a label for the migration file, like</p>
                <ul>
                    <li><code>--name add_user_model</code>, or</li>
                    <li><code>--name add_email_to_post</code></li>
                </ul>
            </div>

            <div>
                <h2>Good-to-know Command</h2>
                <pre><code>
{`</> Bash
npx prisma generate
`}
                </code></pre>
                <p><strong>Only generate the Prisma client</strong> without touching the database.</p>
                <p>Run if you somehow have the right schema but your generated client is out of sync.</p>
                <p>Less common command, but good to know.</p>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2>Compared to Alembic Workflow:</h2>
                <table>
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
                <p><strong>Big difference:</strong>: Prisma combines revision generation and applying in one command.</p>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2>Other command worth knowing</h2>
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
        </div>
    )
}