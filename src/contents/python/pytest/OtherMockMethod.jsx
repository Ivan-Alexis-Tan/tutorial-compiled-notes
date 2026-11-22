import SummaryTable, { useSummaryTable } from "../../../components/SummaryTable";

export default function OtherMockMethod() {
    const { tableStates } = useSummaryTable({
        colnames: ["Method", "Purpose"],
        mappedData: mappedMockMethod
    })
    return (
        <div>
            <h2>Other Mock Methods</h2>

            <SummaryTable 
                tableStates={tableStates}
                className={`[&_table]:w-full [&_table]:min-w-0`}
            />
        </div>
    )
}

const OtherMockContainer = ({ children }) => {
    return <div className="[&>div]:mb-5 [&>p]:mb-5">{children}</div>
}

const MagicMockGuide = () => {
    return (
        <OtherMockContainer>
            <h2><code>mocker.MagicMock()</code></h2>
            <p>Mock objects with special Python behavior.</p>

            <div>
                <p className="font-bold">Example:</p>
                <pre><code>
{`mock_list = mocker.MagicMock()

mock_list.__len__.return_value = 3

assert len(mock_list) == 3
`}
                </code></pre>
                <p>Unlike an ordinary <code>Mock</code>, <code>MagicMock</code> automatically supports Python's magic methods, such as <code>__len__</code>, <code>__iter__</code>, and <code>__getitem__</code>.</p>
                <p>Useful when mocking objects that behave like lists, dictionaries, files or other Python objects.</p>
            </div>
        </OtherMockContainer>
    )
}

const PatchObjectGuide = () => {
    return (
        <OtherMockContainer>
            <h2><code>mocker.patch.object()</code></h2>
            <p>Replace an attribute of an existing object.</p>

            <div>
                <p className="font-bold">Example:</p>
                <pre><code>
{`class Database:
    def connect(self):
        return "Connected"

mocker.patch.object(Database, "connect", return_value="Mock connection")

db = Database()
assert db.connect() == "Mock connection"
`}
                </code></pre>
                <p>Unlike <code>patch()</code> with a string path, <code>patch.object()</code> receives the actual object and the attribute name separately.</p>
            </div>
        </OtherMockContainer>
    )
}

const PatchDictGuide = () => {
    return (
        <OtherMockContainer>
            <h2><code>mocker.patch.dict()</code></h2>
            <p>Mock dictionary contents.</p>

            <div>
                <p className="font-bold">Example:</p>
                <pre><code>
{`mocker.patch.dict(
    "os.environ",
    {"API_KEY": "fake-key"}
)
`}
                </code></pre>
                <p>This temporarily inserts or replaces dictionary entries. Common uses include environment variables, configuration dictionaries, and settings.</p>
            </div>
        </OtherMockContainer>
    )
}

const SpyGuide = () => {
    return (
        <OtherMockContainer>
            <h2><code>mocker.spy()</code></h2>
            <p>Observe a real function without replacing its behavior</p>

            <pre><code>
{`class Calculator:
    def add(self, a, b):
        return a + b

calculator = Calculator()

spy = mocker.spy(calculator, "add")

result = calculator.add(2, 3)

assert result == 5
spy.assert_called_once_with(2, 3)
`}
            </code></pre>
            <p>The real <code>add()</code> still executes and returns <code>5</code>. The spy records how it was called, allowing the test to inspect its usage.</p>
        </OtherMockContainer>
    )
}

const SideEffectGuide = () => {
    return (
        <OtherMockContainer>
            <h2><code>side_effect</code></h2>
            <p>Simulate different results or failures.</p>

            <div>
                <p className="font-bold">Example:</p>
                <p>Return different results for consecutive calls:</p>
                <pre><code>
{`mock_get = mocker.patch("service.requests.get")

mock_get.side_effect = [
    response_200,
    response_404,
    TimeoutError("Timed out")
]
`}
                </code></pre>
                <p>Each successive call returns the next value or raises the specified exception.</p>
            </div>

            <div>
                <p className="font-bold">You can also use a function:</p>
                <pre><code>
{`def fake_get(url):
    if "users" in url:
        return user_response
    raise ValueError("Unexpected URL")

mock_get.side_effect = fake_get
`}
                </code></pre>
                <p>Useful for simulating retries, errors, different responses, or conditional behavior.</p>
            </div>
        </OtherMockContainer>
    )
}

function mapMockMethod(name, comp, desc) {
    return { name, comp, desc }
}

const mappedMockMethod = {
    1: mapMockMethod(
        <code>mocker.MagicMock()</code>, 
        <MagicMockGuide />, 
        <>Create a mock with magic methods such as <code>__len__</code>, <code>__iter__</code>, and <code>__getitem__</code></>
    ),
    2: mapMockMethod(<code>mocker.patch.object()</code>, <PatchObjectGuide />, "Replace a specific attribute of an object or class"),
    3: mapMockMethod(<code>mocker.patch.dict()</code>, <PatchDictGuide />, "Temporarily modify a dictionary, commonly environment variables or settings"),
    4: mapMockMethod(<code>mocker.spy()</code>, <SpyGuide />, "Observe calls to an existing method while allowing its original implementation to execute."),
    5: mapMockMethod(<code>side_effect</code>, <SideEffectGuide />, "Configuration a mock to raise exceptions, return different values on successive calls, or execute a custom function")
}