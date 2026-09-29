export default function C3UserLogin() {
    return (
        <div className="[&_h1]:text-3xl [&_h2]:text-2xl [&_h1,&_h2,&_h3]:font-bold [&_h1,&_h2,&_h3]:mb-3">
            <h1>User Login</h1>
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

            <div className="[&_p]:mb-1">
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