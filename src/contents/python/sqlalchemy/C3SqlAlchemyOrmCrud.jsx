
export default function C3SqlAlchemyOrmCrud() {
    return (
        <div>
            <section className="sqlalchemy-crude-guide-sec">
                <h1>SQLAlchemy CRUD Guide</h1>
            </section>
            <hr />

            {/* Setting Up a Session */}
            <section className="sqlalchemy-crude-guide-sec">
                <h2>1. Setting Up a Session</h2>
                <article className="sqlalchemy-crude-guide__setup-session">
                    <ul>
                        <li>You need a session to interact with database.</li>
                        <li>Typical setup:</li>
                    </ul>
                    <pre><code>
{`from sqlalchemy.orm import sessionmaker
from .models import engine, User        #<- Manually defined in other file

Session = sessionmaker(bind=engine)
session = Session()`}
                    </code></pre>
                    <p><strong>&rarr; <a href="{{ url_for('views.sqlalchemy_intro') }}">View <code>models.py</code>.</a></strong></p>
                    
                    <div>
                        <h3>What this means:</h3>
                        <ul>
                            <li><code>sessionmaker(bind=engine)</code> &rarr; "Whenever I make a session, connect it to this database.”</li>
                            <li><code>session = Session()</code> &rarr; creates a real session object used for all CRUD actions.</li>
                        </ul>
                    </div>
                </article>
            </section>
            <hr />

            {/* Create Records */}
            <section className="sqlalchemy-crude-guide-sec">
                <h2>2. Creating Records</h2>
                <article className="sqlalchemy-crude-guide__create-records">
                    <div className="sqlalchemy-crude-guide-create-records__create-obj">
                        <h3>Create an object that matches the model:</h3>
                        <pre><code>user = User(name="John Doe", age=30)</code></pre>
                    </div>

                    <div className="sqlalchemy-crude-guide-create-records__add-user">
                        <h3>Add & save:</h3>
                        <pre><code>
{`session.add(user)
session.commit()`}
                        </code></pre>
                    </div>

                    <div className="sqlalchemy-crude-guide-create-records__add-multiple">
                        <h3>Add multiple:</h3>
                        <pre><code>
{`session.add_all([user2, user3, user4])
session.commit()`}
                        </code></pre>
                        <p><strong>Key idea:</strong></p>
                        <p><code>add()</code> stages the object, <code>commit()</code> writes it to disk.</p>
                    </div>
                </article>
            </section>
            <hr />

            {/* Reading Query Data */}
            <section className="sqlalchemy-crude-guide-sec">
                <h2>3. Reading/Querying Data</h2>
                <article className="sqlalchemy-crude-guide__read-query-data">
                    <div>
                        <h3>Get all rows:</h3>
                        <pre><code>users = session.query(User).all()</code></pre>
                    </div>

                    <div>
                        <h3>Filter rows:</h3>
                        <pre><code>user = session.query(User).filter_by(id=1).one_or_none()</code></pre>
                    </div>
                    
                    <h3>Notes:</h3>
                    <ul>
                        <li><code>session.query(User)</code> &rarr; “Start a query on the User table.”</li>
                        <li><code>one_or_none():</code></li>
                        <ul>
                            <li>returns <strong>one row</strong></li>
                            <li>returns <b>None</b> if nothing matches</li>
                            <li>raises an error if more than one match (to avoid ambiguity)</li>
                        </ul>
                    </ul>
                </article>
            </section>
            <hr />

            {/* Updating Records */}
            <section className="sqlalchemy-crude-guide-sec">
                <h2>4. Updating Records</h2>
                <article className="sqlalchemy-crude-guide__update-records">
                    <div>
                        <h3>Modify the Python object:</h3>
                        <pre><code>user.name = "A different name"</code></pre>
                    </div>

                    <div>
                        <h3>Save the update:</h3>
                        <pre><code>session.commit()</code></pre>
                    </div>

                    <h3>Important:</h3>
                    <p>Changing the attribute does nothing until <code>commit()</code> is called.</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>5.Deleting Records</h2>
                <article>
                    <div>
                        <h3>Find the row:</h3>
                        <pre><code>user = session.query(User).filter_by(id=1).one_or_none()</code></pre>
                    </div>

                    <div>
                        <h3>Deleting it:</h3>
                        <pre><code>
{`session.delete(user)
session.commit()`}
                        </code></pre>
                        <p><strong>Deleting removes the entire row, not a single field.</strong></p>
                    </div>
                </article>
            </section>
            <hr />

            <section>
                <h2>Extra Behavior Notes</h2>
                <ul>
                    <li>SQLAlchemy tracks object changes automatically (dirty tracking)</li>
                    <li>Nothing is pushed to the DB until <code>commit()</code></li>
                    <li>A session represents a <b>transaction</b> — it bundles all your changes together.</li>
                </ul>
            </section>
        </div>
    )
}