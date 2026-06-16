import { useState } from "react"
import { Link } from "react-router-dom"
import SummaryTable, { useSummaryTable } from "../../../components/SummaryTable"

export default function Next13Authentication() {
    const [currId, setCurrId] = useState(1)
    const ids = Object.keys(guides)
    const guideTitles = ids.map(id => guides[id].name)

    const { tableStates } = useSummaryTable({
        colnames: ["Guides"],
        mappedData: guides,
    })

    return (
        <div className="mb-5">
            <h1 className="h1-title">Authentication</h1>
            
            <SummaryTable tableStates={tableStates} />
        </div>
    )
}

const AuthenticationVSAuthorization = () => {
    return (
        <div className="[&_li]:mt-2 [&_li]:ml-10 [&_li]:list-disc [&_ul]:mb-5">
            <h2 className="h2-title">Authentication vs. Authorization</h2>

            <h3 className="h3-title">Authentication</h3>
            <ul>
                <li>About making sure the user is who they say they are.</li>
                <li>User is proving his/her identity with something he/she has like a username and password</li>
            </ul>

            <h3 className="h3-title">Authorization</h3>
            <ul>
                <li>The next step after authenticating.</li>
                <li>Once a user's identity is confirmed, authorization decides what parts of the application they are allowed to use.</li>
            </ul>
            <p>So, <strong>authentication</strong> checks who you are, and <strong>authorization</strong> determines what you can do or access in the application.</p>
        </div>
    )
}

const SettingNextAuthJS = () => {
    return (
        <div>
            <h2 className="h2-title">Setting up NextAuth.js</h2>

            <div className="mb-5">
                <h3 className="h3-title">Install <code>NextAuth.js</code>:</h3>
                <pre><code>
{`</> Bash
pnpm i next-auth@beta`}
                </code></pre>
                <p><code>beta</code> version is compatible with <code>Next.js</code> 14+</p>
            </div>
            <hr className="--hr-faded"/>

            <div className="mb-3">
                <h3 className="h3-title">Generate Secret Key</h3>
                <pre><code>
{`</> Bash
# macOS
openssl rand -base64 32

# Windows can use https://generate-secret.vercel.app/32
`}
                </code></pre>
                <p>Then in <code>.env</code> file, add your generated key to the <code>AUTH_SECRET</code> variable:</p>
                <pre><code>
{`/.env
AUTH_SECRET=your-secret-key`}
                </code></pre>
                
                <div className="[&>p]:mt-2 mb-5">
                    <p>In production, update the environment variables in Vercel project too.</p>
                    <p>Guide on Vercel: <Link to={"https://vercel.com/docs/environment-variables"}>Add environment variables on Vercel</Link> </p>
                </div>
            </div>

        </div>
    )
}

