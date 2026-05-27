import { useParams } from "react-router-dom"
import { routeData } from "../../routeData"

const titles = routeData.python.libraries.fastapijwt.titles

export default function FastApiJwt() {
    const { id } = useParams()

    switch (Number(id)) {
        case 1:
            return <C1InstallationAndSetup />
        case 2:
            return <C2SignUp />
        case 3:
            return <C3UserLogin /> 
        case 4:
            return <C4UserValidationAndAuthorization />
    }
}

function C1InstallationAndSetup() {
    const dependencies = [
        "fastapi",
        "uvicorn",
        "sqlalchemy",
        "python-jose[cryptography]",
        "passlib[bcrypt]",
        "python-multipart",
    ]
    return (
        <div>
            <h1>{useParams().id}. {titles[useParams().id]}</h1>
            <div>
                <h2>A. Installation</h2>
                <p><code>pip install</code> or <code>uv add</code> the following libraries:</p>
                <ul>
                    {dependencies.map(dep => <li key={dep}>
                        <code>{dep}</code>
                    </li>)}
                </ul>
            </div>

            <div>
                <h2>B. FastAPI JWT Setup</h2>
                <p>Imports necessary:</p>
                <pre><code>
{`from datetime import timedelta, datetime
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette import status
from passlib.context import CryptContext
from jose import jwt, JWTError
from jose.constants import Algorithms
`}
                </code></pre>
                <ul>
                    <li><code>from datetime import timedelta, datetime</code></li>
                    <ul>
                        <li>For managing token duration of expiration.</li>
                        <li>Creation: <code>expire = datetime.utcnow() + timedelta(minutes=30)</code></li>
                        <li>Store <code>exp</code> inside the JWT payload.</li>
                    </ul>

                    <li><code>from fastapi import APIRouter, Depends, HTTPException</code></li>
                    <ul>
                        <li><code>APIRouter()</code></li>
                        <ul>
                            <li>Allows group routes like <code>/auth/login</code>, <code>/auth/me</code></li>
                            <li>Mount it into the main app cleanly.</li>
                            
                            <p><code>auth.py</code></p>
                            <pre><code>
{`router = APIRouter(prefix="/auth", tags=["auth"])`}
                            </code></pre>
                            
                            <p><code>app.py</code></p>
                            <pre><code>
{`import auth
app.include_router(auth.router)
`}
                            </code></pre>
                        </ul>

                        <li><code>Depends()</code></li>
                        <ul>
                            <li>Used for:</li>
                            <ul>
                                <li>database session (<code>get_db</code>)</li>
                                <li>current user (<code>get_current_user</code>)</li>
                                <li>token extraction (<code>oauth2_scheme</code>)</li>
                            </ul>
                        </ul>

                        <li><code>HTTPException</code></li>
                        <ul>
                            <li>typical for:</li>
                            <ul>
                                <li>invalid credentials &rarr; 401</li>
                                <li>invalid token &rarr; 401</li>
                                <li>missing permissions &rarr; 403</li>
                            </ul>
                        </ul>
                    </ul>

                    <li><code>from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm</code></li>
                    <ul>
                        <li>for OAuth2 "password flow" style login</li>
                        <ul>
                            <li><code>OAuth2PasswordBearer</code></li>
                            <ul>
                                <li>NOT the login system itself</li>
                                <li>A helper that tells FastAPI:</li>
                                <ul>
                                    <li>"Expect an <code>Authorization: Bearer {`<token>`} header"</code></li>
                                    <li>"Extract the token string for me"</li>
                                </ul>
                                <li>Used like:</li>
                                <pre><code>{`oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")`}</code></pre>
                            </ul>

                            <li><code>OAuthPasswordRequestForm</code></li>
                            <ul>
                                <li>For <code>/token</code> login route</li>
                                <li>Reads form-data fields:</li>
                                <ul>
                                    <li><code>username</code></li>
                                    <li><code>password</code></li>
                                </ul>
                                <li>NOTE: it expects <code>application/x-www-form-urlencoded</code>, not JSON.</li>
                            </ul>
                        </ul>

                    </ul>

                    <li><code>from sqlalchemy.orm import Session</code></li>
                    <ul>
                        <li>The database session type (SQLAlchemy ORM)</li>
                        <ul>
                            <li>To query user by username/email.</li>
                            <li>To verify user if exists.</li>
                            <li>To load user info for <code>get_current_user()</code></li>
                        </ul>
                        <li>Example usage:</li>
                        <p><code>Session</code> is used/stored for <code>db_dependency = Annotated[Session, Depends(get_db)]</code></p>
                        <p>Then:</p>
                        <pre><code>
{`db_dependency = Annotated[Session, Depends(get_db)]

@router.post('/user', status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: CreateUserRequest):

    create_user_model = User(
        username=create_user_request.username,
        hashed_password=bcrypt_context.hash(create_user_request.password)
    )

    db.add(create_user_model)
    db.commit()
`}
                        </code></pre>
                    </ul>

                    <li><code>from starlette import status</code></li>
                    <ul>
                        <li>Just HTTP status code constants.</li>
                        <li>Instead of hard coding:</li>
                        <pre><code>{`raise HTTPException(status_code=401)`}</code></pre>

                        <li>You do:</li>
                        <pre><code>{`raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)`}</code></pre>
                        <p>Improves readability and avoids memorizing numbers.</p>
                    </ul>

                    <li><code>from passlib.context import CryptContext</code></li>
                    <ul>
                        <li>For <strong>password hasing and verification</strong></li>
                        <li>JWT is not responsible for password security — <strong>hashing is</strong>.</li>
                        <li>Used for <strong>hashing when registering user</strong> and <strong>verifying when logging in.</strong></li>
                        <li>Example:</li>
                            <ul>
                                <li>pwd_context.hash(password)</li>
                                <li>pwd_context.verify(plain_password, hashed_password)</li>
                            </ul>
                    </ul>

                    <li><code>from jose import jwt, JWTError</code></li>
                    <ul>
                        <li>The JWT encode/decode engine.</li>
                        
                        <li><code>jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)</code></li>
                        <ul><li>creates token string</li></ul>

                        <li><code>jwt.decode(token, SECRET_KEY, algorithm=ALGORITHM)</code></li>
                        <ul><li>verifies signature + reads payload</li></ul>

                        <li><code>JWTError</code></li>
                        <ul>
                            <li>Catch-all error when token is invalid:</li>
                            <ul>
                                <li>wrong signature</li>
                                <li>expired token</li>
                                <li>broken token string</li>
                                <li>wrong algorithm</li>
                            </ul>
                        </ul>
                    </ul>

                    <li><code>from jose.constants import Algorithms</code> (optional but clean)</li>
                    <ul>
                        <li>Instead of writing <code>"HS256"</code> everywhere, you can do:</li>
                        <pre><code>{`ALGORITHM = Algorithm.HS256`}</code></pre>
                        <li>Not required, just cleaner.</li>
                    </ul>

                </ul>
            </div>
        </div>
    )
}

