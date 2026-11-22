export default function MockObjGuide({ rootDir, cliCommand }) {
    const testFileName = "test_service.py"
    
    return (
        <div>
            <h2><code>MockerFixture.Mock()</code></h2>
            
            <p>Suppose the directory:</p>
            <pre><code>
{`/root-project
├── service.py
└── ${testFileName}
`}
            </code></pre>

            <p>In <code>service.py</code>:</p>
            <pre><code>
{`import requests

class APIClient:
    """Simulates an external API client."""

    def get_user_data(self, user_id: int):
        response = requests.get(f"https://api.example.com/users/{user_id}")

        if response.status_code == 200:
            return response.json()
        
        raise ValueError("API request failed.")
    

class UserService:
    """Uses APIClient to fetch user data and process it."""

    def __init__(self, api_client: APIClient):
        self.api_client = api_client        # Dependency injection


    def get_username(self, user_id: int):
        """Fetches a user and returns their username in uppercase."""

        user_data = self.api_client.get_user_data(user_id)  # Calls APIClient
        return user_data["name"].upper()                    # Processes the result
`}
            </code></pre>

            <p>In <code>test_service.py</code>:</p>
            <pre><code>
{`import pytest
from service import UserService, APIClient

# Type import
from pytest_mock import MockerFixture

def test_get_username_with_mock(mocker: MockerFixture):
    mock_api_client = mocker.Mock(spec=APIClient)   # Create a mock APIClient

    # Mock get_user_data to return a fake user
    mock_api_client.get_user_data.return_value = {
        "id": 1, 
        "name": "Alice"
    }

    service = UserService(mock_api_client)          # Inject mock APIClient
    username = service.get_username(1)              # Call method that depends on the mock

    # Assertions
    assert username == "ALICE"                      # Check if processing was done correctly
    mock_api_client.get_user_data.assert_called_once_with(1)    # Ensure correct API call
`}
            </code></pre>
            <div className="mb-5">
                <p>Mock setup:</p>
                <ul>
                    <li><code>spec=</code> param restricts <code>Mock()</code> to expose only the attributes and methods of a specified object, class, or list of strings.</li>
                    <li>In this case, it only going to show <code>APIClient</code>'s attributes and methods</li>
                    <li><code>mock_api_client.get_user_data.return_value</code> sets what is the <code>APIClient.get_user_data()</code> return value of the mock.</li>
                </ul>

                <p>Since the mock can't call itself, <code>UserService(mock_api_client)</code> is called while passing the mock object.</p>
            </div>

            <p>Terminal Output:</p>
            <pre><code>
{`${[cliCommand, testFileName].join(" ")}
========== test session starts ==================================================================
platform win32 -- Python 3.12.7, pytest-9.2.0, pluggy-1.7.0
rootdir: ${rootDir}
configfile: pyproject.toml
plugins: mock-3.17.0
collected 1 item

test_service.py .                                   [100%]

========== 1 passed in 0.28s ===================================================================
`}
            </code></pre>
        </div>
    )
}