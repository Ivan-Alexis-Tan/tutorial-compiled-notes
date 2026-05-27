export default function Ts21TypeSyntax() {
    return (
        <div>
            <h1>TypeScript Type Syntax</h1>

            <div>
                <h2>1. Primitives</h2>
                <pre><code>
{`string
number
boolean
null
undefined
symbol
bigint`}    
                </code></pre>
            </div>

            <div>
                <h2>2. Literals</h2>
                <pre><code>
{`"hello"       // exact string value
42              // exact number value
true            // exact boolean value`}
                </code></pre>
            </div>

            <div>
                <h2>3. Arrays &mdash; rule: <code>T[]</code> or <code>{`Array<T>`}</code></h2>
                <pre><code>
{`string[]
number[]
boolean[]`}
                </code></pre>
            </div>

            <div>
                <h2>4. Objects &mdash; rule: <code>{`{ key: Type; key: Type }`}</code></h2>
                <pre><code>{`{ name: string; age: number }`}</code></pre>
            </div>

            <div>
                <h2>5. Union &mdash; rule: <code>A | B</code></h2>
                <pre><code>
{`string | number
"yes" | "no" | null`}
                </code></pre>
            </div>

            <div>
                <h2>6. Intersection &mdash; rule: <code>A & B</code></h2>
                <pre><code>{`TypeA & TypeB`}</code></pre>
            </div>

            <div>
                <h2>7. Functions &mdash; rule: <code>{`(param: Type) => ReturnType`}</code></h2>
                <pre><code>
{`(x: number) => string
() => void`}
                </code></pre>
            </div>

            <div>
                <h2>8. Generics &mdash; rule: <code>{`Name<T>`}</code> to define, <code>{`Name<ConcreteType>`}</code> to use</h2>
                <pre><code>
{`Arrays<string>
Promise<number>
Record<string, number>`}
                </code></pre>
            </div>

            <div>
                <h2>9. Indexed access &mdash; rule: <code>T[K]</code> where K is a key of T</h2>
                <pre><code>{`Person["name"]         // extracts the type of that property`}</code></pre>
            </div>

            <div>
                <h2>10. Index signature &mdash; rule: <code>{`{ [key: KeyType]: ValueType }`}</code></h2>
                <pre><code>{`{ [key: string]: number }`}</code></pre>
            </div>

            <div>
                <h2>11. <code>keyof</code> &mdash; rule: produces a union of all keys of a type.</h2>
                <pre><code>keyof Person         // "name" | "age"</code></pre>
            </div>

            <div>
                <h2>12. <code>typeof</code> &mdash; rule: extracts the type of a value</h2>
                <pre><code>typeof someVariable</code></pre>
            </div>

            <div>
                <h2>13. Generic constraints &mdash; rule: <code>{`<T, K extends X`}</code></h2>
                <p><code>extends</code> in a generic means "K must be assignable to X". It's a constraint, not inheritance.</p>
                <pre><code>{`<T, K extends keyof T>`}</code></pre>
                <p>This means:</p>
                <ul>
                    <li><code>T</code> &mdash; any type, caller decides</li>
                    <li><code>K</code> &mdash; must be one of the keys of whatever <code>T</code> turns out to be</li>
                </ul>
                <p>So if <code>{`T = { name: string: age: number}`}</code>, then <code>K</code> can only be <code>"name" | "age"</code>.</p>
            </div>
        </div>
    )
}