export default function PostgreSQL30BeginCommitRollback() {
    return (
        <div className="[&_h2,&_h3]:mb-3">
            <h1 className="mb-5"><code>BEGIN</code>, <code>COMMIT</code>, and <code>ROLLBACK</code></h1>

            <div>
                <h2>Transaction</h2>
                <ul>
                    <li>A group of SQL statements that must succeed <strong>together</strong>.</li>
                    <li>Rule:</li>
                    <ul className="ml-5">
                        <li>If <strong>all statement succeed</strong> &rarr; save changes</li>
                        <li>if <strong>any statments fails</strong> &rarr; cancel everything</li>
                    </ul>
                    
                    <li>This prevents partial updates.</li>
                </ul>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>Autocommit (Default)</h2>
                <ul>
                    <li>Runs <strong>each SQL statement as its own transaction</strong> by default.</li>
                    <li>Any change is <strong>saved immediately</strong>.</li>
                    <li>No <code>BEGIN</code> &rarr; no control</li>
                </ul>

                
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2><code>BEGIN</code></h2>
                <ul>
                    <li>Starts a transaction</li>
                    <li>Tells PostgreSQL: "Do not save anything yet."</li>
                    <li>Changes are temporary</li>
                    <li>You decide whether to save or cancel</li>
                </ul>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2><code>COMMIT</code></h2>
                <h3>Example:</h3>
                <pre><code>
{`</> PostgreSQL
BEGIN;

UPDATE bank_accounts
SET balance = balance + 2000;

COMMIT;
`}
                </code></pre>
                <ul>
                    <li>Makes all changes permanent</li>
                    <li>Both updates are saved</li>
                    <li>Money is trasferred safely</li>
                </ul>
            </div>
        
            <hr className="--hr-faded" />

            <div>
                <h2><code>ROLLBACK</code></h2>
                <h3>Example:</h3>
                <pre><code>
{`</> PostgreSQL
BEGIN;

UPDATE bank_accounts
SET balance = balance - 2000
WHERE account_id = 1;

ROLLBACK;
`}
                </code></pre>
                <ul>
                    <li>Cancels everything after <code>BEGIN</code></li>
                    <li>No balance change</li>
                    <li>Database returns to original state</li>
                </ul>
            </div>
        </div>
    )
}