
export default function Ts12StaticAttribAndMethods() {
    return (
        <div>
            <h1>Static Attributes & Methods</h1>
            <p><strong>Static Keyword</strong></p>
            <ul>
                <li>A non-access modifier used for methods and attributes.</li>
                <li>Variables and methods that are associated with the class rather than with each instance of the class.</li>
            </ul>
            <pre><code>
{`</> TypeScript
class Dog {
    static instanceCount: number = 0;
    name: string;

    constructor(name: string) {
        Dog.instanceCount++
        this.name = name
    }

    static decreaseCount() { this.instanceCount-- }
}

function exeDog() {
    const dog1: Dog = new Dog('Juan')
    console.log("Count:", Dog.instanceCount)

    const dog2: Dog = new Dog("John")
    console.log("Count:", Dog.instanceCount)

    Dog.decreaseCount()
    console.log("Count:", Dog.instanceCount)
}

exeDog()
`}
            </code></pre>
            <p>Console Log:</p>
            <pre><code>
{`Count: 1
Count: 2
Count: 1`}
            </code></pre>
        </div>
    )
}