function C2SignUp() {
    return (
        <div>
            <h1>{useParams().id}. {titles[useParams().id]}</h1>
            <div>
                <p>For <code>SECRET_KEY</code> generation, <strong>run <code>openssl rand -hex 32</code> in CMD</strong> for easy value for it.</p>
                <pre><code>
{`// Python Lib Imports
from datetime import timedelta, datetime
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette import status
from passlib.context import CryptContext
from jose import jwt, JWTError
from jose.constants import Algorithms

// Project Packages Import
from database import SessionLocal
from models import User
from schema import CreateUserRequest, Token

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

SECRET_KEY = 'all1things2bright3are4beautiful5'
ALGORITHM = Algorithms.HS256

bcrypt_context = CryptContext(schemes=['bcrypt_sha256'], deprecated="auto")        #<- for password hashing
print("ACTIVE HASH SCHEME:", bcrypt_context.default_scheme())

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


// Auth Endpoints
db_dependency = Annotated[Session, Depends(get_db)]

@router.post('/user', status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: CreateUserRequest):
   
    create_user_model = User(
        username=create_user_request.username,
        hashed_password=bcrypt_context.hash(create_user_request.password)
    )

    db.add(create_user_model)
    db.commit()

    return {"username": create_user_model.username}
`}
                </code></pre>

                <div>
                    <h2>Usage Example:</h2>
                    <p>Data input in <code>http://127.0.0.1:8000/docs#/auth/create_user_auth_user_post</code></p>
                    <pre><code>
{`username: Juan Dela Cruz
password: juan123
`}
                    </code></pre>
                </div>
            </div>
        </div>
    )
}

