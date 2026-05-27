
export default function Ts8AdvancedFunctionTypes() {
    return (
        <div>
            <h1>Advanced Function Types</h1>

            <div>
                <h2>Rest Parameters</h2>
                <pre><code>
{`</> TypeScript
function sum(...numbers: number[]) {
    return numbers.reduce((acc, num) => {
        acc += num
        return acc
    },)
}

function sumStat(name: string, ...numbers: number[]) {
    const total: number = numbers.reduce((acc, num) => {
        acc += num
        return acc
    },)
    return ${"`${name}: ${total}`"}
}

const total = sum(...[1, 2, 3, 4, 5])
const stat = sumStat("Total", ...[1, 2, 3, 4, 5])

console.log(typeof total, total)
console.log(typeof stat, stat)
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`number 15
string Total: 15`}
                </code></pre>
            </div>

            <div>
                <h2>Overload Function</h2>
                <p>Excells when <strong>function accepts different param types and returns different types</strong> as well.</p>
                <pre><code>
{`</> TypeScript
function getItem(id: string): number;
function getItem(id: number): number;
function getItem(id: (string | number)[]): {}[];
function getItem(id: unknown): unknown {
    const argType = typeof id
    const db: Record<string | number, number> = {
        1: 2, 
        2: 5, 
        3: 8, 
        a: 10, 
        b: 2, 
        c:9
    }

    if (argType === 'string' || argType === 'number') {
        return db[id as string | number]
    } 
    else if (Array.isArray(id)) {
        return id.reduce((acc, id) => {
            acc.push({id: id, data: db[id]})
            return acc
        }, [])
    }
    return null
}

console.log("ID a:", getItem('a'))
console.log("ID 3:", getItem(3))
console.log("ID [1, 2, b, c]:", getItem([1, 2, "b", "c"]))
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`ID a = 10
ID 3 = 8
ID [1, 2, b, c] = [
  { id: 1, data: 2 },
  { id: 2, data: 5 },
  { id: 'b', data: 2 },
  { id: 'c', data: 9 }
]`}
                </code></pre>
            </div>
        </div>
    )
}