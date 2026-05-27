export default function Ts18Modules() {
    return (
        <div>
            <h1>Modules (Import/Export)</h1>
            <p>To organize and to separate out different aread of our code so it's easier to locate different components.</p>
            <p>Suppose DIR looks like this:</p>
            <pre><code>
{`/my-project
├── /utils
|   ├── math.ts
|   └── helpers.ts
└── app.ts
`}
            </code></pre>
            <hr className="--hr-faded" />
            
            <div>
                <h2>Basic Importing and Exporting</h2>
                <p>Exporting from <code>/my-project/utils/math.ts</code> file:</p>
                <pre><code>
{`</> TypeScript
export function add(x: number, y: number) {
    return x + y
}

export function sub(x: number, y: number) {
    return x - y
}
`}
                </code></pre>
                
                <p>Importing to <code>/my-project/app.ts</code> file</p>
                <pre><code>
{`</> TypeScript
import { add, sub } from "./utils/math.ts"

const total: number = add(9, 10)
const diff: number = sub(69, 3)
`}
                </code></pre>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2>Deafult Export</h2>
                <p>Allows to import the value using any name, providing flexibility and simplying the import process for the module's main content.</p>
                <p>Only one export per file/module.</p>
                <p><strong>Exporting</strong> from <code>/my-project/utils/helpers.ts</code> file:</p>
                <pre><code>
{`</> TypeScipt
export default function capsEveryWord(
    str: string, 
    sep: string=" ", 
    inBetween: string=" "
): string {
    const splitted = str.split(sep)

    return splitted.reduce((acc: string[], s) => {
        acc.push(s.charAt(0).toUpperCase() + s.slice(1))
        return acc
    }, []).join(inBetween)
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
`}
                </code></pre>

                <p>Importing to <code>/my-project/app.ts</code> file</p>
                <pre><code>
{`</> TypeScript
import capsEveryWord, { capitalize } from "./utils/helpers.ts"

const vegetable: string = capitalize('cabbage')
const fullName: string = capsEveryWord("juan dela cruz")
const address: string = capsEveryWord(
    'manila philippines', 
    ' ', 
    ', '
)

console.log(vegetable)
console.log(fullName)
console.log(address)
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`Cabbage
Juan Dela Cruz
Manila, Philippines`}
                </code></pre>
            </div>
        </div>
    )
}