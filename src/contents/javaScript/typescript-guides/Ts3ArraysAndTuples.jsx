
export default function Ts3ArraysAndTuples() {
    return (
        <div>
            <h1>Arrays and Tuples</h1>
            <div>
                <h2>Arrays</h2>
                <pre><code>
{`</> TypeScript
// Normal Arrays
let numArr: number[] = []
let strArr: string[] = []
let arr: (string | number)[] = []

// Nested Arrays
let nestedArr: string[][] = [['apple'], ['mall']]
let nestAmbArr: (string[] | number[])[] = [['juan'], [1]]
`}
                </code></pre>
                <p>Can't do <code>arr[0] + 1</code> because the array have ambiguous type (either returns <code>string</code> or <code>number</code>).</p>
            </div>

            <div>
                <h2>Tuples</h2>
                <p>A fixed length array that has defined values for each position in the array.</p>
                <pre><code>
{`</> TypeScript
let coord: [number, number] = [1, 2]
let strCoord: [number, string] = [1, '2']
let nested: [number, number[]][] = [
    [1, 2],
    [ [1, 2, 3], ],
]
`}
                </code></pre>
                <p>In <code>{`strCoord[1]`}</code>, IDE automatically detects the type since it is defined on the tuple.</p>
            </div>
        </div>
    )
}