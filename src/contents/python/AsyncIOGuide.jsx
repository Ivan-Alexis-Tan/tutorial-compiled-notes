import { useParams, Link } from "react-router-dom"

const currLoc = '/home/python/asyncio/asyncioguide'

export default function AsyncIOGuide() {
    const { id } = useParams();
    const currId = Number(id)
    
    switch (currId) {
        case 1:
            return <AsyncIOIntroduction />
        case 2:
            return <Coroutines />
        case 3:
            return <Tasks />
        case 4:
            return <GatherFunction />
        case 5:
            return <TaskGroupFunc />
        case 6:
            return <Futures />
        case 7:
            return <Synchronization />
        default:
            break;
    }
}

function AsyncIOIntroduction() {
    return (
        <div>
            <h1>When To Use AsyncIO</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Something</th>
                            <th>When to use</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>AsyncIO</th>
                            <td>For managing many waiting tasks.</td>
                        </tr>
                        <tr>
                            <th>Processes</th>
                            <td>For maximizing performance on CPU intensive tasks.</td>
                        </tr>
                        <tr>
                            <th>Threads</th>
                            <td>For Parallel tasks that share data with manimal CPU use.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h2>The Event Loop</h2>
            </div>
        </div>
    )
}

function Coroutines() {
    return (
        <div>
            <h1>Coroutines</h1>

            <div>
                <pre><code>
{`import asyncio              # -> Built-in python lib

# Coroutine Function:
async def main():
    print("Start of main coroutine")


# Run the main Coroutine:
asyncio.run(main())
`}    
                </code></pre>
                <p><code>main()</code> <strong>returns</strong> a <code>coroutine object</code></p>
                <p><code>async.run()</code> starts the event loop and runs asynchronous code.</p>
            </div>

            <div>
                <h2>Usage Example:</h2>
                <pre><code>
{`import asyncio

# Define a coroutine that simulates a time-consuming task
async def fetch_data(delay: int) -> dict:
    print("Fetching data...")
    await asyncio.sleep(delay)             #-> Simulate an I/O operation delay with ".sleep()"

    print("Data fetched")
    return {"data": "Some data"}            #-> Return some data


# Define another coroutine that calls the first coroutine
async def main():
    print("Start of main coroutine")
    task = fetch_data(2)

    # Await the fetch_data() coroutine, pausing execution of main until fectch_data() completes
    result = await task

    print(f"Received result: {result}")
    print("End of main coroutine")


# Run the main coroutine
asyncio.run(main())

`}    
                </code></pre>

                <p>Terminal Output:</p>
                <pre><code>
{`Start of main coroutine
Fetching data...
Data fetched
Received result: {'data': 'Some data'}
End of main coroutine
`}    
                </code></pre>
            </div>

            <div>
                <h2>Usage Example 2:</h2>
                <pre><code>
{`
import asyncio

# Define a coroutine that simulates a time-consuming task
async def fetch_data(delay:int, id:int) -> dict:
    print(f"Fetching data... id: {id}")
    await asyncio.sleep(delay)                      #-> Simulate an I/O operation delay with ".sleep()"

    print(f"Data fetched, id: {id}")
    return {"data": "Some data", 'id': id}          #-> Return some data


# Define another coroutine that calls the first coroutine
async def main():
    print("Start of main coroutine")
    task1 = fetch_data(delay=2, id=1)
    task2 = fetch_data(2, 2)

    result1 = await task1
    print(f"Received result: {result1}")
    print('-=-=-=-=-=-=-=-=-=-=-=-=-=-')

    result2 = await task2
    print(f"Received result: {result2}")
    print("End of main coroutine")


# Run the main coroutine
asyncio.run(main())
`}
                </code></pre>

                <p>Terminal Output:</p>
                <pre><code>
{`Start of main coroutine
Fetching data... id: 1
Data fetched, id: 1
Received result: {'data': 'Some data', 'id': 1}
-=-=-=-=-=-=-=-=-=-=-=-=-=-
Fetching data... id: 2
Data fetched, id: 2
Received result: {'data': 'Some data', 'id': 2}
End of main coroutine
`}
                </code></pre>
                <p>The coroutine doesn't started until get <code>await</code>.</p>
                <p>It runs the first coroutine, then the next coroutine; rather than executing <code>task1</code> and <code>task2</code> concurrently within 2 sec in total.</p>
                <pre><code>
{`task1 - - >| task2 - - >|`}
                </code></pre>
                
                <p><code>task2</code> got only executed after <code>task1</code> is finished.</p>
                <h3>If wanna run these two tasks concurrently, use <i><Link to={`${currLoc}/3`}>Task</Link></i> instead.</h3>
            </div>
        </div>
    )
}

