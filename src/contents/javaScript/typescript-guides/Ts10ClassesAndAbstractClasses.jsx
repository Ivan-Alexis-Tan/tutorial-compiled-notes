export default function Ts10ClassesAndAbstractClasses() {
    return (
        <div>
            <h1>Classes and Abstract Classes</h1>

            <div>
                <h2>Classes Access Modifier</h2>
                <p><strong>1. Public</strong></p>
                <ul>
                    <li>Default value.</li>
                    <li>Anyone and anywhere can be accessed and mutated.</li>
                </ul>
                <p><strong>2. Private</strong></p>
                <ul>
                    <li>Tells other programmers that this method is <strong>not intended to be accessed</strong> directly.</li>
                    <li>Also <strong>prevent bugs and errors</strong> by ensuring that the internal state of an object <strong>can be changed in controlled ways</strong>.</li>
                </ul>
                <p><strong>3. Protected</strong></p>
                <ul>
                    <li>Specifies access to class members in the member-list up to the next access specifier (public or private) or the end of the class definition.</li>
                </ul>
                <p><strong>NOTE</strong>: if not public &rarr; protect, if not protected &rarr; private it.</p>

                <p>Example:</p>
                <pre><code>
{`</> TypeScript
class Person {
    name: string
    private age: number;
    protected job: string;

    constructor(name: string, age: number, job: string) {
        this.name = name;
        this.age = age;
        this.job = job;
    }

    greet() {
        console.log(${"`${this.name}: Hello.`"})
    }

    getAge() {
        return this.age
    }

    getJob() {
        return this.job
    }

    setAge(newJob: number) {
        this.age = newJob
    }
}

class Employment extends Person {
    employeeId: number

    constructor(employeeId: number, name: string, age: number, job: string) {
        super(name, age, job)
        this.employeeId = employeeId;
    }

    getJob() {
        return this.job
    }
}

const test: Employment = new Employment(101, "Juan", 42, 'dev')

// Console Logs
test.greet()
console.log("Age =", test.getAge())
console.log("Job =", test.getJob())
test.setAge(18)
console.log("New age =", test.getAge())
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`Juan: Hello.
Age = 42
Job = dev
New age = 18`}
                </code></pre>
            </div>

            <div>
                <h2>Abstract Classes</h2>
                <p>A restricted class that cannot be used to create objects and designed to be specifically <strong>used as a base class</strong>.</p>
                
                <p><strong>Example 1</strong></p>
                <pre><code>
{`</> TypeScript
abstract class Animal {
    abstract makeSound(duration: number): void;

    move(duration: number) {
        console.log("Moving along...")
        this.makeSound(duration)
    }
}

class Dog extends Animal {
    makeSound(duration: number): void {
        console.log(${"`Woof woof (${duration}x)`"})
    }
}

class Cat extends Animal {
    makeSound(duration: number): void {
        console.log(${"`Meow meow (${duration}x)`"})
    }
}

// Object Creation
const dog: Dog = new Dog()
const cat: Cat = new Cat()

// Console Log
console.log("- Dog moving:")
dog.move(10)

console.log("- Cat make sound:")
cat.makeSound(10)

console.log("- Cat moving:")
cat.move(10)
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`- Dog moving:
Moving along...
Woof woof (10x)

- Cat make sound:
Meow meow (10x)

- Cat moving:
Moving along...
Meow meow (10x)`}
                </code></pre>

                <p><strong>Example 2</strong></p>
                <pre><code>
{`</> TypeScript
abstract class Appliance {
    brand: string
    isOn: boolean = false

    constructor(brand: string) {
        this.brand = brand
    }

    turnOn(): void {
        this.isOn = true
    }

    turnOff(): void {
        this.isOn = false
    }

    abstract getEnergyUsage(): number;
    abstract getDetails(): string;
}

class WashingMachine extends Appliance {
    loadCapacityKg: number

    constructor(brand: string, loadCapacityKg: number) {
        super(brand)
        this.loadCapacityKg = loadCapacityKg
    }

    getEnergyUsage(): number {
        return this.loadCapacityKg * 0.5
    }

    getDetails(): string {
        return ${"`${this.brand} Washing Machine (Capacity: ${this.loadCapacityKg}kg)`"}
    }
}

class Refrigerator extends Appliance {
    volumeLiters: number

    constructor(brand: string, volumeLiters: number) {
        super(brand)
        this.volumeLiters = volumeLiters
    }

    getEnergyUsage(): number {
        return this.volumeLiters * 0.1
    }

    getDetails(): string {
        return ${"`${this.brand} Refrigerator (Volume: ${this.volumeLiters}L)`"}
    }
}

function exeAbstractClasses() {
    const ref: Refrigerator = new Refrigerator('Panasonic', 500)
    const washMachine: WashingMachine = new WashingMachine('Hanabishi', 50)

    console.log('- Refrigerator:')
    console.log(ref.getDetails())
    console.log("Energy Usage:", ref.getEnergyUsage())

    console.log('- Washing Machine:')
    console.log(washMachine.getDetails())
    console.log("Energy Usage:", washMachine.getEnergyUsage())
}

exeAbstractClasses()
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`- Refrigerator:
Panasonic Refrigerator (Volume: 500L)
Energy Usage: 50

- Washing Machine:
Hanabishi Washing Machine (Capacity: 50kg)
Energy Usage: 25`}
                </code></pre>
            </div>
        </div>
    )
}