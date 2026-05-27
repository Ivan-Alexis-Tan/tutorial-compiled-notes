
export default function C2SqlAlchemyGuide() {
    return (
        <div>
            <h2>SQLAlchemy Guide</h2>
            <hr />

            {/* SQLAlchem */}
            <section className="sqlalchemy-guide-sec">
                <h2>1. SQLAlchemy</h2>
                <article>
                    <h3>Two SQLAlchemy "modes":</h3>
                    <ol>
                        <li><h3>Core (low-level SQL builder)</h3></li>
                        <p>Mostly raw  SQL, but programmatic.</p>
                        <p>You won't use it in Flask 99% of the time.</p>

                        <li><h3>ORM (Object Relational Mapper) &mdash; this is what Flask uses</h3></li>
                        <p>This lets you represents tables as Python classes.</p>
                        <p>You use this:</p>
                        <ul>
                            <li><code>db.Model</code></li>
                            <li><code>db.Column()</code></li>
                            <li><code>db.relationship()</code></li>
                            <li><code>db.session.add()</code>, <code>.commit()</code></li>
                        </ul>
                        <p>This is where all the real work happens.</p>
                        <p>Everything below focuses on the <strong>ORM</strong>, because that's what you need.</p>
                    </ol>
                </article>
            </section>
            <hr />

            {/* Defining Tables */}
            <section className="sqlalchemy-guide-sec">
                <h2>2. Defining Tables (Models)</h2>
                <article>
                    <p>The <strong>bare minimum</strong> structure of a SQLAlchemy model:</p>
                    <pre><code>
{`class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)`}
                    </code></pre>
                    <p>💡Important notes:</p>
                    <ul>
                        <li><code>__tablename__</code> &rarr; MUST be explicitly set.</li>
                        <p>Don't realy on auto-generated names. Saves your future self from migraines.</p>
                        <li>Every model must have a primary key.</li>
                        <li>Column types must be chosen intentionally.</li>
                    </ul>
                </article>
            </section>
            <hr />

            {/* Column Types */}
            <section className="sqlalchemy-guide-sec">
                <h2>3. Column Types</h2>
                <article>
                    <p>You don’t need every type. These are the practical ones:</p>
                    
                    <h3>Numeric & Keys</h3>
                    <ul>
                        <li><code>db.Integer</code> &rarr; you primary key type</li>
                        <li><code>db.Float</code></li>
                        <li><code>db.Numeric(precision=10, scale=2)</code> &rarr; money, accurate decimals</li>
                    </ul>

                    <h3>Strings</h3>
                    <ul>
                        <li><code>db.String(150)</code> &rarr; VARCHAR(150)</li>
                        <li><code>db.Text</code> &rarr; big text (no max length)</li>
                    </ul>

                    <h3>Date & Time</h3>
                    <ul>
                        <li><code>db.DateTime</code></li>
                        <li><code>db.Date</code></li>
                        <li><code>db.Time</code></li>
                    </ul>

                    <h3>Boolean</h3>
                    <ul><li><code>db.Boolean</code></li></ul>

                    <h3>Large storage (rarely needed)</h3>
                    <ul><li><code>db.LargeBinary</code> &rarr; files, images, bytes (usually use files storage instead)</li></ul>

                    <p>Stick to simple types. Don't overengineer.</p>
                </article>
            </section>
            <hr />

            {/* Column Options */}
            <section className="sqlalchemy-guide-sec">
                <h2>4. Column Options</h2>
                <h3><code className="hiligt">primary_key=True</code></h3>
                <p>Defines the main unique identifier.</p>

                <h3><code className="hiligt">unique=True</code></h3>
                <p>Ensures no duplicates (ex: username, email).</p>

                <h3><code className="hiligt">nullable=False</code></h3>
                <p>The field CANNOT be empty.</p>
                <p>Should be added to anything IMPORTANT:</p>
                <ul>
                    <li>email</li>
                    <li>username</li>
                    <li>password_hash</li>
                    <li>foreign keys</li>
                    <li>created_at timestamps</li>
                </ul>

                <h3><code className="hiligt">default=&nbsp</code></h3>
                <p>Automatic values.</p>
                <pre><code>created_at = db.Column(db.DateTime, default=datetime.utcnow)</code></pre>

                <h3><code className="hiligt">ForeignKey(...)</code></h3>
                <p>Defines relationship:</p>
                <pre><code>user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)</code></pre>
            </section>
            <hr />

            {/* Relationships */}
            <section className="sqlalchemy-guide-sec">
                <h2>5. Relationship</h2>
                <article>
                    <p>This is how tables connect.</p>

                    <h3>1. One-to-Many</h3>
                    <p>Example: User &rarr; Posts</p>

                    <p><strong>In child table (Post):</strong></p>
                    <pre><code>user_id = db.Column(db.Integer, db.ForeignKey("users.id"))</code></pre>

                    <p><strong>In parent table (User):</strong></p>
                    <pre><code>posts = db.relationship("Post", backref="author", lazy=True)</code></pre>

                    <p><strong>This lets you do:</strong></p>
                    <pre><code>
{`user.posts
post.author`}
                    </code></pre>
                </article>
            </section>
            <hr />

            {/* The db.session */}
            <section>
                <h2>6. The <code className="hiligt">db.session</code></h2>
                <article>
                    <p>This is how SQLAlchemy talks to the database.</p>

                    <h3>Add:</h3>
                    <pre><code>db.session.add(obj)</code></pre>

                    <h3>Update:</h3>
                    <p>Just modify the object then commit.</p>

                    <h3>Commit:</h3>
                    <pre><code>db.session.commit()</code></pre>

                    <h3>Rollback:</h3>
                    <p><b>Use this when things crash.</b></p>
                    <pre><code>db.session.rollback()</code></pre>
                    <p>Never forget rollback. Without it, you lock your database into a broken transaction.</p>
                </article>
            </section>
            <hr />

            {/* Querying */}
            <section className="sqlalchemy-guide-sec">
                <h2>7. Querying</h2>
                <article>
                    <h3>Get all:</h3>
                    <pre><code>User.query.all()</code></pre>

                    <h3>Filter:</h3>
                    <pre><code>User.query.filter_by(username="alex").first()</code></pre>

                    <h3>Filter advanced:</h3>
                    <pre><code>{`User.query.filter(User.age > 18).all()`}</code></pre>

                    <h3>Get by primary key:</h3>
                    <pre><code>User.query.get(id)</code></pre>

                    <h3>Order:</h3>
                    <pre><code>User.query.order_by(User.created_at.desc()).all()</code></pre>
                </article>
            </section>
            <hr />

            {/* Common architectural mistakes */}
            <section>
                <h2>8. Common architectural mistakes</h2>
                <article>
                    <h3>❌Mistake 1: No <code className="hiligt">__tablename__</code></h3>
                    <p>If you forget it, SQLAlchemy auto-generates ugly table names</p>
                    <p>Later refactors? Good luck.</p>

                    <h3>❌Mistake 2: Forgetting <code className="hiligt">nullable=False</code></h3>
                    <p>You end up with users with NULL emails, NULL passwords, NULL IDs, etc.</p>

                    <h3>❌Mistake 3: Using <code className="hiligt">String(9999)</code></h3>
                    <p>Just no. Use a reasonable limit.</p>

                    <h3>❌Mistake 4: Not defining relationship properly</h3>
                    <p>You get tons of workarounds because data doesn't relate cleanly.</p>

                    <h3>❌Mistake 5: Forgetting migrations</h3>
                    <p>If you're not using Alembic or Flask-Migrate, you’ll break your DB eventually.</p>
                </article>
            </section>
            <hr />

            {/* Model Setup Example */}
            <section>
                <h2>Model Setup Example</h2>
                <article>
                    <pre><code>
{`from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    posts = db.relationship("Post", backref="author", lazy=True)


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)`}
                    </code></pre>
                    <p>This structure will last you through:</p>
                    <ul>
                        <li>authentication</li>
                        <li>user profiles</li>
                        <li>dashboards</li>
                        <li>posting systems</li>
                        <li>admin panels</li>
                        <li>API conversions later</li>
                    </ul>
                    <p>It's the correct foundation.</p>
                </article>
            </section>
        </div>
    )
}