function Tasks() {
    return (
        <div>
            <h1>Tasks</h1>
            <div>
                <ul>
                    <li>Schedules coroutine to <strong>run as soon as possible</strong>.</li>
                    <li>Also <strong>allows to run multiple coroutines simultaneously</strong>.</li>
                    <li>Solves the issue of simple coroutine codes.</li>
                    <ul><li>Only runs a coroutine when the previous coroutine is finished.</li></ul>
                </ul>
            </div>

            <div>
                <h2>Usage Example:</h2>
                <pre><code>
{`import asyncio

async def fetch_data(id:int, sleep_time:int) -> dict:
    print(f"Fetching coroutine {id}")
    await asyncio.sleep(sleep_time)             

    return {'id': id, "data": f"Some data from coroutine {id}"}            


async def main():
    # Create tasks for running coroutines concurrently
    print("Start of main coroutine")
    task1 = asyncio.create_task(fetch_data(id=1, sleep_time=2))
    task2 = asyncio.create_task(fetch_data(id=2, sleep_time=3))
    task3 = asyncio.create_task(fetch_data(id=3, sleep_time=1))

    result1 = await task1
    result2 = await task2
    result3 = await task3

    for result in (result1, result2, result3):
        print(result)

    print("End of main coroutine")


# Run the main coroutine
asyncio.run(main())
`}    
                </code></pre>

                <p>Terminal Output:</p>
                <pre><code>
{`Start of main coroutine
Fetching coroutine 1
Fetching coroutine 2
Fetching coroutine 3
{'id': 1, 'data': 'Some data from coroutine 1'}
{'id': 2, 'data': 'Some data from coroutine 2'}
{'id': 3, 'data': 'Some data from coroutine 3'}
End of main coroutine
`}    
                </code></pre>
                <p>Instead of waiting for <code>task1</code> and <code>task2</code> to run <code>task3</code>, they run simultaneously.</p>
                <p>Time it takes to run the coroutines in <strong>total of 3 seconds</strong>, instead of 6 seconds.</p>
                <p>✅ Runs like:</p>
                <pre><code>
{`task1 - - >|            2 seconds to finish
task2 - - - >|          3 seconds to finish
task3 - >|              1 second to finish
`}
                </code></pre>
                <p>❌ Not:</p>
                <pre><code>
{`task1 - - >| task2 - - - >| task3 - >|    6 seconds to finish`}
                </code></pre>
            </div>

            <div>
                <h2>Usage Example 2:</h2>
                <pre><code>
{`async def main():
    # Create tasks for running coroutines concurrently
    print("Start of main coroutine")
    task1 = asyncio.create_task(fetch_data(id=1, sleep_time=2))
    task2 = asyncio.create_task(fetch_data(id=2, sleep_time=3))
    
    result1 = await task1
    result2 = await task2

    task3 = asyncio.create_task(fetch_data(id=3, sleep_time=1))
    result3 = await task3

    for result in (result1, result2, result3):
        print(result)

    print("End of main coroutine")


# Run the main coroutine
asyncio.run(main())
`}
                </code></pre>

                <p>Terminal Output:</p>
                <pre><code>
{`Start of main coroutine
Fetching coroutine 1                            <- Immediately shown in terminal
Fetching coroutine 2                            <- Immediately shown in terminal
Fetching coroutine 3                            <- Took 3 seconds before shown in terminal
{'id': 1, 'data': 'Some data from coroutine 1'}
{'id': 2, 'data': 'Some data from coroutine 2'}
{'id': 3, 'data': 'Some data from coroutine 3'}
`}    
                </code></pre>
                <p>What happened in terminal</p>
                <ul>
                    <li><code>task1</code> and <code>task2</code> were immediately shown in terminal.</li>
                    <li><code>task3</code> took 3 seconds to be shown in terminal.</li>
                    <li>Then took another 1 second for the result objects to show.</li>
                </ul>
                <p>Why?</p>
                <ul>
                    <li>The <code>await</code> of <code>task1</code> and <code>task2</code> is written above <code>task3</code></li>
                    <li><code>task3</code> is scheduled to run after the <code>await</code> results of <code>task1</code> and <code>task2</code> get executed.</li>
                    <li>This helps to <strong>control the coroutines' flow</strong> accordingly to their schedule.</li>
                </ul>
            </div>
        </div>
    )
}

