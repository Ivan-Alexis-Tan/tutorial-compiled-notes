export default function Ts13Generics() {
    return (
        <div>
            <h1>Generics</h1>
            <p>Allows to have <strong>more flexible</strong> functions, methods, classes, etc. that can accept any different data types.</p>
            
            <div>
                <p><strong>Example 1</strong></p>
                <pre><code>
{`</> TypeScript
class DataStore<T> {
    private items: T[] = [];

    addItem(item: T): void { this.items.push(item) }
    
    getItem(index: number): T {
        return this.items[index]
    }
    
    removeItem(index: number): void { this.items.splice(index, 1)}

    getAllItems(): T[] {
        return this.items
    }
}

interface User {
    id: number
    name: string
}

const strData = new DataStore<string>()
const intData = new DataStore<number>()
const userData = new DataStore<User>()

strData.addItem('juan')
intData.addItem(12)
userData.addItem({id: 12, name: "Juan"})

console.log("srtData =", strData.getAllItems())
console.log("intData =", intData.getAllItems())
console.log("userData =", userData.getAllItems())
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`srtData = [ 'juan' ]
intData = [ 12 ]
userData = [ { id: 12, name: 'Juan' } ]`}
                </code></pre>
            </div>

            <div>
                <p><strong>Example 2</strong></p>
                <pre><code>
{`</> TypeScript
function getValue<K, V>(key: K, value1: V, value2: V): V {
    if (key) {
        return value1
    }
    return value2
}

const n1: number = 1;
const n2: number = 2;
const l1 = 1;
const l2 = 2;

getValue("case1", 1, 2)
getValue("case2", l1, l2)
getValue("case3", n1, n2)
getValue<string, number>("case4", 1, 2)
`}
                </code></pre>
                <p>The <strong>function descriptions</strong> when hovered to:</p>
                <ul>
                    <li><code>"case1"</code> and <code>"case2"</code></li>
                    <pre><code>{"function getValue<string, 1 | 2>(key: string, value1: 1 | 2, value2: 1 | 2): 1 | 2"}</code></pre>
                    <p>Params data types become literals instead <code>number</code>.</p>
                    <p>Not good for type hinting.</p>

                    <li><code>"case3"</code> and <code>"case4"</code></li>
                    <pre><code>{"function getValue<string, number>(key: string, value1: number, value2: number): number"}</code></pre>
                </ul>
            </div>
        </div>
    )
}