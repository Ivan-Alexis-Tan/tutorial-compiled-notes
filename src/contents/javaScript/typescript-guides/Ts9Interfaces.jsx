
export default function Ts9Interfaces() {
    return (
        <div>
            <h1>Interfaces</h1>
            <p>A blueprint that describes the shape of an object — what properties it has and what types they are (a class).</p>
            <p>Allows to interact with more complex objects and understand what properties they have.</p>
            <p>Used when you want to type in object that has different properties.</p>
            <pre><code>
{`</> TypeScript
interface Person {
    name: string;
    age: number;
    height?: number;
    hello: () => void;
}

const person: Person = {
    name: "Juan",
    age: 23,
    hello: function () {
        console.log(this.name + " greets you hi.")
    }
}

person.hello()
`}
            </code></pre>
            <p>Console Log:</p>
            <pre><code>{`Juan greets you hi.`}</code></pre>

            <h2>Extends and Inheritance</h2>
            <pre><code>
{`</> TypeScript
interface Person {
    name: string;
    age: number;
    height?: number;
}

// Must define attributes from ${"`Person`"}
interface Employee extends Person {
    employeeId: number;
}

interface Manager extends Person, Employee {
    employees: Person[]
}

// Workers
const workerJuan: Employee = {
    name: "Juan",
    age: 23,
    employeeId: 67,
}

const workerJohn: Employee = {
    name: "John",
    age: 25,
    employeeId: 69,
}

// Manager
const manager: Manager = {
    employeeId: 23,
    name: "Taro",
    age: 45,
    employees: [workerJohn, workerJuan]
}

console.log(manager.employees)
`}
            </code></pre>
            <p>Console Log:</p>
            <pre><code>
{`[
  { name: 'John', age: 23, employeeId: 69 },
  { name: 'Juan', age: 23, employeeId: 67 }
]`}
            </code></pre>

            <h2>Function Type Hintings</h2>
            <pre><code>
{`</> TypeScript
function getEmployee(id: number): Employee | undefined {
    return manager.employees.find(employee => employee.employeeId == id)
}

// Instead of full params like:
// function createEmployee(name: string, age: number, employeeId: number): Employee {
//     return { name, age, employeeId }
// }

function createEmployee(employeeDetails: Employee): Employee {
    return employeeDetails
}

const workerKaren: Employee = createEmployee({
    employeeId: 100,
    name: "Karen",
    age: 69,
})

console.log("Searched =", getEmployee(67))
console.log("New Worker =", workerKaren)
`}
            </code></pre>
            <p>Console Log:</p>
            <pre><code>
{`Searched = { employeeId: 67, name: 'Juan', age: 23 }
New Worker = { employeeId: 100, name: 'Karen', age: 69 }`}
            </code></pre>
        </div>
    )
}