function GatherFunction() {
    return (
        <div>
            <h1>Gather Function</h1>
            <div>
                <ul>
                    <li>A <strong>quick way to concurrently run multiple coroutines</strong>.</li>
                    <li>Uses <code>asyncio.gather()</code> and automatically runs coroutines concurrently and <strong>collect results in a list</strong>.</li>
                    <ul><li>This simplifies the creation of a task for each single coroutines.</li></ul>

                    <li>Pass multiple args coroutines in <code>asyncio.gather()</code></li>
                    <li>Although convenient, it's <strong>not great in error handling</strong>.</li>
                    <ul><li>It does not cancel automatically if one coroutines have an error.</li></ul>
                </ul>
            </div>

            <div>
                <h3>Usage Example:</h3>
                <pre><code>
{`import asyncio

async def fetch_data(id:int, sleep_time:int) -> dict:
    print(f"Coroutine {id} starting to fetch data.")
    await asyncio.sleep(sleep_time)

    return {'id': id, 'data': f'data from coroutine {id}'}


async def main() -> None:
    # Run coroutines concurrently and gather their return values
    results = await asyncio.gather(             #<- "asyncio.gather()" still needs await
        fetch_data(id=1, sleep_time=2),
        fetch_data(id=2, sleep_time=1),
        fetch_data(id=3, sleep_time=3),
    )

    for result in results:
        print(result)


asyncio.run(main())
`}    
                </code></pre>

                <p>Terminal Output:</p>
                <pre><code>
{`Coroutine 1 starting to fetch data.
Coroutine 2 starting to fetch data.
Coroutine 3 starting to fetch data.
{'id': 1, 'data': 'data from coroutine 1'}
{'id': 2, 'data': 'data from coroutine 2'}
{'id': 3, 'data': 'data from coroutine 3'}
`}    
                </code></pre>
                <p>If one of the <code>fetch_data()</code> fails, <code>.gather()</code> does not handle that well; resulting to weird results.</p>
                <p><Link to={`${currLoc}/5`}><code>asyncio.TaskGroup()</code></Link> is preferred over than <code>.gather()</code></p>
            </div>
        </div>
    )
}

