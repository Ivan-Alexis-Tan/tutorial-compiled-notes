import { useState } from "react"

export default function Prisma3Migration() {
    const [detailId, setDetailId] = useState(1)
    const ids = Object.keys(guideMap)
    
    return (
        <div>
            <h1 className="text-4xl font-bold mb-5">Migrations</h1>

            <div className="flex justify-center mb-5">
                <div className="flex justify-evenly w-80">
                    {ids.map(id => (
                        <span key={Number(id)}
                            className={`py-1 px-5 rounded-xl hover:bg-white hover:text-black border border-white
                                       ${detailId === Number(id) && "bg-white text-black hover:bg-[hsl(0,0%,70%)]!"}`}
                            onClick={_ => setDetailId(Number(id))}
                        >
                            {guideMap[Number(id)].name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-5">
                {guideMap[detailId].comp()}
            </div>
        </div>
    )
}

const Workflow = _ => {
    return (
        <div>
            <h2>Typical Prisma Workflow</h2>
            <p>Suppose the human starts with this model and adds new column <code>total</code>:</p>

            <div className="flex justify-center">
                <div className="flex justify-start items-center overflow-auto
                                [&>div]:flex [&>div]:flex-col [&>div]:items-center
                                [&_p]:pt-5 [&_p]:font-bold"
                >
                    <div>
                        <p>Before:</p>
                        <pre><code>
{`</> prisma
model Transactions {
    id          BigInt  @id @default(autoincrement())
    amount      Float
    quantity    Int     @default(1)

}
`}
                        </code></pre>
                    </div>
                    <span className="text-4xl">&rarr;</span>
                    <div>
                        <p>After:</p>
                        <pre><code>
{`</> prisma
model Transactions {
    id          BigInt  @id @default(autoincrement())
    amount      Float
    quantity    Int     @default(1)
    total       Float?
}
`}
                        </code></pre>
                    </div>
                </div>
            </div>
            <hr className="--hr-faded"/>

            <div>
                <h2>1. Intead of Applying the Migration</h2>
                <pre><code>
{`</> Bash
pnpm prisma migrate dev --create-only --name add-total-column
`}
                </code></pre>

                <p>Prisma creates:</p>
                <pre><code>
{`prisma/
└── migrations/
    └── 20260708153000_add-total/
        └── migration.sql
`}
                </code></pre>
            </div>
            <hr className="--hr-faded"/>

            <div>
                <h2>2. Open <code>migration.sql</code> then Rewrite the Query</h2>
                <p>Prisma probably generated:</p>
                <pre><code>
{`</> SQL
ALTER TABLE "Transactions"
ADD COLUMN "total" DOUBLE PRECISION;
`}
                </code></pre>
                <p>Rewrite it to:</p>
                <pre><code>
{`</> SQL
ALTER TABLE "Transactions"
ADD COLUMN "total" DOUBLE PRECISION
GENERATED ALWAYS AS (
    quantity * amount
) STORED;
`}
                </code></pre>
                <p>Save then migrate it:</p>
                <pre><code>
{`</> Bash
pnpm prisma migrate dev
`}
                </code></pre>
            </div>
        </div>
    )
}

const ShortDetails = _ => {
    return (
        <div>
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

const guideMap = {
    1: {name: "Workflow", comp: Workflow},
    2: {name: "Concise", comp: ShortDetails},
}