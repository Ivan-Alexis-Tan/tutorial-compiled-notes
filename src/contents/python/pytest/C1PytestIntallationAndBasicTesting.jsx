import GuideContentContainer from "../../../components/GuideContentContainer";

export default function C1PytestIntallationAndBasicTesting() {
    return (
        <GuideContentContainer>
            <h1>Intallation and Basic Testing</h1>

            <h2>Install using terminal</h2>

            <pre><code>
{`pip install pytest`}
            </code></pre>

            <h2>Basic Testing</h2>
            <p>Supposed the directory:</p>
            <pre><code>
{`/root-project
├── main.py
└── test_main.py
`}
            </code></pre>

            <p>In <code>main.py</code>:</p>
            <pre><code>
{`def get_weather(temp: int):
    if temp > 20:
        return "hot"
    else:
        return "cold"
`}
            </code></pre>

            <p>In <code>test_main.py</code>:</p>
            <pre><code>
{`from main import get_weather

def test_get_weather():
    assert get_weather(21) == "hot"
`}
            </code></pre>

            <div className="mb-5">
                <p className="mb-2"><code>assert</code> &rarr; tells us if something is true or false</p>
                <ul>
                    <li><code>true</code> = passed the test</li>
                    <li><code>false</code> = failed the test</li>
                </ul>
                <p>To run the test: <code>pytest test_main.py</code></p>
            </div>

            <p>Terminal will print something like:</p>
            <pre><code>
{`(root-project) C:\\Users\\Acer\\Documents\\root-project>uv run pytest test_main.py

======== test session starts =========================
platform win32 -- Python 3.12.7, pytest-9.2.0, pluggy-1.7.0
rootdir: C:\\Users\\Acer\\Documents\\root-project
configfile: pyproject.toml
plugins: mock-3.17.0
collected 1 item

test_main.py .                                  [100%]

======== 1 passed in 0.06s ============================
`}
            </code></pre>

            <h3>If failed:</h3>
            <p>Let's modify <code>test_main.py</code> to simulate failed test case.</p>
            <pre><code>
{`// test_main.py
from main import get_weather

def test_get_weather():
    assert get_weather(21) == "hot"
    assert get_weather(30) == "cold"
`}
            </code></pre>

            <p>Terminal will print something like:</p>
            <pre><code>
{`(root-project) C:\\Users\\Acer\\Documents\\root-project>uv run pytest test_main.py
========== test session starts ==================================================================
platform win32 -- Python 3.12.7, pytest-9.2.0, pluggy-1.7.0
rootdir: C:\\Users\\Acer\\Documents\\root-project
configfile: pyproject.toml
plugins: mock-3.17.0
collected 1 item

test_main.py F                                                  [100%]

========== FAILURES =======================================================================
__________ test_get_weather ___________________________________________________________________

    def test_get_weather():
        assert get_weather(22) == "hot"
>       assert get_weather(30) == "cold"
E       AssertionError: assert 'hot' == 'cold'
E
E         - cold
E         + hot

test_main.py:5: AssertionError
========== short test summary info ================================================================
FAILED test_main.py::test_get_weather - AssertionError: assert 'hot' == 'cold'
========== 1 failed in 0.17s ===================================================================
`}
            </code></pre>

            <p>It literally points what function failed.</p>
        </GuideContentContainer>
    )
}