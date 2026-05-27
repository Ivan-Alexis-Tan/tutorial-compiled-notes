
export default function Ts6OptionalChainingAndBang() {
    return (
        <div>
            <h1>Optional Chaining and Bang</h1>
            
            <div>
                <h2>Optional Chaining</h2>
                <p>Use of <code>?</code> if something return undefined or null before chaining.</p>
                <pre><code>
{`</> TypeScript
const arr = [
    {name: 'Juan'},
    {name: 'Jane'},
    {name: "July"},
]
const emptyArr: {name: string}[] = []

const last = arr.pop()?.name
const empty = emptyArr.pop()?.name

console.log(${"`Last person = ${last}`"})
console.log(${"`Empty array = ${empty}`"})
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`Last person = July
Empty array = undefined`}
                </code></pre>
                <p>The empty array did not throw an error and returned <code>undefined</code> instead.</p>
            </div>

            <div>
                <h2>The Bang (Exclamation Point &rarr; <code>!</code>)</h2>
                <p>Tells the compiler to ignore the possibility of it being <code>undefined</code>.</p>
                <pre><code>
{`</> TypeScript
const arr = [
    [{name: 'Juan'}],
]
const emptyArr: {name: string}[][] = []

const last = arr.pop()!.pop()!.name
const empty = emptyArr.pop()!.pop()!.name

console.log(${"`Last person = ${last}`"})
console.log(${"`Empty array = ${empty}`"})
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>{`TypeError: Cannot read properties of undefined (reading 'pop')`}</code></pre>
                <p>This crashes the app because <code>!</code> forces to keep chaining and not be <code>undefined</code>.</p>
            </div>
        </div>
    )
}