function TaskGroupFunc() {
    return (
        <div>
            <h1><code>asyncio.TaskGroup()</code> Function</h1>
            <div>
                <ul>
                    <li>Also execute multiple coroutines then organizes them together.</li>
                    <li><strong>Provides built-in error handling</strong>.</li>
                    <ul><li>Automatically cancels all coroutines if at least one of them fails.</li></ul>

                    <li><strong>Slightly more preferred</strong> way than <code>asyncio.gather()</code>.</li>
                </ul>
            </div>

            <div>
                <h2>Usage Example:</h2>
                <p>Context manager scripting.</p>
                <pre><code>
{`import asyncio

async def fetch_data(id:int, sleep_time:int) -> dict:
    print(f"Coroutine {id} starting to fetch data.")
    await asyncio.sleep(sleep_time)

    return {'id': id, 'data': f'data from coroutine {id}'}


async def main() -> None:
    tasks = []
    async with asyncio.TaskGroup() as tg:
        for i, sleep_time in enumerate([2, 1, 3], start=1):
            task = tg.create_task(fetch_data(id=i, sleep_time=sleep_time))
            tasks.append(task)

    # After the Task Group block, all tasks have completed
    results = [task.result() for task in tasks]

    for result in results:
        print(result)


asyncio.run(main())
`}    
                </code></pre>

                <p>Terminal Output:</p>
                <pre><code>
{`Coroutine 1 starting to fetch data.
Coroutine 2 starting to fetch data.
Coroutine 3 starting to fetch data.
{'id': 1, 'data': 'data from coroutine 1'}
{'id': 2, 'data': 'data from coroutine 2'}
{'id': 3, 'data': 'data from coroutine 3'}
`}
                </code></pre>
                <p>Context manager doesn't have <code>await</code> because <strong>coroutines are awaited the moment the event loop exists from context manager</strong>.</p>
            </div>
        </div>
    )
}

function Futures() {
    return (
        <div>
            <h1>Futures</h1>

            <div>
                <h2>Usage Example:</h2>
                <pre><code>
{`import asyncio

async def set_future_result(future, value:any) -> None:
    await asyncio.sleep(2)

    # Set the result of the future
    future.set_result(value)
    print(f"Set the future's result to: {value}")


async def main() -> None:
    loop = asyncio.get_running_loop()
    future = loop.create_future()

    # Schedule setting the future's result
    asyncio.create_task(set_future_result(future=future, value="Future result is ready"))

    # Wait for the future's result
    result = await future
    print(f"Result: {result}")


asyncio.run(main())
`}    
                </code></pre>

                <p>Terminal Output:</p>
                <pre><code>
{`Set the future's result to: Future result is ready
Result: Future result is ready
`}    
                </code></pre>
            </div>
        </div>
        
    )
}

