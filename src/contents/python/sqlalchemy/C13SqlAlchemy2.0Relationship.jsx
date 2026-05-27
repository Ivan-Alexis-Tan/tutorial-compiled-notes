export default function C13SqlAlchemyV2Relationship() {
    return (
        <div>
            <section>
                <h1>SQLAlchemy 2.0 Relationship</h1>
                <p><strong><i>How to write them, when to write them, and what the syntax patterns mean.</i></strong></p>
            </section>
            <hr />

            <section>
                <h2>1. Always start with this import set</h2>
                <article>
                    <p>You’ll need these for 99% of modern SQLAlchemy ORM work:</p>
                    <pre><code>
{`from sqlalchemy import create_engine, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship`}
                    </code></pre>
                </article>
            </section>
            <hr />

            <section>
                <h2>2. The 2.0 Pattern: <span className="hiligt">Mapped</span> + <span className="hiligt">mapped_column</span></h2>
                <article>
                    <p>This replaces the old:</p>
                    <pre><code>id = Column(Integer, primary_key=True)</code></pre>
                    <p>with:</p>
                    <pre><code>id: Mapped[int] = mapped_column(primary_key=True)</code></pre>
                    <h3>Why?</h3>
                    <ul>
                        <li>gives proper type hints</li>
                        <li>works well with IDEs</li>
                        <li>avoids the old "magic guessing"</li>
                        <li>mandatory for future SQLAlchemy versions</li>
                    </ul>
                </article>
            </section>
            <hr />

            <section>
                <h2>3. One-to-Many Patterns (MOST COMMON)</h2>
                <article>
                    <ul>
                            <li><h3>Parent &rarr; Children</h3></li>
                            <li><h3>Child &rarr; Parent</h3></li>
                            <p>Memorize this pattern.</p>
                            <p>This is 90% of real-world use cases.</p>

                            <li><h3>Child Table (many-side)</h3></li>
                            <p><strong>ALWAYS</strong> put the <strong>ForeignKey &rarr; here</strong></p>
                            <pre><code>
{`parent_id: Mapped[int] = mapped_column(ForeignKey("parents.id"))
parent: Mapped["Parent"] = relationship(back_populates="children")`}
                            </code></pre>
                            <div className="--check-bullet">
                                <p><code>parent_id</code> ties the child to the parent</p>
                                <p><code>parent</code> allows navigation: <code>child.parent</code></p>
                            </div>

                            <li><h3>Parent Table (one-side)</h3></li>
                            <p><strong>ALWAYS</strong> reference the list of children here</p>
                            <pre><code>children: Mapped[<span className="--light-green">list</span>["Child"]] = relationship(back_populates="parent")</code></pre>
                            <div className="--check-bullet">
                                <p>enables <code>parent.children</code></p>
                                <p>SQLAlchemy syncs both sides automatically</p>
                            </div>

                            <li><h3>⚠️Critical Rule (don't forget):</h3></li>
                            <p><strong>If you want two-way behavior, define both sides using <code>back_populates</code>.</strong></p>
                            <p>There is NO auto-reverse in SQLAlchemy 2.0.</p>
                    </ul>
                </article>
            </section>
            <hr />

            <section>
                <h2>4. Full Example (Generic Template)</h2>
                <article>
                    <p>Save this in your brain — this is “the pattern”.</p>
                    <pre><code>
{`class Parent(Base):
    __tablename__ = "parents"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String)

    children: Mapped[list["Child"]] = relationship(
        back_populates="parent",
        cascade="all, delete-orphan"
    )

class Child(Base):
    __tablename__ = "children"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String)

    parent_id: Mapped[int] = mapped_column(ForeignKey("parents.id"))
    parent: Mapped["Parent"] = relationship(back_populates="children")`}
                    </code></pre>
                    <p>Use this as your mental template for all 1-to-many relationships.</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>5. Understanding the syntax</h2>
                <article>
                    <p>Let me annotate the confusing parts.</p>

                    <h3><code className="hiligt">children: Mapped[list["Child"]]</code></h3>
                    <p>Means:</p>
                    <ul>
                        <li>this attribute returns a Python <code>list</code></li>
                        <li>the list contains <code>Child</code> instances</li>
                        <li>SQLAlchemy manages this list</li>
                    </ul>

                    <h3><code className="hiligt">parent: Mapped["Parent"]</code></h3>
                    <p>Means:</p>
                    <ul>
                        <li>this attribute is a single <code>Parent</code> instance</li>
                        <li>SQLAlchemy resolves it through the ForeignKey</li>
                    </ul>

                    <h3><code className="hiligt">relationship(back_populates="children")</code></h3>
                    <p>Means:</p>
                    <ul>
                        <li>This side matches the other side’s attribute name.</li>
                        <li>It links these two columns together logically.</li>
                    </ul>

                    <h3><code className="hiligt">mapped_column(ForeignKey("parents.id"))</code></h3>
                    <p>Means:</p>
                    <ul>
                        <li>create a column named <code>parent_id</code></li>
                        <li>enforce foreign key constraint</li>
                        <li>ORM knows which parent matches this child</li>
                    </ul>

                    <h3><code className="hiligt">cascade="all, delete-orphan"</code></h3>
                    <p>Means:</p>
                    <ul>
                        <li>if a Parent is removed, its Children are also removed</li>
                        <li>if a Child loses its Parent reference, delete it</li>
                        <li>prevents “orphan rows” in the database</li>
                    </ul>
                    <p>The Rule: Cascade belongs on the parent side, never on the child.</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>6. Mental Shortcut Checklist (super important)</h2>
                <article>
                    <p><strong>When defining a relationship, check these:</strong></p>

                    <div className="--check-bullet-h3">
                        <h3>Does the child have a ForeignKey?</h3>
                        <p>&rarr; Must define:</p>
                        <pre><code>
{`parent_id = mapped_column(ForeignKey("parents.id"))
parent = relationship(back_populates="children")`}
                        </code></pre>

                        <h3>Does the parent need a list of children?</h3>
                        <p>&rarr; Must define:</p>
                        <pre><code>children = relationship(back_populates="parent")</code></pre>

                        <h3>Do I want automatic linked deletes?</h3>
                        <p>&rarr; Only add cascade on parent:</p>
                        <pre><code>cascade="all, delete-orphan"</code></pre>

                        <h3>Am I using Mapped + mapped_column?</h3>
                        <p>→ Yes → SQLAlchemy 2.0 compliant</p>
                    </div>
                </article>
            </section>
            <hr />

            <section>
                <h2>7. Summary Table</h2>
                <article>
                    <table>
                        <thead>
                            <tr>
                                <th>Goal</th>
                                <th>Where?</th>
                                <th>Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Creat FK</td>
                                <td>child table</td>
                                <td><code>parent_id = mapped_column(FK("parents.id"))</code></td>
                            </tr>
                            <tr>
                                <td>Navigate child &rarr; parent</td>
                                <td>child table</td>
                                <td><code>parent = relationship(back_populates="children")</code></td>
                            </tr>
                            <tr>
                                <td>Navigate parent &rarr; list of children</td>
                                <td>parent table</td>
                                <td><code>children = relationship(back_populates="parent")</code></td>
                            </tr>
                            <tr>
                                <td>Add cascade delete</td>
                                <td>parent table</td>
                                <td><code>cascade="all, delete-orphan"</code></td>
                            </tr>
                        </tbody>
                    </table>
                </article>
            </section>
        </div>
    )
}