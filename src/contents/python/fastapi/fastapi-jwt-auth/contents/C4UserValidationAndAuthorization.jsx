export default function C4UserValidationAndAuthorization() {
    return (
        <div className="[&_h1]:text-3xl [&_h2]:text-2xl [&_h1,&_h2,&_h3]:font-bold [&_h1,&_h2,&_h3]:mb-3">
            <h1>User Validation and Authorization</h1>
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