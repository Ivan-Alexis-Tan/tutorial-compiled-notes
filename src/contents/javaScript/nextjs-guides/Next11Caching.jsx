export default function Next11Caching() {
    return (
        <div>
            <h1>Caching</h1>
            <p>Simply means storing data that is reusable instead of refetching them.</p>

            <div>
                <h2>Types of Cache</h2>
                <h3>1. Browser Caching</h3>
                <ul><li>Saves static files locally.</li></ul>

                <h3>2. Server Cache</h3>
                <ul><li>Stores pre-rendered pages & API responses.</li></ul>
            
                <h3>3. Data Cache</h3>
                <ul><li>Remembers fetched data to avoid repeat requests.</li></ul>
            </div>
            <hr className="--hr-faded" />
            
            <div>
                <h2>Configuring Caching</h2>
                <p>No longer choose SSR (Server-side Rendering) or SSG (Static Site Generation).</p>
                <p>Simply add an additional flag on <code>next.config.ts</code></p>
                <pre><code>
{`</> TypeScript
// next.config.ts

const nextConfig = {
    cacheComponents: true,
};

export default nextConfig;
`}
                </code></pre>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2>Marking with <code>"use cache"</code></h2>
                <p>Can be marked on routes, components, or function.</p>
                <p>Tells Next.js to store and reuse the output if inputs haven't changed.</p>
                <p>Like <code>"use client"</code> and <code>"use server"</code></p>

                <p>Does:</p>
                <ul>
                    <li>Prerenders it at a build time</li>
                    <li>Stores it in memory</li>
                    <li>Revalidates it automatically (every 15 minutes on default)</li>
                </ul>

                <p><strong>Example 1:</strong> Mark on a file</p>
                <pre><code>
{`</> TypeScript
"use cache"

export default async function Page() {
    //...
}
`}
                </code></pre>

                <p><strong>Example 2:</strong> Mark on a component</p>
                <pre><code>
{`</> TypeScript
export default async function MyComponent() {
    "use cache"
    
    return <></>
}
`}
                </code></pre>

                <p><strong>Example 3:</strong> Mark on a function</p>
                <pre><code>
{`</> TypeScript
export async function getData() {
    "use cache"

    return await fetch("/api/data").then(r => r.json())
}
`}
                </code></pre>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2>Fine-Tune the Cache</h2>
                <p>Using <code>cacheLife()</code></p>
                <ul><li>Controls how long data stays cached.</li></ul>
                <pre><code>
{`</> TypeScript
"use cache";

import { unstable_cacheLife as cacheLife } from "next/cache"

export default async function CachedProductCard({ productId }: { productId: string }) {
    cacheLife("hours")          // cache for an hour
    const res = await fetch(${"`https://api.example.come/products/${productId}`"})
    const product = await res.json();

    return (
        <div className="p-4 bg-white shadow-xl rounded-log">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>Price: {product.price}</p>
        </div>
    )
}

`}
                </code></pre>

                <p>Can also define <strong>custom lifetimes</strong> in your config:</p>
                <pre><code>
{`</> TypeScript
cachLife: {
    twoweeks: {
        stale: 60 * 5,
        revalidate: 60 * 60 * 24 * 14,
        expire: 60 * 60 * 24 * 365
    },
}
`}
                </code></pre>

                <p>Can also use cache tag:</p>
                <pre><code>
{`</> TypeScript
import { cacheTag } from "next/cache";

export async function getData() {
    "use cache"
    cacheTag('my-data')         // cache tag

    return await fetch("/api/data")
}
`}
                </code></pre>
                <p>This groups cached items for easier invalidation.</p>
            
                <p>Difference:</p>
                <ul>
                    <li><code>cacheLife</code> &rarr; <i>When</i> to clear</li>
                    <li><code>cacheTag</code> &rarr; <i>What</i> to clear</li>
                </ul>
                
                <p>To refresh constant instantly, use:</p>
                <ul>
                    <li><code>revalidate()</code></li>
                    <li><code>revalidateTag()</code></li>
                </ul>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2>Partial Pre-rendering (PPR)</h2>

                <pre><code>
{`</> TypeScript
// next.config.ts

const nextConfig = {
    cacheComponents: true,
};

export default nextConfig;
`}
                </code></pre>
                <p>⚠️ Needs more information, lacking on previous tutorial resources.</p>
            </div>
        </div>
    )
}