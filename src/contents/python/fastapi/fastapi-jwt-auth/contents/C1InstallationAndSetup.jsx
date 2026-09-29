export default function C1InstallationAndSetup() {
    const dependencies = [
        "fastapi",
        "uvicorn",
        "sqlalchemy",
        "python-jose[cryptography]",
        "passlib[bcrypt]",
        "python-multipart",
    ]
    return (
        <div className="[&_h1]:text-3xl [&_h2]:text-2xl [&_h1,&_h2,&_h3]:mb-3 [&_h1,&_h2,&_h3]:font-bold [&_p]:mb-1">
            <h1>Installation And Setup</h1>
            <div className="mb-5">
                <h2>A. Installation</h2>
                <p><code>pip install</code> or <code>uv add</code> the following libraries:</p>
                <ul className="ml-10 *:list-disc *:mb-1">
                    {dependencies.map(dep => <li key={dep}>
                        <code>{dep}</code>
                    </li>)}
                </ul>
            </div>

            <div className="mb-5">
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
                <ul className="ml-5 [&>li]:list-decimal [&>li]:mt-5 [&>li]:mb-1 [&>ul]:ml-5 [&>ul]:list-disc [&>ul>li]:mb-1">
                    <li><code>from datetime import timedelta, datetime</code></li>
                    <ul>
                        <li>For managing token duration of expiration.</li>
                        <li>Creation: <code>expire = datetime.utcnow() + timedelta(minutes=30)</code></li>
                        <li>Store <code>exp</code> inside the JWT payload.</li>
                    </ul>

                    <li><code>from fastapi import APIRouter, Depends, HTTPException</code></li>
                    <ul className="[&>ul]:ml-5 [&>ul>ul]:ml-5 [&>ul_li]:list-disc">
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
                    <ul className="[&>ul,&>ul>ul,&>ul>ul>ul]:ml-5 [&>ul_li]:list-disc">
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
                                <li><strong className="text-red-400">NOTE</strong>: it expects <code>application/x-www-form-urlencoded</code>, not JSON.</li>
                            </ul>
                        </ul>

                    </ul>

                    <li><code>from sqlalchemy.orm import Session</code></li>
                    <ul className="[&>ul]:ml-5 [&_li]:list-disc">
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
                    <ul className="[&>ul]:ml-5 [&_li]:list-disc">
                        <li>For <strong>password hasing and verification</strong></li>
                        <li>JWT is not responsible for password security — <strong>hashing is</strong>.</li>
                        <li>Used for <strong>hashing when registering user</strong> and <strong>verifying when logging in.</strong></li>
                        <li>Example:</li>
                            <ul>
                                <li><code>pwd_context.hash(password)</code></li>
                                <li><code>pwd_context.verify(plain_password, hashed_password)</code></li>
                            </ul>
                    </ul>

                    <li><code>from jose import jwt, JWTError</code></li>
                    <ul className="[&>ul]:ml-5 [&_li]:list-disc">
                        <li>The JWT encode/decode engine.</li>
                        
                        <li><code>jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)</code></li>
                        <ul><li className="mb-2">creates token string</li></ul>

                        <li><code>jwt.decode(token, SECRET_KEY, algorithm=ALGORITHM)</code></li>
                        <ul><li className="mb-2">verifies signature + reads payload</li></ul>

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