const CreateAuthConfig = () => {
    return (
        <div className="mb-5">
            <h2 className="h2-title">Create <code>/auth.config.ts</code> File</h2>
            
            <div className="[&>p]:mt-2 mb-5">
                <p>Create an <code>auth.config.ts</code> file at the root of the project that exports <code>authConfig</code> object.</p>
                <p>This object will <strong>contain configuration options</strong> for <code>NextAuth.js</code></p>
            </div>
            <hr className="--hr-faded"/>
            
            <div className="mb-5">
                <h2 className="h2-title">Adding Page Option</h2>
                <pre><code>
{`</> ts
// /auth.config.ts

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
} satisfies NextAuthConfig;
`}
                </code></pre>
                
                <div className="[&>p]:mt-2 mb-5">
                    <p>Can use the <code>pages</code> option to specify the route for custom sign-in, sign-out, and error pages.</p>
                    <p>Not required, but by adding <code>signIn: "/login"</code> to <code>pages</code> option, the <strong>user will be redirected to custom login page</strong>, rather than the <code>NextAuth.js</code> default page.</p>
                </div>
            </div>
            <hr className="--hr-faded"/>

            <div className="mb-5">
                <h2 className="h2-title">Protected Routes with Next.js Proxy</h2>
                
                <div className="[&>p]:mt-2 mb-5">
                    <p>Add logic to protect routes.</p>
                    <p>This prevent users from accessing the dashboard page unless they are logged in.</p>
                </div>

                <pre><code>
{`</> TS
// /auth.config.ts

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authroized({ auth, request: {nextUrl} }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false;           // Redirect unauthenticated userst to login page
            }
            else if (isLoggedIn) return Response.redirect(new URL("/dashboard", nextUrl));

            return true;
        },
    },
    providers: [],                      // Add providers with an empty array for now
} satisfied NextAuthConfig;
`}
                </code></pre>
                <p>The <code>authorized</code> callback:</p>
                <ul className="[&>li]:ml-10 [&>li]:mt-2 [&>li,&>ul]:list-disc [&>ul]:ml-15 mb-5">
                    <li>Verifies if the request is authorized to access a page with Next.js Proxy.</li>
                    <li>Is called before a request is completed.</li>
                    <li>It receives an object with the <code>auth</code> and <code>request</code> properties.</li>
                    <ul>
                        <li><code>auth</code> propert contains the user's session.</li>
                        <li><code>request</code> property contains the incoming request.</li>
                    </ul>
                </ul>

                <p>The <code>providers</code> option:</p>
                <ul className="[&>li]:ml-10 [&>li]:mt-2 [&>li,&>ul]:list-disc [&>ul]:ml-15 mb-5">
                    <li>An arraw where you list different login options.</li>
                    <li>For now, it's empty to satisfy NextAuth config.</li>
                    <li>Learn more: 
                        <Link to={"https://nextjs.org/learn/dashboard-app/adding-authentication#adding-the-credentials-provider"}>
                            <i> Adding the Credentials provider</i>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const CreateProxyFile = () => {
    return (
        <div>
            <h2 className="h2-title">Create Proxy File</h2>
            
            <div className="[&>p]:mt-2 mb-5">
                <p>In the root of your project, create a file called <code>proxy.ts</code> with contents below.</p>
                <p>Then, import the <code>authConfig</code> object into the Proxy file.</p>
            </div>

            <pre><code>
{`</> TS
// /proxy.ts

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
`}
            </code></pre>
            
            <div className="[&>p]:mt-2 [&>ul]:ml-10 [&_li]:list-disc">
                <p>Here you're initializing <code>NextAuth.js</code> with the <code>authConfig</code> object and exporting the <code>auth</code> property.</p>
                <p>Uses <code>matcher</code> option to specificy that it should run on specific paths.</p>
                <p><strong>Protected routes will not even start rendering until the Proxy verifies the authentication</strong>.</p>
                <ul><li>Enhances securtiy and performance of the application.</li></ul>
            </div>
        </div>
    )
}

const PasswordHashing = () => {
    return (
        <div>
            <h2 className="h2-title">Password Hashing and <code>auth.ts</code> File.</h2>
            
            <div className="[&>p]:mt-2 mb-5">
                <p>About converting a password into a fixed-length string of characters, providing a layer of security even if the user's data is exposed.</p>
                <p>Uses <code>bcrypt</code> packacge to hash the user's password before storing it in the database.</p>
                <p><strong>Create separate file because <code>bcrypt</code> relies on Node.js APIs</strong> not available in Next.js Proxy.</p>
            </div>
            <hr className="--hr-faded"/>
            
            <div className="mb-5">
                <h2 className="h2-title">1. Create a new file</h2>
                <p>Create a new file called <code>auth.ts</code> that spreads your <code>authConfig</code> object:</p>
                <pre><code>
{`</> TS
// /auth.ts

import NextAuth from "next-auth";
import { authConfig } from "/.auth.config";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
})
`}
                </code></pre>
            </div>
            <hr className="--hr-faded"/>

            <div>
                <h2 className="h2-title">2. Adding Credentials Provider</h2>
                
                <div className="[&>p]:mt-2 mb-5">
                    <p><code>providers</code> is an array that lists different login options such as Google or GitHub.</p>
                    <p>On this context, it only focuses on using 
                        <Link to={"https://authjs.dev/getting-started/providers/credentials"}>
                            <i> Credentials provider </i>
                        </Link>
                        only.
                    </p>
                    <p>The credentials provider allows users to log in with a username and password.</p>
                </div>

                <pre><code>
{`</> TS
// /auth.ts

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({})],
})
`}
                </code></pre>
                <p className="font-bold">Good to know:</p>
                <ul className="[&_li]:list-disc [&>li]:ml-10 mb-5">
                    <li>There are other alternative providers such as <Link to={"https://authjs.dev/getting-started/authentication/oauth"}
                        ><i>OAuth</i></Link> or <Link to={"https://authjs.dev/getting-started/authentication/email"}
                        ><i>email</i>.</Link>
                    </li>
                    <li>See the <Link to={"https://authjs.dev/getting-started/authentication/oauth"}
                        ><i>NextAuth.js docs</i></Link> for a full list of options.
                    </li>
                </ul>
            </div>
            <hr className="--hr-faded"/>

            <div className="mb-5">
                <h2 className="h2-title">3. Add Sign In Functionality</h2>
                
                <div className="[&>p]:mt-2 mb-5">
                    <p>You can use the <code>authorize()</code> function to handle the authentication logic.</p>
                    <p>Similarly to Server Actions, <code>zod</code> can be used to validate the email and password before checking if the user exists in the database:</p>
                </div>

                <pre><code>
{`</> TS
// /auth.ts

import NextAuth from "next-auth";
import { authConfig } from "/.auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6)
                    })
                    .safeParse(credentials);
            },
        }),
    ],
});
`}
                </code></pre>
                <p>After validating the credentials, create a new <code>getUser()</code> that queries the user from the database.</p>

                <pre><code>
{`</> TS
// /auth.ts

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" })

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User[]>${"`SELECT * FROM users WHERE email=${email}`"};
        
        return user[0];
    }
    catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6)
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);

                    if (!user) return null;
                }

                return null;
            },
        }),
    ],
});
`}
                </code></pre>
                <p>Then, call <code>bcrypt.compare</code> to check if the passwords match:</p>

                <pre><code>
{`</> TS
// /auth.ts

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" })

// ...

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6)
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);

                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }

                console.error("Invalid credentials");
                return null;
            },
        }),
    ],
});
`}
                </code></pre>
                <p>Finally, if the passwords match you want to return the user, otherwise, return <code>null</code> to prevent the user from logging in.</p>
            </div>
        </div>
    )
}

const LoginServerAction = () => {
    return (
        <div>
            <h2 className="h2-title">Login Server Action</h2>
            
            <div className="[&>p]:mt-2 mb-5">
                <p>In <code>action.ts</code> (if does not exists create one: <code>/app/lib/actions.ts</code>), create a new action function called <code>authenticate()</code></p>
                <p>This action should import the <code>signIn()</code> from <code>auth.ts</code>:</p>
            </div>

            <pre><code>
{`</> TS
// /app/lib/actions.ts

"use server"

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// ...

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", formData);
    }    
    catch(error) {
        if (error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignIn":
                    return "Invalid credentials";
                default:
                    return "Something went wrong";
            }
        }

        throw error;
    }
}
`}
            </code></pre>
            
            <div className="[&>p]:mt-2 mb-5">
                <p>If there's a <code>"CredentialSignin"</code> error, you want to show an appropriate error message.</p>
                <p>Learn more: <Link
                    ><i>NextAuth.js errors documentation</i></Link>
                </p>
            </div>
        </div>
    )
}

const ConnectToLoginForm = () => {
    return (
        <div>
            <h2 className="h2-title">Connect Auth and Server Action to Login Form</h2>
            <p className="mb-5">In login form component, use React's <code>useActionState</code> to call the server action, handle form errors, and display the form's pending state:</p>
            
            <p className="font-bold">Example Login Form:</p>
            <pre><code>
{`</> TS
'use client';
 
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
 
export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  // useActionState hook usage
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
 
  return (
    <form action={formAction} className="space-y-3">    {/* <- applied formAction to the form */}
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={${"`${lusitana.className} mb-3 text-2xl`"}}>
          Please log in to continue.
        </h1>

        {/* Input Form */}
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Hidden Input */}
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        
        {/* Submit Button */}
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        {/* Error Message -> Showing the state from useActionState Hook */}
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>

      </div>
    </form>
  );
}
`}
            </code></pre>
        </div>
    )
}

const LogoutFunctionality = () => {
    return (
        <div>
            <h2 className="h2-title">Logout Functionality</h2>
            <p>Call the <code>signOut()</code> from <code>auth.ts</code> and apply to the logout <code>{"<form>"}</code> element:</p>
            <pre><code>
{`</> TS
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
 
export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">

      // ...

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />

        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

        {/* Applied the signOut on sign-out form */}
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
        
      </div>
    </div>
  );
}
`}
            </code></pre>
        </div>
    )
}

const guides = {
    1: {name: "Authentication vs. Authorization", comp: <AuthenticationVSAuthorization/>},
    2: {name: "Setting up NextAuth.js", comp: <SettingNextAuthJS />},
    3: {name: () => {return <>Create <code>/auth.config.ts</code> File</>}, comp: <CreateAuthConfig />},
    4: {name: "Create Proxy File", comp: <CreateProxyFile />},
    5: {name: _ => <>Password Hashing and <code>/auth.ts</code> File</>, comp: <PasswordHashing />},
    6: {name: "Login Server Action", comp: <LoginServerAction />},
    7: {name: "Connect Auth and Server Action to Login Form", comp: <ConnectToLoginForm />},
    8: {name: "Logout Functionality", comp: <LogoutFunctionality />},
}