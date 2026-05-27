export default function C5SqlAlchemyDataHandling() {
    return (
        <div>
            <h1>SQLAlchemy Data Handling</h1>
            <hr />

            {/* Adding and Saving Data */}
            <div className="sqlalch-data-handling">
                <h2>1. Adding (Saving) Data</h2>
                <p>When you do:</p>
                <pre><code>
{`new_user = User(username="test", password="hashed_password")
db.session.add(new_user)
db.session.commit()`}
                </code></pre>
                <p>Process:</p>
                <ol>
                    <li>Creating a new <code>User</code> object (in Python memory)</li>
                    <li>Adding it to SQLAlchemy's "session" &mdash; basically a <i>staging area</i> for pending DB operations.</li>
                    <li>Calling <code>commit()</code> &mdash; this executes the actual SQL <code>INSERT</code> command to write it to your database file/table.</li>
                </ol>
                <p>✅After this, your new user is officially stored in your database table.</p>
            </div>
            <hr />

            {/* Viewing/Retrieving Data */}
            <div className="sqlalch-data-handling">
                <h2>2. Viewing/Retrieving Data</h2>
                <p>To <i>view</i> or <i>fetch</i> data, you query the model using SQLAlchemy’s query interface.</p>
                <p>Examples:</p>
                <pre><code>
{`# Get all users
users = User.query.all()

# Get one user by ID
user = User.query.get(1)

# Get user by username
user = User.query.filter_by(username="test").first()

# Get multiple users matching something
admins = User.query.filter_by(role="admin").all()`}
                </code></pre>
                <p>Each query returns either:</p>
                <ul>
                    <li>A <b>list</b> (if you used <code>.all()</code>), or</li>
                    <li>A <b>single object</b> (if you used <code>.first()</code> or <code>.get()</code>).</li>
                </ul>
            </div>
            <hr />

            {/* Deleting Data */}
            <div className="sqlalch-data-handling">
                <h2>3. Deleting Data</h2>
                <p>To delete, it’s equally straightforward:</p>
                <pre><code>
{`user = User.query.filter_by(username="test").first()
if user:
    db.session.delete(user)
    db.session.commit()`}
                </code></pre>
                <p>This executes a SQL <code>DELETE</code> command under the hood.</p>
                <p>✅Always remember: <code>db.session.commit()</code> is what actually makes changes permanent.</p>
            </div>
            <hr />

            {/* Updating Data */}
            <div className="sqlalch-data-handling">
                <h2>4. Updating Data</h2>
                <p>If you want to modify existing data:</p>
                <pre><code>
{`user = User.query.filter_by(username="test").first()
user.password = "new_hashed_password"
db.session.commit()`}
                </code></pre>
                <p>You just update the object’s attributes, and then commit again.</p>
            </div>
            <hr />

            {/* Summary */}
            <div className="sqlalch-data-handling">
                <h2>Think of it like this:</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>SQLAlchemy Command</th>
                            <th>SQL Equivalent</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Add</td>
                            <td><code>db.session.add(obj)</code></td>
                            <td><code>INSERT</code></td>
                        </tr>
                        <tr>
                            <td>View</td>
                            <td><code>Model.query.filter_by(...).all()</code></td>
                            <td><code>SELECT</code></td>
                        </tr>
                        <tr>
                            <td>Update</td>
                            <td>modify attributes + <code>db.session.commit()</code></td>
                            <td><code>UPDATE</code></td>
                        </tr>
                        <tr>
                            <td>Delete</td>
                            <td><code>db.session.delete(obj)</code></td>
                            <td><code>DELETE</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />

            {/* Example Workflow */}
            <div className="sqlalch-data-handling">
                <h2>Example Workflow</h2>
                <pre><code>
{`# Create
new_user = User(username="ivan", password="1234")
db.session.add(new_user)
db.session.commit()

# Read
all_users = User.query.all()

# Update
user = User.query.filter_by(username="ivan").first()
user.password = "abcd"
db.session.commit()

# Delete
db.session.delete(user)
db.session.commit()`}
                </code></pre>
            </div>
            <hr />

            {/* Few Notes */}
            <div className="sqlalch-data-handling">
                <h2>⚠️A few notes</h2>
                <ul>
                    <li>Nothing is saved to the database <b>until you call</b> <code>db.session.commit()</code>.</li>
                    <li>If you forget <code>commit()</code>, the change only lives temporarily in memory.</li>
                    <li>You can rollback a failed transaction using <code>db.session.rollback()</code> to undo unsaved changes.</li>
                    <li>For better performance and control, you can batch several <code>.add()</code> calls before one final <code>.commit()</code>.</li>
                </ul>
            </div>
        </div>
    )
}