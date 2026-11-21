import GuideContentContainer from "../../../components/GuideContentContainer";

export default function C2PytestUnitTesting() {
    return (
        <GuideContentContainer>
            <h1>Unit Testing</h1>
            
            <div>
                <p>The smallest type of test and it's typically testing one very small component of code.</p>
                <p>Example:</p>
                <ul>
                    <li>function</li>
                    <li>method</li>
                    <li>class</li>
                </ul>
                <p>To ensure to get the expected outcome or result from a small unit of code.</p>
                
                <p>There are other kinds of other test that you can write:</p>
                <ul className="list-decimal!">
                    <li>Integration tests</li>
                    <li>System tests</li>
                    <li>End-to-end tests</li>
                </ul>
            </div>

            <div>
                <h2>More Assertion Examples</h2>

                <div>
                    <h3>Identical Match String</h3>
                    <p>Supposed the directory:</p>
                    <pre><code>
{`/root-project
├── main.py
└── test_main.py
`}
                    </code></pre>

                    <p><code>main.py</code>:</p>
                    <pre><code>
{`def add(a: int, b: int):
    return a + b


def divide(a: int, b: int):
    if b == 0:
        raise ValueError("Cannot divide by zero")

    return a / b
`}
                    </code></pre>

                    <p><code>test_main.py</code>:</p>
                    <pre><code>
{`from main import add, divide
import pytest

def test_add():
    assert add(2, 3) == 5, "2 + 3 should be 5"
    assert add(-1, 1) == 0, "-1 + 1 should be 0"
    assert add(0, 0) == 0, "0 + 0 should be 0"


def test_divide():
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(10, 0)
`}
                    </code></pre>
                    <div className="mb-5">
                        <p><code>pytest.raises()</code> accepts error type and matching string.</p>
                        <p>It only catches if an exact error is raised and contains exact string match.</p>
                    </div>

                    <p>After running, terminal prints:</p>
                    <pre><code>
{`(root-project) C:\\Users\\Acer\\Documents\\root-project>uv run pytest test_main.py
========== test session starts ==================================================================
platform win32 -- Python 3.12.7, pytest-9.2.0, pluggy-1.7.0
rootdir: C:\\Users\\Acer\\Documents\\root-project
configfile: pyproject.toml
plugins: mock-3.17.0
collected 2 items

test_main.py ..                                     [100%]

========== 2 passed in 0.07s ===================================================================

`}
                    </code></pre>
                </div>

                <div>
                    <h3>Nonidentical Match String</h3>
                    <p>If the match string is different, for example in <code>test_main.py</code>:</p>
                    <pre><code>
{`def test_divide():
    with pytest.raises(ValueError, match="Zero can't be used as divisor"):
        divide(10, 0)
`}
                    </code></pre>

                    <p>Terminal output:</p>
                    <pre><code>
{`(root-project) C:\\Users\\Acer\\Documents\\root-project>uv run pytest test_main.py
========== test session starts ==================================================================
platform win32 -- Python 3.12.7, pytest-9.2.0, pluggy-1.7.0
rootdir: C:\\Users\\Acer\\Documents\\root-project
configfile: pyproject.toml
plugins: mock-3.17.0
collected 2 items

test_main.py .F                                         [100%]

========== FAILURES =======================================================================
__________ test_divide ______________________________________________________________________

    def test_divide():
>       with pytest.raises(ValueError, match="Zero can't be used as divisor"):
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       AssertionError: Regex pattern did not match.
E         Expected regex: "Zero can't be used as divisor"
E         Actual message: 'Cannot divide by zero'

test_main.py:15: AssertionError
========== short test summary info ================================================================
FAILED test_main.py::test_divide - AssertionError: Regex pattern did not match.
========== 1 failed, 1 passed in 0.16s ==============================================================
`}
                    </code></pre>
                    <p><i>Inspect:</i> AssertionError: Regex pattern did not match.</p>
                    <ul>
                        <li>Expected reges: "Zero can't be used as divisor"</li>
                        <li>Actual message: 'Cannot divide by zero'</li>
                    </ul>
                </div>

                <div>
                    <h3>Two or More Failed Test Case</h3>
                    <p>In <code>test_main.py</code>:</p>
                    <pre><code>
{`from main import add, divide
import pytest

def test_add():
    assert add(2, 3) == 5, "2 + 3 should be 5"
    assert add(-1, 1) == 0, "-1 + 1 should be 0"
    assert add(0, 0) == 0, "0 + 0 should be 0"

    # Failed test case
    assert add(1, 1) == 3, "1 + 1 should be 2"


def test_divide():
    # Nonidentical match string
    with pytest.raises(ValueError, match="Zero can't be used as divisor"):
        divide(10, 0)
`}
                    </code></pre>

                    <p>Terminal Output:</p>
                    <pre><code>
{`(root-project) C:\\Users\\Acer\\Documents\\root-project>uv run pytest test_main.py
========== test session starts ==================================================================
platform win32 -- Python 3.12.7, pytest-9.2.0, pluggy-1.7.0
rootdir: C:\\Users\\Acer\\Documents\\root-project
configfile: pyproject.toml
plugins: mock-3.17.0
collected 2 items

test_main.py FF                                                             [100%]

========== FAILURES =======================================================================
__________ test_add _______________________________________________________________________

    def test_add():
        assert add(2, 3) == 5, "2 + 3 should be 5"
        assert add(-1, 1) == 0, "-1 + 1 should be 0"
        assert add(0, 0) == 0, "0 + 0 should be 0"
    
        # Failed test case
>       assert add(1, 1) == 3, "1 + 1 should be 2"
E       AssertionError: 1 + 1 should be 2
E       assert 2 == 3
E        +  where 2 = add(1, 1)

test_main.py:14: AssertionError
__________ test_divide ______________________________________________________________________

    def test_divide():
>       with pytest.raises(ValueError, match="Zero can't be used as divisor"):
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       AssertionError: Regex pattern did not match.
E         Expected regex: "Zero can't be used as divisor"
E         Actual message: 'Cannot divide by zero'

test_main.py:18: AssertionError
========== short test summary info ================================================================
FAILED test_main.py::test_add - AssertionError: 1 + 1 should be 2
FAILED test_main.py::test_divide - AssertionError: Regex pattern did not match.
========== 2 failed in 0.36s ===================================================================
`}
                    </code></pre>
                    <p>It specifically shows where went wrong.</p>
                </div>
            </div>
        </GuideContentContainer>
    )
}