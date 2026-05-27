
export default function Ts2PrimitiveTypes() {
    return (
        <div>
            <h1>Primitive Types</h1>
            <pre><code>
{`</> TypeScript
let numberType: number = 25
let stringType: string = 'hello'
let booleanType: boolean = true
`}
            </code></pre>
            
            <h2>Null and Undefined Types</h2>
            <pre><code>
{`</> TypeScript
let result = null;

result = "john"
result = 2
result = true
`}
            </code></pre>
            <p>Variable <code>result</code> becomes <code>any</code> type.</p>
            <p>With <code>let</code> keyword and being <code>null</code>, the variable can be change to any type without throwing error.</p>

            <h2>Void Type</h2>
            <p>Returns nothing</p>

            <h2>Never Type</h2>
            <p>Explicitly define that a function <strong>never returns</strong></p>
            <p>Like <code>def {`<func_name>() -> None:`}</code> in Python</p>
        </div>
    )
}