
export default function Ts5TypeCastingAnyUnknown() {
    return (
        <div>
            <h1>Any, Unknown and Type Casts</h1>
            
            <div>
                <h2>Any Type</h2>
                <p>Allows for flexible typing but sacrifices type safety as it lacks compile-time type checking.</p>
                <p>Used when in very complex situation and not able to predict what the type of the variable gonna be.</p>
                <pre><code>
{`</> TypeScript
let x: any = 1;

x = 'juan';
x = true;
`}
                </code></pre>
                <p>Throws no errors at all.</p>
            </div>

            <div>
                <h2>Unkown and Type Casting</h2>
                <p>A type-safe counterpart to <code>any</code> type.</p>
                <p>Provides a powerful way to handle values of uncertain types while maintaining type safety.</p>
                <pre><code>
{`</> TypeScript
let x: unknown = 'Juan';

// Ascertain unknown value
function ascertainUnknown(val: unknown): number {
    if (typeof val == 'number') return val + 1;
    else if (typeof val == "string") return val.length
    else if (typeof val == "boolean") return Number(val)
    return 0
}

// Casting
const result = "Hello, " + (x as 'string')

console.log("Ascertain =", ascertainUnknown(x))
console.log("Casting =", result)
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`Ascertain = 4
Casting = Hello, Juan`}
                </code></pre>
            </div>
        </div>
    )
}