function C3UserLogin() {
    return (
        <div>
            <h1>{useParams().id}. {titles[useParams().id]}</h1>
            <div>
                <p>This <strong>assumes that the user already registered in the database</strong>.</p>
                <pre><code>
{`// Python Lib Imports
from datetime import timedelta, datetime
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette import status
from passlib.context import CryptContext
from jose import jwt, JWTError
from jose.constants import Algorithms

// Project Packages Import
from database import SessionLocal
from models import User
from schema import CreateUserRequest, Token

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

SECRET_KEY = 'all1things2bright3are4beautiful5'
ALGORITHM = Algorithms.HS256

bcrypt_context = CryptContext(schemes=['bcrypt_sha256'], deprecated="auto")        #<- for password hashing
print("ACTIVE HASH SCHEME:", bcrypt_context.default_scheme())

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


// Auth Helpers
# Authentication and Token Creation
def authenticate_user(username: str, password: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):       #<- Verifies password patches with hashed
        return False
    
    return user


def create_access_token(username: str, user_id: int, expires_delta: timedelta) -> str:
    """
    ## Function:
    - Creates time-limited token for authorized access.
    """
    encode = {"sub": username, "id": user_id}
    expires = datetime.utcnow() + expires_delta
    encode.update({"exp": expires})

    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


// Auth Endpoints
db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: db_dependency
) -> dict:
    user = authenticate_user(
        form_data.username,
        form_data.password,
        db
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Failed to validate user."
        )
    token = create_access_token(
        username=user.username,
        user_id=user.id,
        expires_delta=timedelta(minutes=20)
    )

    return {"access_token": token, "token_type": "bearer"}
`}
                </code></pre>
            </div>

            <div>
                <h2>Usage Example:</h2>
                <p>Data input in <code>http://127.0.0.1:8000/docs#/auth/login_for_access_token_auth_token_post</code></p>
                <pre><code>
{`username: Juan Dela Cruz
password: juan123
`}
                </code></pre>
                <p>If successful, it will return a dict/object, example:</p>
                <pre><code>
{`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKdWFuIERlbGEgQ3J1eiIsImlkIjoxLCJleHAiOjE3NzAxMTQ3MTl9.XmAbah-ID5VkfC2T3i4mXxegHvJ4YzeBQFaY6BsnLYc",
  "token_type": "bearer"
}
`}
                </code></pre>

                <p><code>access_token</code> can be checked in <code>https://www.jwt.io/</code></p>
                <p>The web UI decodes the header and the payload of the <code>access_token</code></p>
                <p><strong>Example Usage:</strong></p>
                <ul>
                    <li><code>access_token</code></li>
                    <pre><code>
{`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKdWFuIERlbGEgQ3J1eiIsImlkIjoxLCJleHAiOjE3NzAxMTQ3MTl9.XmAbah-ID5VkfC2T3i4mXxegHvJ4YzeBQFaY6BsnLYc",
  "token_type": "bearer"
}`}
                    </code></pre>

                    <li>Decoded Header:</li>
                    <pre><code>
{`{
    "alg": "HS256",
    "typ": "JWT",
}`}
                    </code></pre>

                    <li>Decoded Payload:</li>
                    <pre><code>
{`{
    "sub": "Juan Dela Cruz",
    "id": 1,
    "exp": 1770114719           <- Tue Feb 03 2026 18:31:59 GMT+0800 (China Standard Time)
}`}
                    </code></pre>
                </ul>
            </div>
        </div>
    )
}

function C4UserValidationAndAuthorization() {
    return (
        <div>
            <h1>{useParams().id}. {titles[useParams().id]}</h1>
            <div>
                <p>On <code>auth.py</code></p>
                <pre><code>
{`// Python Lib Imports
from datetime import timedelta, datetime
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette import status
from passlib.context import CryptContext
from jose import jwt, JWTError
from jose.constants import Algorithms

// Project Packages Import
from database import SessionLocal
from models import User
from schema import CreateUserRequest, Token

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

SECRET_KEY = 'all1things2bright3are4beautiful5'
ALGORITHM = Algorithms.HS256

bcrypt_context = CryptContext(schemes=['bcrypt_sha256'], deprecated="auto")        #<- for password hashing
print("ACTIVE HASH SCHEME:", bcrypt_context.default_scheme())

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


// Auth Helpers
async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]) -> dict | None:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(f"decode: {payload}")
        print(f"OAuth2 bearer: {oauth2_bearer}")

        username: str = payload.get("sub")
        user_id: int = payload.get("id")

        if username is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username."
            )
        
        return {"username": username, "id": user_id}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Failed to validate user.",
        )
`}
                </code></pre>

                <p>On <code>app.py</code></p>
                <pre><code>
{`from fastapi import FastAPI, status, Depends, HTTPException
from typing  import Annotated
from sqlalchemy.orm import Session

from database import SessionLocal, engine
import models
from auth import router, get_current_user


app = FastAPI()
app.include_router(router)

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

// Endpoints
@app.get('/', status_code=status.HTTP_200_OK)
async def user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed.")
    return {"User": user}
`}
                </code></pre>
            </div>
        </div>
    )
}