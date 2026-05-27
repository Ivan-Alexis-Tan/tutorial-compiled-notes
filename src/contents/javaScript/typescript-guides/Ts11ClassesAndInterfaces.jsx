export default function Ts11ClassesAndInterfaces() {
    return (
        <div>
            <h1>Classes and Interfaces</h1>
            <p>Interface doesn't actually define any functionality or behavior.</p>
            <p>Used when there's no functionality that you want to define concretely.</p>

            <div>
                <h2>Interfaces</h2>
                <p><strong>Example 1</strong></p>
                <pre><code>
{`</> TypeScript
interface Animal {
    speak(): void
}

class Dog implements Animal {
    private name: string;
    private color: string;

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }

    speak(): void {
        console.log(${"`I am ${this.name} and I am ${this.color}.`"})
    }
}

class Cat implements Animal {
    speak(): void {
        console.log("Meow")
    }
}

const dog: Animal = new Dog('Juan', 'brown')
const cat: Cat = new Cat()
const animals: Animal[] = [dog, cat]

console.log("Animals =", animals)
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`Animals = [ 
    Dog { name: 'Juan', color: 'brown' }, 
    Cat {} 
]`}
                </code></pre>

                <p><strong>Example 2</strong></p>
                <pre><code>
{`</> TypeScript
interface Describable {
    describe(): string
}

class Book implements Describable {
    title: string
    author: string
    pages: number

    constructor(title: string, author: string, pages: number) {
        this.title = title
        this.author = author
        this.pages = pages
    }

    describe(): string {
        return ${"`${this.title} by ${this.author}, ${this.pages} pages`"}
    }
}

class Movie implements Describable {
    title: string
    director: string
    durationMinutes: number

    constructor(title: string, director: string, durationMinutes: number) {
        this.title = title
        this.director = director
        this.durationMinutes = durationMinutes
    }

    describe(): string {
        return ${"`${this.title} directed by ${this.director}, ${this.durationMinutes} minutes`"}
    }
}

function exeInterfacePart1() {
    const book: Book = new Book('The Hobbit', 'J.R.R. Tolkien', 310)
    const movie: Movie = new Movie('Inception', 'Christopher Nolan', 148)

    console.log("Book:", book.describe())
    console.log("Movie:", movie.describe())
}

exeInterfacePart1()
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`Book: The Hobbit by J.R.R. Tolkien, 310 pages
Movie: Inception directed by Christopher Nolan, 148 minutes`}
                </code></pre>

                <p><strong>Example 3</strong></p>
                <pre><code>
{`</> TypeScript
interface Serializable {
    serialize(): string
} 

interface Resettable {
    reset(): void
}

class UserSession implements Serializable, Resettable {
    userId: number
    username: string
    loginCount: number = 0

    constructor(userId: number, username: string, loginCount: number) {
        this.userId = userId
        this.username = username
        this.loginCount = loginCount
    }

    login() {
        this.loginCount += 1
    }

    serialize(): string {
        return JSON.stringify({
            userId: this.userId,
            username: this.username,
            loginCount: this.loginCount,
        })
    }

    reset(): void {
        this.loginCount = 0
    }
}

function exeInterfacePart2() {
    const userSession: UserSession = new UserSession(1, 'John', 0)

    for (let i = 0; i < 3; i++) {
        userSession.login()
    }

    console.log("Serial:", userSession.serialize())
}

exeInterfacePart2()
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>{`Serial: {"userId":1,"username":"John","loginCount":3}`}</code></pre>
            </div>
        </div>
    )
}