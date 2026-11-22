export default function MockPatchGuide({ rootDir, cliCommand }) {
    const testFileName = "test_mocks.py"

    return (
        <div>
            <h2><code>MockerFixture.patch()</code></h2>
            <p>Suppose the directory:</p>
            <pre><code>
{`/root-project
├── mocks.py
└── ${testFileName}
`}
            </code></pre>

            <p>In <code>mocks.py</code>:</p>
            <pre><code>
{`import requests

def get_weather(city: str):
    response = requests.get(f"https://api.weather.com/v1/{city}")

    if response.status_code == 200:
        return response.json()
    elif response.status_code == 401:
        raise ValueError("Not authorized.")
    else:
        raise ValueError("Could not fetch weather data")
`}
            </code></pre>
            
            <p>In <code>test_mocks.py</code>:</p>
            <pre><code>
{`import pytest
from mocks import get_weather

# Type imports
from pytest_mock import MockerFixture

def test_get_weather(mocker: MockerFixture):
    # Mock request.get
    mock_get = mocker.patch("mocks.requests.get")

    # Set return values
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = {"temperature": 25, "condition": "Sunny"}

    # Call function
    result = get_weather("Philippines")

    # Assertions
    assert result == {"temperature": 25, "condition": "Sunny"}
    mock_get.assert_called_once_with("https://api.weather.com/v1/Philippines")
`}
            </code></pre>

            <div className="mb-5">
                <p>Mock data setup:</p>
                <ul>
                    <li>
                        <p className="overflow-auto">
                            <code>mocker.patch("mocks.requests.get")</code> replaces <code>requests.get(f"https://api.weather.com/v1/{`{city}`}")</code> from <code>mocks.py</code> file with mock data.
                        </p>
                    </li>
                    <li>Return values can be accessed and manipulated what it's going to be using <code>return_value</code>.</li>
                    <pre className="ml-0!"><code>
{`mock_get.return_value.status_code = 200
mock_get.return_value.json.return_value = {
    "temperature": 25, 
    "condition": "Sunny"
}
`}
                    </code></pre>
                    <ul className="ml-5!">
                        <li>Sets status code to <code>200</code></li>
                        <li>Sets return of <code>json()</code> into <code>{`{"temperature": 25, "condition": "Sunny"}`}</code></li>
                    </ul>
                </ul>

                <p>The mock setup can't be called by itself, thus the job of <code>get_weather("Philippines")</code>.</p>
                <p>Since the mock replaced <code>requests.get()</code>, it no longer going to fetch from external API. It uses the mock data instead.</p>
                <p><code>assert_called_once_with( ... )</code> checks if passed arguments are correct and get executed once.</p>
            </div>

            <p>Terminal output:</p>
            <pre><code>
{`${[cliCommand, testFileName].join(" ")}
========== test session starts ==================================================================
platform win32 -- Python 3.12.7, pytest-9.2.0, pluggy-1.7.0
rootdir: ${rootDir}
configfile: pyproject.toml
plugins: mock-3.17.0
collected 1 item

test_mocks.py .                                         [100%]

========== 1 passed in 0.39s ===================================================================
`}
            </code></pre>
        </div>
    )
}