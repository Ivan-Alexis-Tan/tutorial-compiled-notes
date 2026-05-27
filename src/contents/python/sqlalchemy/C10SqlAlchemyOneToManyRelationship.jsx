export default function C10SqlAlchemyOneToManyRelationship() {
    return (
        <div>
            <section className="sqlalchemy-onetomany-relationship-sec">
                <h1>SQLAlchemy One-to-Many Relationship</h1>
            </section>
            <hr />

            {/* Base setup */}
            <section className="sqlalchemy-onetomany-relationship-sec">
                <h2>1. Base Setup</h2>
                <article>
                    <p>Import <code>ForeignKey</code> and <code>relationship</code> &rarr; the core building blocks of 1-to-many structures.</p>
                    <pre><code>
{`from sqlalchemy import (create_engine, String, Integer, Column, ForeignKey)
from sqlalchemy.orm import declarative_base, sessionmaker, relationship`}
                    </code></pre>
                </article>
            </section>
            <hr />

            <section className="sqlalchemy-onetomany-relationship-sec">
                <h2>2. Using <code className="hiligt">BaseModel</code> as an Abstract Parent</h2>
                <article>
                    <pre><code>
{`class BaseModel(Base):
    __abstract__ = True
    __allow_unmapped__ = True

    id = Column(Integer, primary_key=True)`}
                    </code></pre>
                    <p><strong>Purpose:</strong></p>
                    <ul>
                        <li><code>__abstract__ = True</code></li>
                        <p>&rarr; SQLAlchemy won’t create a table for this class. It’s just a parent template.</p>
                        <li><code>id</code> is inherited automatically by all models that extend this class.</li>
                        <li><code>__allow_unmapped__ = True</code></li>
                        <p>&rarr; Lets the tutorial use old-style column declarations without strict type-checking.</p>
                    </ul>
                    <p>Essentially: <strong>Keeps code DRY</strong> and avoids repeating the primary key in every model.</p>
                </article>
            </section>
            <hr />

            <section className="sqlalchemy-onetomany-relationship-sec">
                <h2>3. Address Model</h2>
                <article>
                    <pre><code>
{`class Address(BaseModel):
    __tablename__ = 'addresses'

    city = Column(String)
    state = Column(Integer)
    zip_code = Column(Integer)

    user_id = Column(ForeignKey('users.id'))`}
                    </code></pre>
                    <p><strong>Key Point:</strong></p>
                    <p><code>user_id</code> makes each address belong to <i>one</i> specific user.</p>
                    <ul>
                        <li>This creates the “many” side of the <strong>1-to-many</strong> relationship.</li>
                        <li>You must reference the other table using exact strings: <code>'users.id'</code>.</li>
                    </ul>
                </article>
            </section>
            <hr />

            <section className="sqlalchemy-onetomany-relationship-sec">
                <h2>4. User Model with Relationship</h2>
                <article>
                    <pre><code>
{`class User(BaseModel):
    __tablename__ = 'users'

    name = Column(String)
    age = Column(Integer)

    addresses = relationship(Address)`}
                    </code></pre>
                    <h3>What this does:</h3>
                    <ul>
                        <li>The presence of a <b>ForeignKey in</b> <code>Address</code> + <b>relationship in</b> <code>User</code> creates:</li>
                        <p>User (1) &rarr; (many)</p>
                        <li><code>relationship(Address)</code> makes <code>user.addresses</code> behave like a list of Address objects.</li>
                    </ul>

                    <h3>Why list-like?</h3>
                    <p>SQLAlchemy auto-wraps the relationship in a <strong>list-like collection</strong>, so:</p>
                    <ul>
                        <li><code>append(object)</code> works for adding a single item</li>
                        <li><code>.extend([object1, object2])</code> works for adding multiple items</li>
                    </ul>
                    <p>You are simply manipulating a Python list that SQLAlchemy tracks internally.</p>
                </article>
            </section>
            <hr />

            {/* Populating Data */}
            <section className="sqlalchemy-onetomany-relationship-sec">
                <h2>5. Populating Data</h2>
                <article>
                    <pre><code>
{`user1.addresses.extend([address1, address2])
user2.addresses.append(address3)`}
                    </code></pre>
                    <h3>Why it works:</h3>
                    <ul>
                        <li><code>user1.addresses</code> is a SQLAlchemy-managed collection.</li>
                        <li>As soon as you modify that list, SQLAlchemy updates the <code>address.user_id</code> values behind the scenes.</li>
                    </ul>
                    <p>Example: <code className="--no-bg-fontcolor-blk">address1.user_id → user1.id</code></p>
                    <p>This is why you don’t manually assign <code>user_id</code>.</p>
                </article>
            </section>
            <hr />

            {/* Reverse (Backward) Relationship */}
            <section className="sqlalchemy-onetomany-relationship-sec">
                <h2>6. Reverse (Backward) Relationship</h2>
                <article>
                    <p>Inside <code>Address</code>, you can add:</p>
                    <pre><code>user = relationship(User)</code></pre>
                    <p>This allows: <code>address.user</code> to retrieve its parent user.</p>

                    <h3>Without <code className="hiligt">back_populates</code>, SQLAlchemy throws warnings.</h3>
                    <p>So the correct, clean version is:</p>
                    <pre><code>
{`class User(BaseModel):
    addresses = relationship("Address", back_populates="user")

class Address(BaseModel):
    user = relationship("User", back_populates="addresses")`}
                    </code></pre>
                    <p><code>back_populates</code> ensures both sides remain synchronized.</p>
                </article>
            </section>
            <hr />

            {/* Mapped/Modern Declarative Style */}
            <section className="sqlalchemy-onetomany-relationship-sec">
                <h2>7. Mapped/Modern Declarative Style</h2>
                <article>
                    <p>The updated version:</p>
                    <pre><code>
{`from sqlalchemy.orm import Mapped, mapped_column

user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))`}
                    </code></pre>
                    <h3>What this gives you:</h3>
                    <ul>
                        <li>Type hints recognized by editors</li>
                        <li>Better IDE autocompletion</li>
                        <li>Cleaner definitions for relationships:</li>
                        <pre><code>{`addresses: Mapped[list["Address"]] = relationship()`}</code></pre>
                    </ul>
                    <h3>Why prefer this?</h3>
                    <p>Modern SQLAlchemy (2.0+) expects strict typing.</p>
                    <p>This method guarantees compatibility and reduces warnings.</p>
                </article>
            </section>
            <hr />

            {/* 1-to-Many Relationship */}
            <section>
                <h2>8. Mental Model of 1-to-Many</h2>
                <article>
                    <p>A one-to-many relationship always needs:</p>
                    <ol>
                        <li><strong>A foreign key in the “many” table</strong></li>
                        <p>&rarr; <code>Address.user_id = ForeignKey('users.id')</code></p>
                        <li><strong>A relationship() in the “one” table</strong></li>
                        <p>&rarr; <code>User.addresses = relationship(Address)</code></p>
                        <p>Optional but recommended:</p>
                        <li><strong>A backward relationship with <code>back_populates</code></strong></li>
                    </ol>
                </article>
            </section>
            <hr />

            {/* Summary */}
            <section>
                <h2>9. Summary Checklist</h2>
                <h3>When defining a 1-to-many relationship, always ask:</h3>
                <article className="--check-bullet">
                    <p>Which table is the “one”? → <strong>User</strong></p>
                    <p>Which table is the “many”? → <strong>Address</strong></p>
                    <p>Does the many-table have a ForeignKey? → <strong>Yes</strong></p>
                    <p>Does the one-table have a relationship()? → <strong>Yes</strong></p>
                    <p>Did I set up back_populates? → <strong>Recommended</strong></p>
                    <p>Do I understand that .addresses behaves like a list? → <strong>Yes</strong></p>
                    <p>Do I understand SQLAlchemy auto-updates foreign keys? → <strong>Yes</strong></p>
                </article>
            </section>
            <hr />

            {/* Full Code Example */}
            <section className="sqlalchemy-onetomany-relationship-sec">
                <h2>Full Code Example</h2>
                <article>
                    <h3>1. 1-to-Many Relationship</h3>
                    <p>models.py:</p>
                    <pre><code>
{`from sqlalchemy import (create_engine, String, Integer, Column, ForeignKey)
from sqlalchemy.orm import declarative_base, sessionmaker, relationship, Mapped, mapped_column

DB_NAME = 'relational_sqlalchemy.db'
db_path = f"Projects/Flask/practice project/sqlalchemy_test/Relational_sqlalchemy_topics/{DB_NAME}"

engine = create_engine(f'sqlite:///{db_path}')

Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()


# Defining Models
class BaseModel(Base):
    __abstract__ =  True
    __allow_unmapped__ = True

    id = Column(Integer, primary_key=True)


class Address(BaseModel):
    __tablename__ = 'addresses'

    city = Column(String)
    state = Column(Integer)
    zip_code = Column(Integer)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship(back_populates='addresses')

    def __repr__(self):
        return f"&lt;Address(id={self.id}, city='{self.city}')>"


class User(BaseModel):
    __tablename__ = 'users'

    name = Column(String)
    age = Column(Integer)

    addresses: Mapped[list['Address']] = relationship()

    def __repr__(self):
        return f"&lt;User(id={self.id}, username={self.name}')>"


Base.metadata.create_all(engine)`}
                    </code></pre>
                    <p>app.py:</p>
                    <pre><code>
{`from models import User, Address, session

# Creating users
user1 = User(name="John Doe", age=52)
user2 = User(name="Jane Smieth", age=34)

# Creating Addresses
address1 = Address(city='New York', state='NY', zip_code="10001")
address2 = Address(city='Los Angeles', state="CA", zip_code="90001")
address3 = Address(city="Chicago", state="IL", zip_code="60601")

# Associating addresses with users
user1.addresses.extend([address1, address2])
user2.addresses.append(address3)

# Adding users and addresses to the session and commiting changes to the database
session.add(user1)
session.add(user2)
session.commit()

print(f"{user1.addresses = }")
print(f"{user2.addresses = }")
print(f"{address1.user = }")`}
                    </code></pre>
                </article>

                <article>
                    <h3>2. Reverse (Backward) Relationship</h3>
                    <p>models.py:</p>
                    <pre><code>
{`from sqlalchemy import (create_engine, String, Integer, Column, ForeignKey)
from sqlalchemy.orm import declarative_base, sessionmaker, relationship, Mapped, mapped_column

DB_NAME = 'self_relationship.db'
db_path = f"Projects\\Flask\\practice project\\sqlalchemy_test\\Relational_sqlalchemy_topics\\self_relationship\\{DB_NAME}"

engine = create_engine(f'sqlite:///{db_path}')

Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()

class BaseModel(Base):
    __abstract__ = True
    __allow_unmapped__ = True
    
    id = Column(Integer, primary_key=True)


class FollowingAssociation(BaseModel):
    __tablename__ = "following_association"

    user_id = Column(Integer, ForeignKey('users.id'))
    following_id = Column(Integer, ForeignKey('users.id'))


class User(aseModel):
    __tablename__ = 'users'

    username = Column(String)

    following = relationship(
        "User", 
        secondary='following_association',
        primaryjoin='FollowingAssociation.user_id==User.id',
        secondaryjoin='FollowingAssociation.following_id==User.id'
    )

    def __repr__(self):
        return f"&lt;User(id={self.id}, username={self.username}, following={self.following}')>"


Base.metadata.create_all(engine)`}
                    </code></pre>
                    <p>app.py:</p>
                    <pre><code>
{`from models import User, session

# Creating users
user1 = User(username="Zeq Tech 1")
user2 = User(username="Zeq Tech 2")
user3 = User(username="Zeq Tech 3")

# Creating Relationships
user1.following.append(user2)
user2.following.append(user3)
user3.following.append(user1)

# Adding users to the session and committing changes to the database
session.add_all([user1, user2, user3])
session.commit()

print(f"{user1.following = }")
print(f"{user2.following = }")
print(f"{user3.following = }")`}
                    </code></pre>
                </article>
            </section>
        </div>
    )
}