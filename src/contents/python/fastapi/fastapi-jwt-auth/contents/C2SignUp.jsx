export default function C2SignUp() {
    return (
        <div className="[&_h1]:text-3xl [&_h2]:text-2xl [&_h1,&_h2,&_h3]:font-bold [&_h1,&_h2,&_h3]:mb-3">
            <h1>User Registration (Sign Up)</h1>            
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