import GuideContentContainer from "../../../components/GuideContentContainer";

export default function C4PytestParameterizedTesting() {
    const rootDir = "C:\\Users\\Acer\\Documents\\root-project"
    const cliCommand = `(root-project) ${rootDir}>uv run pytest test_parameterized.py`

    return (
        <GuideContentContainer>
            <h1>Parameterized Testing</h1>
            <ul>
                <li>With the use of <code>@pytest.mark.parametrize()</code> decorator.</li>
                <li>Allows to specify what and to programmatically pass values to the parameters of the test case.</li>
                <li>It allows to iterate a list of values that contains input (and even outputs) to pass on parameters.</li>
                <li>To make passing parameters dynamic and less repetitive.</li>
            </ul>

            <hr />

            <div className="[&>div]:mb-5">
                <h2>Example Usage:</h2>
                <p>Supposed the directory:</p>
                <pre><code>
{`/root-project
├── parameterized.py
└── test_parameterized.py
`}
                </code></pre>

                <p>In <code>parameterized.py</code>:</p>
                <pre><code>
{`def is_prime(n: int) -> bool:
    if n < 2:
        return False

    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False

    return True
`}
                </code></pre>

                <p>In <code>test_parameterized.py</code>:</p>
                <pre><code>
{`from parameterized import is_prime
import pytest

@pytest.mark.parametrize("num, expected", [
    (1, False),
    (2, True),
    (3, True),
    (4, False),
    (17, True),
    (18, False),
    (19, True),
    (25, False),
])
def test_is_prime(num: int, expected: bool):
    assert is_prime(num) == expected
`}
                </code></pre>

                <div>
                    <p><code>"num"</code> is the variable for the 0th index of the tuple</p>
                    <p className="mb-2"><code>"expected"</code> is the variable for the 1st index of the tuple</p>

                    <p>Thus,</p>
                    <div className="ml-3">
                        {[[1, "False"], [2, "True"], [3, "True"]].map(([num, expected]) => (
                                <>
                                    <p>In <code>({num}, {expected})</code>:</p>
                                    <ul>
                                        <li><code>num</code> = <code>{num}</code></li>
                                        <li><code>expected</code> = <code>{expected}</code></li>
                                    </ul>
                                </>
                            ))
                        }

                        <p>And so on...</p>
                    </div>

                    <p>Creating an something similar to <code>for num, expected in [(1,  False), (2, False), ...]</code></p>
                    <p>Then assert test will run as many times as the length of the list.</p>
                </div>

                <div>
                    <p>If you run the test, terminal will print:</p>
                    <pre><code>
{`${cliCommand}
========== test session starts ==================================================================
platform win32 -- Python 3.12.7, pytest-9.2.0, pluggy-1.7.0
rootdir: ${rootDir}
configfile: pyproject.toml
plugins: mock-3.17.0
collected 8 items

test_parameterized.py ........                                                  [100%]

========== 8 passed in 0.09s ===================================================================
`}
                    </code></pre>
                </div>
            </div>
        </GuideContentContainer>
    )
}