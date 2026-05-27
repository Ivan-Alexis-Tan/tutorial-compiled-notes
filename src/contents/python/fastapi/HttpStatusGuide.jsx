
export default function HTTPStatusGuide() {
    return (
        <div>
            <h1>HTTP Status Code</h1>
            <AuthenticationAndAuthorization />
        </div>
    )
}

function AuthenticationAndAuthorization() {
    return (
        <div>
            <h1>🔐 Authentication And Authorization</h1>

            <div>
                <h2>🔴 401 Unauthorized</h2>
                <div>
                    <p><strong>Meaning:</strong></p>
                    <ul><li>"I don't know who you are."</li></ul>

                    <li>Use <strong>ONLY</strong> when:</li>
                    <ul>
                        <li>No token</li>
                        <li>Invalid token</li>
                        <li>Expired token</li>
                        <li>Malformed token</li>
                    </ul>
                </div>

                <p><strong>Example:</strong></p>
                <pre><code>
{`# not logged in / bad token
raise HTTPException(
    status_code = 401, 
    detail = "Not authenticated"
)
`}
                </code></pre>

                <p>❌<strong>DO NOT</strong> use 401 when:</p>
                <ul>
                    <li>User is logged in but lacks permission</li>
                    <li>Role mismatch</li>
                    <li>Accessing someone else's resource</li>
                </ul>
            </div>

            <div>
                <h2>🔴 403 Forbidden</h2>
                <p><strong>Meaning:</strong></p>
                <ul><li>"I know who you are. You're not allowed to do this."</li></ul>

                <p><strong>Use when:</strong></p>
                <ul>
                    <li>Logged in ✔️</li>
                    <li>Token valid ✔️</li>
                    <li>But role/permission fails ❌</li>
                </ul>

                <p><strong>Example</strong></p>
                <pre><code>
{`# logged in, but wrong role
raise HTTPException(
    status_code = 403, 
    detail = "Teacher access only"
)`}
                </code></pre>
                <p>This is what your tutorial <strong>SHOULD</strong> have used 80% of the time.</p>
            </div>
            <hr />

            <h1>📦 Resource Existence</h1>
            <div>
                <h2>🔴 404 Not Found</h2>
                <p><strong>Meaning:</strong></p>
                <ul><li>"This resource does not exists (or you're not allowed to know it exists)."</li></ul>

                <p>Use when:</p>
                <ul>
                    <li>ID doesn't exist</li>
                    <li>User tries to access another user's resource and <strong>you want to hide it</strong></li>
                </ul>

                <p><strong>Example:</strong></p>
                <pre><code>
{`student = db.get(Student, id)
if not student:
    raise HTTPException(
        status_code = 404, 
        detail = "Student not found"
    )
`}
                </code></pre>
                <p>⚠️ Sometimes preferred over 403 for security reasons.</p>
            </div>
            <hr />

            <div>
                <h1>⛓️‍💥 Client Mistake</h1>

                <div>
                    <h2>🔴 400 Bad Request</h2>
                    <p><strong>Meaning:</strong></p>
                    <ul><li>"You sent garbage."</li></ul>

                    <p>Use when:</p>
                    <ul>
                        <li>Invalid input</li>
                        <li>Missing required fields</li>
                        <li>Logical validation errors</li>
                    </ul>

                    <p><strong>Example:</strong></p>
                    <pre><code>
{`if age < 0:
    raise HTTPException(
        status_code=400, 
        detail="Age cannot be negative"
    )
`}
                    </code></pre>
                </div>

                <div>
                    <h2>🔴 422 Unprocessable Entity</h2>
                    <p><strong>Meaning:</strong></p>
                    <ul><li>"The shape is right, the values are wrong."</li></ul>

                    <p>FastAPI auto-uses this for:</p>
                    <ul>
                        <li>Pydantic validation failures</li>
                        <li>Wrong types</li>
                        <li>Missing fields</li>
                    </ul>

                    <p>👉 You usually <strong>don't manually raise this</strong> in FastAPI.</p>
                </div>
            </div>
            <hr />

            <div>
                <h1>✏️ Success Responses</h1>
                <div>
                    <h2>🟢 200 OK</h2>
                    <ul>
                        <li>GET success</li>
                        <li>PUT success</li>
                        <li>PATCH success</li>
                    </ul>
                </div>

                <div>
                    <h2>🟢 201 Created</h2>
                    <ul><li>Resource created successfully</li></ul>

                    <p><strong>Example:</strong></p>
                    <pre><code>
{`return JSONResponse(
    status_code = 201, 
    content = ...
)`}
                    </code></pre>
                </div>

                <div>
                    <h2>🟢 204 No Content</h2>
                    <ul>
                        <li>Delete success</li>
                        <li>Logout success</li>
                        <li>No response body</li>
                    </ul>

                    <p><strong>Example:</strong></p>
                    <pre><code>
{`return Response(status_code=204)`}
                    </code></pre>
                </div>
            </div>
            <hr />

            <div>
                <h1>💥 Server Errors (dev's fault)</h1>
                <div>
                    <h2>🔴 500 Internal Server Error</h2>
                    <p><strong>Meaning:</strong></p>
                    <ul><li>"The server screwed up."</li></ul>

                    <p>Almost never raise this manually.</p>
                    <p>Let it happen so it's visible in logs.</p>
                </div>
            </div>
            <hr />

            <div>
                <h1>🔑 One rule to memorize</h1>
                <ul>
                    <li><strong>401</strong> = authentication failed</li>
                    <li><strong>403</strong> = authorization failed</li>
                </ul>
            </div>
        </div>
    )
}