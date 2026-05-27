export default function Ts15TypeGuard() {
    return (
        <div>
            <h1>Type Guard</h1>
            <ul>
                <li>A way of checking the type of value at runtime and narrowing its type in a conditional block.</li>
            </ul>

            <p><strong>Keywords</strong> can be used for type checking:</p>
            <ul>
                <li><code>typeof</code></li>
                <li><code>instanceof</code></li>
                <li><code>in</code></li>
                <li><code>is</code></li>
            </ul>

            <div>
                <p><strong>Example of <code>typeof</code>:</strong></p>
                <pre><code>
{`</> TypeScript
type StringOrNumber = string | number

function increment(value: StringOrNumber): StringOrNumber {
    if (typeof value === 'string') return value + "1"
    return value + 1
}
`}
                </code></pre>

                <p><strong>Example of <code>instanceof</code>:</strong></p>
                <pre><code>
{`</> TypeScript
class Dog {
    firstName: string
    lastName: string

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
    }
}

class Cat {
    firstName: string;

    constructor(firstName: string) {
        this.firstName = firstName
    }
}

function getName(animal: Cat | Dog): string {
    if (animal instanceof Cat) return animal.firstName
    return ${"`${animal.firstName} ${animal.lastName}`"}
}
`}
                </code></pre>

                <p><strong>Example of <code>in</code>:</strong></p>
                <pre><code>
{`</> TypeScript
class Dog {
    firstName: string
    lastName: string

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
    }
}

class Cat {
    firstName: string;

    constructor(firstName: string) {
        this.firstName = firstName
    }
}

function getName(animal: Cat | Dog): string {
    if ("lastName" in animal) return ${"`${animal.firstName} ${animal.lastName}`"}
    return animal.firstName
}
`}
                </code></pre>

                <p><strong>Example of <code>is</code>:</strong></p>
                <pre><code>
{`</> TypeScript
class Dog {
    firstName: string
    lastName: string

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
    }
}

class Cat {
    firstName: string;

    constructor(firstName: string) {
        this.firstName = firstName
    }
}

function isDog(pet: Dog | Cat): pet is Dog {
    return pet instanceof Dog
}

function getName(animal: Cat | Dog): string {
    if (isDog(animal)) {
        return ${"`${animal.firstName} ${animal.lastName}`"}
    }
    return animal.firstName
}

const dog = new Dog('Juan', "Dela Cruz")
const cat = new Cat("John")

console.log("dog =", isDog(dog))
console.log("cat =", isDog(cat))
console.log(getName(dog))
console.log(getName(cat))
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`dog = true
cat = false
Juan Dela Cruz
John`}
                </code></pre>
            </div>
        </div>
    )
}