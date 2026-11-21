import GuideContentContainer from "../../../components/GuideContentContainer";

export default function C3PytestFixtures() {
    return (
        <GuideContentContainer>
            <h1>Fixtures</h1>
            <ul>
                <li>Is something that you can have run before every single test.</li>
                <li>That something might be:</li>
                <ul>
                    <li>An object.</li>
                    <li>A database connection.</li>
                    <li>A temporary directory.</li>
                    <li>Test data.</li>
                    <li>A mocked dependency.</li>
                    <li>A configured application instance.</li>
                </ul>

                <li>A mechanism for providing objects, resources, or setup functionality to a test function.</li>
                <li>Usually gives fresh instance or some fresh data before every test runs.</li>
            </ul>

            <hr />

            <div>
                <h2>Example Setup</h2>
                <p>Supposed the directory:</p>
                <pre><code>
{`/root-project
├── db_sim.py
└── test_db_sim.py
`}
                    </code></pre>

                <p>In <code>db_sim.py</code>:</p>
                <pre><code>
{`class UserManager:
    def __init__(self):
        self.users = {}


    def add_user(self, username: str, email: str) -> bool | None:
        if username in self.users:
            raise ValueError("User already exists")

        self.users[username] = email
        return True


    def get_user(self, username: str) -> dict[str, str]:
        return self.users[username]
`}
                </code></pre>

                <p>In <code>test_db_sim.py</code>:</p>
                <pre><code>
{`from db_sim import UserManager
import pytest

@pytest.fixture
def user_manager():
    """Creates a fresh instace of UserManager before each test."""
    return UserManager()


def test_add_manager(user_manager: UserManager) -> None:
    assert user_manager.add_user("juan_dela_cruz", "juandelacruz@example.com")
    assert user_manager.get_user("juan_dela_cruz") == "juandelacruz@example.com"


def test_add_duplicate_user(user_manager: UserManager) -> None:
    user_manager.add_user("juan_dela_cruz", "juandelacruz@example.com")

    with pytest.raises(ValueError):
        user_manager.add_user("juan_dela_cruz", "another@example.com")
`}
                </code></pre>

                <p><code>@pytest.fixture</code> decorator create new instance of <code>UserManager</code> each time a test runs.</p>
                <p>This creates separate instances to avoid conflict and interruptions with other test cases.</p>
                <p>If you run <code>test_db_sim.py</code>, terminal prints something similar:</p>
                <pre><code>
{`(root-project) C:\\Users\\Acer\\Documents\\root-project>uv run pytest test_db_sim.py
========== test session starts ==================================================================
platform win32 -- Python 3.12.7, pytest-9.2.0, pluggy-1.7.0
rootdir: C:\\Users\\Acer\\Documents\\root-project
configfile: pyproject.toml
plugins: mock-3.17.0
collected 2 items

test_db_sim.py ..                                     [100%]
========== 2 passed in 0.08s ===================================================================
`}
                </code></pre>
            </div>

            <div>
                <h2>Errors Without Using Fixtures</h2>
                <p>If not creating separate instances, example in <code>test_db_sim.py</code>:</p>
                <pre><code>
{`from db_sim import UserManager
import pytest

user_manager = UserManager()

def test_add_manager() -> None:
    assert user_manager.add_user("juan_dela_cruz", "juandelacruz@example.com")
    assert user_manager.get_user("juan_dela_cruz") == "juandelacruz@example.com"


def test_add_duplicate_user() -> None:
    user_manager.add_user("juan_dela_cruz", "juandelacruz@example.com")

    with pytest.raises(ValueError):
        user_manager.add_user("juan_dela_cruz", "another@example.com")
`}
                </code></pre>

                <div className="mb-5">
                    <p><code>UserManager</code> instance is global and only instantiate once.</p>
                    <p>This works but other test will interrupt since they also points to that instance.</p>
                </div>

                <p>If you run it, terminal would print:</p>
                <pre><code>
{`(root-project) C:\\Users\\Acer\\Documents\\root-project>uv run pytest test_db_sim.py
========== test session starts ==================================================================
platform win32 -- Python 3.12.7, pytest-9.2.0, pluggy-1.7.0
rootdir: C:\\Users\\Acer\\Documents\\root-project
configfile: pyproject.toml
plugins: mock-3.17.0
collected 2 items

test_db_sim.py .F                                       [100%]

========== FAILURES =======================================================================
__________ test_add_duplicate_user ________________________________________________________________

    def test_add_duplicate_user() -> None:
>       user_manager.add_user("juan_dela_cruz", "juandelacruz@example.com")

test_db_sim.py:17: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <db_sim.UserManager object at 0x000001F139BFDAF0>, username = 'juan_dela_cruz', email = 'juandelacruz@example.com'

    def add_user(self, username: str, email: str) -> bool | None:
        if username in self.users:
>           raise ValueError("User already exists")
E           ValueError: User already exists

db_sim.py:8: ValueError
========== short test summary info ================================================================
FAILED test_db_sim.py::test_add_duplicate_user - ValueError: User already exists
========== 1 failed, 1 passed in 0.37s ==============================================================
`}
                </code></pre>

                <p>Since they point on similar instance, <code>test_add_duplicate_user()</code> test will create duplicate and throws an error.</p>
            </div>

            <div>
                <h2>Example Usage</h2>
                <p className="mb-3">Let's keep the directory example but change the contents of the files.</p>
                
                <p>In <code>db_sim.py</code>:</p>
                <pre><code>
{`class Database():
    """Simulates a basic user database."""

    def __init__(self):
        self.data = {}      # Simulating an in-memory database


    def add_user(self, user_id: int, name: str) -> None:
        if user_id in self.data:
            raise ValueError("User already exists.")

        self.data[user_id] = name


    def get_user(self, user_id: int) -> str | None:
        return self.data.get(user_id)


    def delete_user(self, user_id: int) -> None:
        if user_id in self.data:
            del self.data[user_id]
`}
                </code></pre>

                <p>In <code>test_db_sim.py</code>:</p>
                <pre><code>
{`from db_sim import Database
import pytest

@pytest.fixture
def db():
    """Provides a fresh instance of the Database class and cleans up after the test."""

    database = Database()
    yield database              # Provide the fixture instance
    database.data.clear()       # Cleanup step (not needed for in-memory, but useful for real DBs)


def test_add_user(db: Database):
    db.add_user(1, "Juan")
    assert db.get_user(1) == "Juan"


def test_add_duplicate_user(db: Database):
    db.add_user(1, "Juan")
    with pytest.raises(ValueError, match="User already exists"):
        db.add_user(1, "Taro")


def test_delete_user(db: Database):
    db.add_user(2, "Taro")
    db.delete_user(2)
    assert db.get_user(2) is None
`}
                </code></pre>

                <p>The terminal will print:</p>
                <pre><code>
{`(root-project) C:\\Users\\Acer\\Documents\\root-project>uv run pytest test_db_sim.py
========== test session starts ==================================================================
platform win32 -- Python 3.12.7, pytest-9.2.0, pluggy-1.7.0
rootdir: C:\\Users\\Acer\\Documents\\root-project
configfile: pyproject.toml
plugins: mock-3.17.0
collected 3 items

test_db_sim.py ...                                     [100%]

========== 3 passed in 0.06s ===================================================================
`}
                </code></pre>
            </div>
        </GuideContentContainer>
    )
}