function Synchronization() {
    return (
        <div>
            <h1>Synchronization</h1>
            <div>
                <ul>
                    <li>Tools to synchronize the execution of vaious coroutines (esp. in more complicated or larger programs).</li>
                    <li>There are 3 tools:</li>
                    <ul>
                        <li>Lock</li>
                        <li>Semaphore</li>
                        <li>Event</li>
                    </ul>
                </ul>
            </div>

            <div>
                <h2>A. Lock</h2>
                <div>
                    <ul>
                        <li><strong>Locks the resource to be accessed one at a time</strong>.</li>
                        <li>Effective when there are multiple coroutines that needs access on the same resources.</li>
                    </ul>

                    <pre><code>
{`import asyncio

# A shared variable
shared_resource = 0

# An asyncio Lock
lock = asyncio.Lock()


async def modify_shared_resource() -> None:
    global shared_resource

    async with lock:
        # Critical section starts
        print(f"src before mod: {shared_resource}")
        shared_resource += 1                            #<- Modify the shared resorce

        await asyncio.sleep(1)                          #<- Simulate an IO operation
        print(f'src after mod: {shared_resource}')
        print('-=-=-=-=-=-=-=-=-=-=-=-=-=-')
        # Critical section ends


async def main() -> None:
    await asyncio.gather(*(modify_shared_resource() for _ in range(5)))


asyncio.run(main())
`}    
                    </code></pre>

                    <p>Terminal Output:</p>
                    <pre><code>
{`src before mod: 0                   <- First coroutine that needs access
src after mod: 1
-=-=-=-=-=-=-=-=-=-=-=-=-=-
src before mod: 1                   <- Second coroutine that needs access
src after mod: 2
-=-=-=-=-=-=-=-=-=-=-=-=-=-
src before mod: 2                   <- Third coroutine that needs access
src after mod: 3
-=-=-=-=-=-=-=-=-=-=-=-=-=-
src before mod: 3                   <- Fourth coroutine that needs access
src after mod: 4
-=-=-=-=-=-=-=-=-=-=-=-=-=-
src before mod: 4                   <- Fifth coroutine that needs access
src after mod: 5
-=-=-=-=-=-=-=-=-=-=-=-=-=-
`}
                    </code></pre>
                    <p>What is happening:</p>
                    <ul>
                        <li>There are 5 coroutines that needs access on <code>shared_resource</code></li>
                        <li>But, <code>asyncio.Lock()</code> restrict access on the resource one at a time.</li>
                        <li>Each coroutines forms queue-like execution to access the resource and to do their job with it.</li>
                    </ul>
                </div>
            </div>

            <div>
                <h2>B. Semaphore</h2>
                <div>
                    <ul>
                        <li><strong>Allows multiple coroutines to have access</strong> on the same object at the same time.</li>
                        <li>Although, <strong>number of access threshold can still be defined</strong>; still enforcing limited access on the resource.</li>
                        <li>Prevents overloading of resource and access request</li>
                    </ul>
                </div>

                <div>
                    <pre><code>
{`import asyncio

async def access_resource(semaphore, resource_id:int) -> None:
    async with semaphore:
        # Simulate accessing a limited resource
        print(f'Accessing resource {resource_id}')
        print('---')

        await asyncio.sleep(1)                          # Simulate work with the resource
        print(f"Releasing resource {resource_id}")
        print('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-')


async def main():
    semaphore = asyncio.Semaphore(value=2)              # Allows 2 concurrent accesses
    await asyncio.gather(*(access_resource(semaphore, i) for i in range(1, 6)))


asyncio.run(main())
`}
                    </code></pre>

                    <p>Terminal Output:</p>
                    <pre><code>
{`Accessing resource 1                    <- 1st 2 coroutine access 
---
Accessing resource 2
---
Releasing resource 1                    <- ID 1 release
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Releasing resource 2                    <- ID 2 release
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Accessing resource 3                    <- 2nd 2 coroutine access
---
Accessing resource 4
---
Releasing resource 3                    <- ID 3 release
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Releasing resource 4                    <- ID 4 release
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Accessing resource 5                    <- 3rd 2 coroutine access
---
Releasing resource 5                    <- ID 5 release
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
`}
                    </code></pre>
                    <p>What is happening:</p>
                    <ul>
                        <li>Coroutine ID 1 and 2 are allowed to access the resource</li>
                        <ul>
                            <li>This was due to <code>asyncio.Semaphore(value=2)</code></li>
                            <li>Allows to access the resource with 2 requests at a time.</li>
                        </ul>

                        <li>Semaphore lets the 2 coroutine finish their task before allowing another 2 requests.</li>
                        <li>After coroutine 1 and 2 finishes their task, Semaphore now allows the next 2 requests.</li>
                        <ul><li>These are the coroutine 3 and 4.</li></ul>

                        <li>Lets them finish, then Semaphore allows another 2 request, and the cycle repeats.</li>
                    </ul>
                </div>
            </div>
            
            <div>
                <h2>C. Event</h2>
                <div>
                    <ul>
                        <li>Allows simpler Synchronization.</li>
                        <li>Acts like a boolean flag that waits at certain points in our program.</li>
                    </ul>
                </div>
                
                <div>
                    <pre><code>
{`import asyncio

async def waiter(event) -> None:
    print("Waiting for the even to be set...")
    
    await event.wait()
    print("Event has been set, continuing execution.")


async def setter(event) -> None:
    await asyncio.sleep(2)                      #<- Simulate doing some work
    event.set()
    print("Event has been set!")


async def main() -> None:
    event = asyncio.Event()
    await asyncio.gather(waiter(event), setter(event))


asyncio.run(main())
`}    
                    </code></pre>

                    <p>Terminal Output:</p>
                    <pre><code>
{`Waiting for the even to be set...
Event has been set!
Event has been set, continuing execution.
`}
                    </code></pre>
                </div>
            </div>

        </div>
    )
}