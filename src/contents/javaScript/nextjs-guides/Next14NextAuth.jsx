import SummaryTable, { useSummaryTable } from "../../../components/SummaryTable";

export default function Next14NextAuth() {
    const { colnames, mappedData, rowId, setRowId } = useSummaryTable({
        colnames: ["Step", "Title"],
        mappedData: guides,
    })
    const mapIds = Object.keys(mappedData)
    const id = (rowId === 0) ? 1 : rowId

    return (
        <div className="nextauth-container">
            <h1 className="text-4xl font-bold mb-5">NextAuth Guides</h1>

            <div className="table-steps">
                <div className="table-linker flex justify-center mb-10">
                    <div className="flex justify-start overflow-auto">
                        <table className="max-w-2xl w-full">
                            <thead className="sticky top-0">
                                <tr>
                                    {colnames.map((col, idx) => (<th key={`${idx}`+col}>{col}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {mapIds.map(id => {
                                    const sec = mappedData[id]
                                    return <tr key={id}
                                        className="[&_span]:hover:cursor-pointer [&_span]:hover:text-(--link-hover-text-clr) [&_span]:hover:*:text-(--link-hover-text-clr)!"
                                    >
                                        <td>
                                            <span onClick={_ => setRowId(id)}>
                                                {typeof(sec.name) === "function" ? sec.name() : sec.name}
                                            </span>
                                        </td>
                                        {sec.desc 
                                            && <td>
                                                <span onClick={_ => setRowId(id)}>
                                                    {typeof(sec.desc) === "function" ? sec.desc() : sec.desc}
                                                </span>
                                            </td>
                                        }
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="flex-1 next-auth-contents">
                    <hr className="mb-5" />

                    <div className="[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-5 mb-5 ">
                        {mappedData[id]?.comp()}
                    </div>
                </div>
            </div>
        </div>
    )
}

const InstallPackage = _ => {
    return (
        <div>
            <h2>1. Install The Packages</h2>
            
            <pre><code>
{`</> Bash
npm install next-auth @auth/prisma-adapter`}
            </code></pre>

            <p>Then install Prisma if not yet installed.</p>

            <pre><code>
{`</> Bash
npm install @prisma/client
npm install -D prisma`}
            </code></pre>
        </div>
    )
}

const PrepDatabase = _ => {
    return (
        <div>
            <h2>2. Prepare the Database</h2>
            <p>The Prisma schema should include.</p>

            <pre><code>
{`</> Prisma
model User {
  id            Int       @id @default(autoincrement())
  email         String?   @unique
  name          String?
  image         String?
  emailVerified DateTime?

  accounts Account[]
  sessions Session[]
}

model Account {
  id Int @id @default(autoincrement())

  userId Int
  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)

  provider          String
  providerAccountId String

  type          String
  access_token  String? @db.Text
  refresh_token String? @db.Text
  expires_at    Int?

  token_type    String?
  scope         String? @db.Text
  id_token      String? @db.Text
  session_state String?

  @@unique([provider, providerAccountId])
}

model Session {
  id           Int      @id @default(autoincrement())
  sessionToken String   @unique
  userId       Int
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expires      DateTime
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
`}
            </code></pre>

            <div className="[&>p]:mb-1 mb-5">
                <p>These are the models the Prisma Adapter Expects</p>
                <p>If using OAuth providers, <strong>Account</strong> is required because it stores the provider information.</p>
            </div>

            <h3><strong>Example:</strong></h3>
            <pre><code>
{`Google Account
├──> provider = google
└──> providerAccountId = xxxxxxxxxx
`}
            </code></pre>

            <p>The adapter automatically creates and updates these records.</p>
        </div>
    )
}

const CreatePrismaClient = _ => {
    return (
        <div>
            <h2>3. Create the Prisma Client</h2>
            <h3><strong>Example:</strong></h3>
            
            <pre><code>
{`</> TypeScript
// lib/prisma.ts

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    connectionLimit: 5,
    allowPublicKeyRetrieval: true,
})

const client = new PrismaClient({ adapter })

const globalForPrisma = globalThis as unknown as { prisma: typeof client }

export const prisma = globalForPrisma.prisma ?? client

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
`}
            </code></pre>

            <p>Everything that needs database access should reuse this single client.</p>
        </div>
    )
}

const ConfigEnv = _ => {
    return (
        <div>
            <h2>4. Configure the Environment Variables</h2>
            <h3><strong>Typical variables:</strong></h3>

            <pre><code>
{`</> .env
DATABASE_URL=

AUTH_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
`}
            </code></pre>
            
            <div className="[&>p]:my-1">
                <p><code>AUTH_SECRET</code></p>
                <p>This encrypts cookies and sessions.</p>
                <p>Without it, Auth.js cannot safely create/read sessions.</p>
            </div>
        </div>
    )
}

const CreatAuthConfig = _ => {
    return (
        <div>
            <h2>5. Create <code>auth.config.ts</code></h2>
            <p>This file should contain the configuration that is shared.</p>

            <h3><strong>Example:</strong></h3>
            <pre><code>
{`</> TypeScript
import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup"]

export const authConfig = {
    pages: {
        signIn: "/login",
    },

    callbacks: {
        authorized({ auth, request: {nextUrl} }) {
            const isLoggedIn = !!auth?.user;
            const inPublicRoute = publicRoutes.includes(nextUrl.pathname);

            if (!inPublicRoute) {
                if (!isLoggedIn) return NextResponse.redirect(new URL("/login", nextUrl));
                return true;
            }
            
            return true;
        },
    },

    providers: [],
} satisfies NextAuthConfig;
`}
            </code></pre>

            <div className="[&>p]:my-1 mb-5">
                <p>Good things to place here:</p>

                <ul className="ml-10 [&>li]:list-disc">
                    <li>pages</li>
                    <li>authorized callback</li>
                    <li>shared callbacks</li>
                    <li>shared options</li>
                </ul>
            </div>

            <p>Avoid putting provider-specific configuration here unless it is intentionally shared.</p>
        </div>
    )
}

const CreateAuth = _=> {
    return (
        <div>
            <h2>6. Create <code>auth.ts</code></h2>
            <p className="mb-5">This is where Auth.js is initialized.</p>

            <h3><strong>Example:</strong></h3>
            <pre><code>
{`</> TypeScript
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "database",
    },

    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Github,
    ],

    callbacks: {
        ...authConfig.callbacks,
        async jwt({ token, account, user }) {
            console.log(${"`JWT CALLBACK =`"}, {token, account, user})
            return token
        },
        async session({ session, token }) {
            console.log(${"`SESSION CALLBACK =`"}, { session, token })
            return session
        },
    },
}),
`}
            </code></pre>
            
            <div className="mb-5">
                <p className="mb-3">This is the most important file.</p>

                <p>It creates:</p>
                <ul className="ml-10 [&>li]:list-disc [&>li]:mb-1">
                    <li><code>auth()</code></li>
                    <li><code>handlers</code></li>
                    <li><code>signIn()</code></li>
                    <li><code>signOut()</code></li>
                </ul>
            </div>

            <p>These should be reused everywhere.</p>
        </div>
    )
}

const CreateApiRoute = _=> {
    return (
        <div>
            <h2>7. Create the API Route</h2>
            <p>File DIR:</p>
            <pre><code>
{`app/api/auth/[...nextauth]/route.ts`}
            </code></pre>

            <p>Inside <code>route.ts</code> file:</p>
            <pre><code>
{`</> TypeScript
import { handlers } from "@/auth"

export const { GET, POST } = handlers
`}
            </code></pre>
            <p className="mb-5">This exposes the Auth.js endpoints.</p>

            <h3><strong>For example:</strong></h3>
            <pre><code>
{`/api/auth/signin

/api/auth/signout

/api/auth/callback/google

/api/auth/session`}
            </code></pre>
        </div>
    )
}

const ConfigMiddleware = _=> {
    return (
        <div>
            <h2>8. Configure Middleware (<code>proxy.ts</code>)</h2>
            <p>Instead of creating another Auth.js instance.</p>

            <pre><code>
{`</> TypeScript
export { auth as default } from "@/auth"

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\.png$).*)']
};
`}
            </code></pre>

            <div className="mb-5">
                <p>This guarantees:</p>
                <ul className="[&>li]:list-disc [&>li]:ml-10">
                    <li>same adapter</li>
                    <li>same providers</li>
                    <li>same callbacks</li>
                    <li>same session strategy</li>
                </ul>
            </div>

            <p>Everything uses one initialized Auth.js instance.</p>
        </div>
    )
}

const ProtectedRoutes = _=> {
    return (
        <div>
            <h2>9. Protect Routes</h2>
            <p>Inside:</p>
            <pre><code>
{`</> TypeScript
callbacks: {
    authorized({ auth, request: {nextUrl} }) {
        ...
    }
}`}
            </code></pre>

            <p>Example logic:</p>
            <pre><code>
{`</> TypeScript
authorized({ auth, request: {nextUrl} }) {
    const isLoggedIn = !!auth?.user;

    const publicRoutes = ["/login", "/signup"]
    const inPublicRoute = publicRoutes.includes(nextUrl.pathname);

    if (!inPublicRoute) {
        if (!isLoggedIn) return NextResponse.redirect(
            new URL("/login", nextUrl)
        );
        return true;
    }
    
    return true;
},
`}
            </code></pre>

            <p>The middleware calls this callback every request.</p>
        </div>
    )
}

const OAuthLogin = _=> {
    return (
        <div>
            <h2>10. OAuth Login</h2>
            <p>Server Action:</p>
            <pre><code>
{`</> TypeScript
"use server"

import { signIn } from "@/auth"

export async function loginGoogle() {
    await signIn("google", { redirectTo: "/" })
}
`}
            </code></pre>

            <p>GitHub</p>
            <pre><code>
{`</> TypeScript
await signIn("github", { redirectTo: "/" })
`}
            </code></pre>

            <div>
                <p className="mb-3">No manual OAuth request is needed.</p>

                <p>Auth.js handles:</p>
                <ul className="[&>li]:ml-10 [&>li]:list-disc mb-3">
                    <li>redirect</li>
                    <li>state</li>
                    <li>csrf</li>
                    <li>callback</li>
                </ul>

                <p>Automatically.</p>
            </div>
        </div>
    )
}

const OAuthCallback = _=> {
    return (
        <div>
            <h2>11. OAuth Callback</h2>
            <p>Google redirects to:</p>
            <pre><code>/api/auth/callback/google</code></pre>

            <div className="mb-5 [&>p]:my-1">
                <p>Developers do NOT implement this route.</p>
                <p>Auth.js already does.</p>
            </div>

            <div>
                <p><strong>Inside the callback</strong>, Auth.js automatically</p>
                <ul className="[&>li]:ml-10 [&>li]:list-disc mb-3">
                    <li>validates state</li>
                    <li>exchanges authorization code</li>
                    <li>requests Google profile</li>
                    <li>requests Google email</li>
                    <li>creates User if missing</li>
                    <li>creates Account</li>
                    <li>creates Session</li>
                    <li>creates session cookie</li>
                </ul>

                <p>All automatically.</p>
            </div>
        </div>
    )
}

const DbRecords = _=> {
    return (
        <div className="[&_h3]:text-2xl [&_h3]:font-bold [&>div]:mb-5 [&>div]:pb-5 [&>div]:border-b [&>div]:border-blue-300">
            <h2>12. Database Records</h2>
            <p className="mb-5">The Prisma Adapter automatically inserts.</p>

            <div>
                <h3>User</h3>
                <pre><code>
{`id
email
name
image
emailVerified
`}
                </code></pre>
            </div>

            <div>
                <h3>Account</h3>
                <pre><code>
{`provider
providerAccountId
access_token
refresh_token
expires_at
id_token
`}
                </code></pre>
                <p>One record per OAuth provider.</p>
            </div>

            <div>
                <h3>Session</h3>
                <pre><code>
{`sessionToken
userId
expires
`}
                </code></pre>
                <p>Database Session strategy stores sessions here.</p>
            </div>

            <div className="[&>p,&>ul]:ml-5">
                <h3 className="mb-2">VerificationToken</h3>
                <p>Mostly used for</p>
                <ul className="[&>li]:ml-10 [&>li]:list-disc mb-3">
                    <li>Email Provider</li>
                    <li>Magic Links</li>
                </ul>
                <p>OAuth providers usually don't use this table.</p>
            </div>
        </div>
    )
}

const RBAC = _ => {
    return (
        <div className="[&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-5
                        [&_ul>li]:ml-10 [&_ul>li]:list-disc [&_ul>li]:pb-1
        ">
            <h2>Role-based Access Control (RBAC)</h2>

            <div>
                <h3>1. Define Roles in Prisma</h3>
                <pre><code>
{`</> prisma
enum Role {
    USER
    ADMIN
}

model User {
    id      Int     @id @default(autoincrement())
    email   String  @unique

    role    Role    @default(USER)
}
`}
                </code></pre>
                <p><strong>Purpose</strong></p>
                <ul className="mb-5">
                    <li>Database restricts valid values.</li>
                    <li>Prisma generates the <code>Role</code> TypeScript type.</li>
                    <li>New users automatically become <code>USER</code>.</li>
                </ul>

                <p>Then, migrate database if data already exists:</p>
                <pre><code>npx prisma migrate dev --name add-user-role</code></pre>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h3>2. Extend NextAuth types</h3>
                
                <p>Create a <code>{`<fileName>.d.ts`}</code> file</p>
                <pre><code>
{`</> TypeScript
// /app/types/next-auth.d.ts

import "next-auth"
import { DefaultSession } from "next-auth"
import { Role } from "@/generated/prisma/client"

declare module "next-auth" {
    interface Session {
        user: {
            role: Role
        } & DefaultSession["user"];
    }
    
    interface User {
        role: Role
    }
} 
`}
                </code></pre>
                <p><strong>Purpose</strong></p>
                <p>Tells TypeScript that these exists:</p>
                <ul className="mb-5">
                    <li><code>session.user.role</code></li>
                    <li><code>user.role</code></li>
                </ul>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h3>3. Copy the Role into the Session</h3>
                <p>In <code>auth.ts</code>:</p>
                <pre><code>
{`</> TypeScript
callbacks: {
    async session({ session, user }) {
        session.user.role = user.role
        return session
    }
}
`}
                </code></pre>
                <p><strong>Purpose</strong></p>
                <ul>
                    <li>Enables to include <code>role</code> column to the <code>session</code></li>
                    <li>Now you can access this anywhere, example:</li>
                    <pre><code>
{`</> TypeScript
import { auth } from "@/auth.ts"

export default async function Page() {
    const session = await auth();

    return (
        <div>
            {session?.user.role === "USER"
                && <button>Remove item</button>
            }
        </div>
    )
} 
`}
                    </code></pre>
                </ul>
            </div>
        </div>
    )
}

const guides = {
    1: {name: 1, desc: "Install the Packages", comp: InstallPackage},
    2: {name: 2, desc: "Prepare the Database", comp: PrepDatabase},
    3: {name: 3, desc: "Create the Prisma Client", comp: CreatePrismaClient},
    4: {name: 4, desc: "Configure the Environment Variables", comp: ConfigEnv},
    5: {name: 5, desc: _=> <>Create <code>auth.config.ts</code></>, comp: CreatAuthConfig},
    6: {name: 6, desc: _=> <>Create <code>auth.ts</code></>, comp: CreateAuth},
    7: {name: 7, desc: "Create the API Route", comp: CreateApiRoute},
    8: {name: 8, desc: _=> <>Configure Middleware <code>proxy.ts</code></>, comp: ConfigMiddleware},
    9: {name: 9, desc: "Protect Routes", comp: ProtectedRoutes},
    10: {name: 10, desc: "OAuth Login", comp: OAuthLogin},
    11: {name: 11, desc: "OAuth Callback", comp: OAuthCallback},
    12: {name: 12, desc: "Database Records", comp: DbRecords},
    13: {name: 13, desc: "Role-based Access Control (RBAC)", comp: RBAC},
}