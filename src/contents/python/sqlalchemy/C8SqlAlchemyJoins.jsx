export default function C8SqlAlchemyJoins() {
    return (
        <div>
            <section>
                <h1>SQLAlchemy Joins</h1>
            </section>
            <hr />

            <section>
                <h2>Base Tables for Reference</h2>
                <article>
                    <div>
                        <h3>1. Models:</h3>
                        <pre><code>
{`class Base(DeclarativeBase):
    __abstract__ = True

    id: Mapped[int] = mapped_column(primary_key=True)


class Address(Base):
    __tablename__ = 'addresses'

    data: Mapped[str]
    user_id: Mapped[Optional[int]] = mapped_column(ForeignKey('users.id'))

    user: Mapped['User'] = relationship(back_populates='address')

    def __repr__(self):
        return f'< Address={self.data} >'


class User(Base):
    __tablename__ = 'users'

    first_name: Mapped[str]
    last_name: Mapped[str]

    address: Mapped['Address'] = relationship(back_populates='user')

    def __repr__(self):
        return f'< User: {self.first_name} {self.last_name} >'
    

Base.metadata.create_all(engine)`}
                        </code></pre>
                    </div>

                    <div>
                        <h3>2. Data Adding</h3>
                        <pre><code>
{`def add_data() -> None:
    address_1 = Address(data='1234 Random Address')             # Used address
    address_2 = Address(data='5678 Non-existent Address')       # Not used address
    address_3 = Address(data='9012 Extra Address')              # Not used address

    user_1 = User(                                              # Have address
        first_name = 'Juan',
        last_name = 'Dela Cruz',
        address = address_1
    )

    user_2 = User(                                              # No address
        first_name = 'Taro',
        last_name = 'Yamada',
        address = None
    )

    session.add_all([address_1, address_2, address_3, user_1, user_2])
    session.commit()

    print('Successfully added data.')`}
                        </code></pre>
                    </div>

                    <div>
                        <h2>Table View:</h2>
                        <ol>
                            <li><h4><span className="hiligt">users</span> table</h4></li>
                            <table>
                                <thead>
                                    <tr>
                                        <th><code>id</code></th>
                                        <th><code>first_name</code></th>
                                        <th><code>last_name</code></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Juan</td>
                                        <td>Dela Cruz</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Taro</td>
                                        <td>Yamada</td>
                                    </tr>
                                </tbody>
                            </table>
                        
                            <li><h4><code className="hiligt">addresses</code> table</h4></li>
                            <table>
                                <thead>
                                    <tr>
                                        <th><code>id</code></th>
                                        <th><code>data</code></th>
                                        <th><code>user_id</code></th>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>1234 Random Address</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>5678 Non-existent Address</td>
                                        <td>None</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>9012 Extra Address</td>
                                        <td>None</td>
                                    </tr>
                                </thead>
                            </table>
                        </ol>
                    </div>

                </article>
            </section>
            <hr />

            <section>
                <h2>1. Inner Join</h2>
                <article>
                    <pre><code>
{`result = session.query(User, Address)
    .join(Address, User.id == Address.user_id)
    .all()`}
                    </code></pre>

                    <p><strong>RETURN</strong></p>
                    <pre><code>{`[(< User: Juan Dela Cruz >, < Address: 1234 Random Address >)]`}</code></pre>

                    <p><strong>NOTES</strong></p>
                    <ul>
                        <li>Only returns rows where User matches Address.</li>
                        <li>Users <strong>with no address</strong> → excluded</li>
                        <li>Addresses <strong>not linked to a user</strong> → excluded</li>
                        <li>Result = <strong>intersection only</strong></li>
                    </ul>

                    <p><strong>SQL Equivalent:</strong></p>
                    <pre><code>
{`SELECT *
FROM users
    JOIN addresses ON users.id = addresses.user_id
WHERE
    users.id = addresses.user_id`}
                    </code></pre>

                    <p><strong>THINK:</strong></p>
                    <p className="--indented-meaning-text">If there is no match on both sides, it won’t appear.</p>
                    
                    <p><strong>Other Viable Syntax:</strong></p>
                    <ol>
                        <li>Return Tuple:</li>
                        <pre><code>result = session.query(User, Address).join(Address).all()</code></pre>

                        <li>Conditional Joining</li>
                        <pre><code>
{`result = session.query(User)
    .join(Address, User.id == Address.user_id)
    .all()`}
                        </code></pre>
                    </ol>
                </article>
            </section>
            <hr />

            <section>
                <h2>2. Inverse Inner Join (your custom filter)</h2>
                <article>
                    <pre><code>
{`result = (
    session.query(User, Address)
    .join(Address, full=True)
    .filter(User.address == None, Address.user_id == None)      # Does an "OR" operator
    .all()
)    `}
                    </code></pre>
                    
                    <p><strong>RETURN</strong></p>
                    <pre><code>
{`[
    (< User: Taro Yamada >, None), 
    (None, < Address: 5678 Non-existent Address >), 
    (None, < Address: 9012 Extra Address >)
]`}
                    </code></pre>

                    <p><strong>NOTES</strong></p>
                    <ul>
                        <li>You used a FULL JOIN + filtering to show:</li>
                        <ul>
                            <li>users with no address</li>
                            <li>addresses with no user</li>
                        </ul>

                        <li>This is <strong>NOT a real SQL join type</strong>, but the behavior is clear:</li>
                        <ul><li>"Give me every row that <i>failed</i> to join."</li></ul>
                    </ul>

                    <p><strong>SQL Equivalent:</strong></p>
                    <pre><code>
{`SELECT *
FROM users
    FULL OUTER JOIN addresses 
        ON user.id = addresses.user_id
WHERE
    0 = 1`}
                    </code></pre>

                    <p><strong>THINK:</strong></p>
                    <p className="--indented-meaning-text">These are the rows that <i>didn’t</i> appear in the inner join.</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>3. Left Outer Join</h2>
                <article>
                    <pre><code>result = session.query(User).outerjoin(Address).all()</code></pre>
                    
                    <p><strong>RETURN</strong></p>
                    <pre><code>{`[< User: Juan Dela Cruz >, < User: Taro Yamada >]`}</code></pre>

                    <p><strong>NOTES</strong></p>
                    <ul>
                        <li>Returns <strong>all users</strong>, whether they have an address or not.</li>
                        <li>Joined address data appears as:</li>
                        <ul>
                            <li>address row if exists</li>
                            <li><code>None</code> if not</li>
                        </ul>
                    </ul>

                    <p><strong>SQL Equivalent</strong></p>
                    <pre><code>
{`SELECT 
    users.*,
    addresses.*,
FROM users,
    LEFT OUTER JOIN addresses
    ON users.id = addresses.user_id`}
                    </code></pre>

                <p><strong>THINK:</strong></p>
                <div className="--indented-meaning-text">
                    <p>LEFT table = guaranteed</p>
                    <p>RIGHT table = optional match</p>
                </div>
                </article>
            </section>
            <hr />

            <section>
                <h2>4. Inverse Left Outer Join</h2>
                <article>
                    <pre><code>
{`result = session.query(User)
    .outerjoin(Address)
    .filter(User.address == None)
    .all()`}
                    </code></pre>

                    <p><strong>RETURN:</strong></p>
                    <pre><code>{`[< User: Taro Yamada >]`}</code></pre>

                    <p><strong>NOTES</strong></p>
                    <ul>
                        <li>You filtered the LEFT OUTER JOIN to keep <i>only</i> users that <strong>didn't</strong> match anything.</li>
                        <li>This produces:</li>
                        <ul><li>ALL users with <strong>no address</strong></li></ul>
                    </ul>

                    <p><strong>SQL Equivalent:</strong></p>
                    <pre><code>
{`SELECT 
    user.*,
    addresses.*,
FROM users
    LEFT OUTER JOIN addresses
    ON user.id = addresses.user_id
WHERE
    NOT (
        EXISTS (
            SELECT 1
            FROM addresses
            WHERE
                users.id = addresses.user_id
        )
    )`}
                    </code></pre>

                    <p><strong>THINK:</strong></p>
                    <p className="--indented-meaning-text">Show the “leftovers” of the left table.</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>5. Right Outer Join (simulated)</h2>
                <p>Also called "Right Join"</p>
                <article>
                    <pre><code>result = session.query(Address, User).outerjoin(User).all()</code></pre>

                    <p><strong>RETURN:</strong></p>
                    <pre><code>
{`[
    (< Address: 1234 Random Address >, < User: Juan Dela Cruz >), 
    (< Address: 5678 Non-existent Address >, None), 
    (< Address: 9012 Extra Address >, None)
]`}
                    </code></pre>

                    <p><strong>NOTE:</strong></p>
                    <ul>
                        <li>SQLAlchemy has no <code>.rightjoin()</code></li>
                        
                        <li>So you “simulate” a right join by:</li>
                        <ul>
                            <li>starting from <strong>Address</strong> instead of User</li>
                            <li>then doing a left join to User</li>
                        </ul>
                        
                        <li>Returns <strong>all addresses</strong></li>
                            <ul>
                                <li>Users appear only if they match</li>
                                <li>Otherwise: <code>None</code></li>
                            </ul>
                    </ul>

                    <p><strong>SQL Equivalent:</strong></p>
                    <pre><code>
{`SELECT *
FROM addresses
    LEFT OUTER JOIN users
    ON users.id = addresses.user_id`}
                    </code></pre>

                    <p><strong>THINK:</strong></p>
                    <p className="--indented-meaning-text">"Right join" = "Left join but start on the other table."</p>
                
                    <p><strong>Viable extra expression:</strong></p>
                    <ol>
                        <li>Return Tuple</li>
                        <pre><code>result = session.query(Address, User).outerjoin(User).all()</code></pre>
                    </ol>
                </article>
            </section>
            <hr />

            <section>
                <h2>6. Inverse Right Outer Join</h2>
                <article>
                    <pre><code>
{`result = session.query(Address, User)\
    .outerjoin(User)\
    .filter(Address.user_id == None)\
    .all()`}
                    </code></pre>

                    <p><strong>RETURN:</strong></p>
                    <pre><code>
{`[
    (< Address: 5678 Non-existent Address >, None), 
    (< Address: 9012 Extra Address >, None)
]`}
                    </code></pre>

                    <p><strong>NOTES:</strong></p>
                    <ul>
                        <li>Filtering the simulated right join</li>
                        <li>Returns:</li>
                        <ul><li>addresses that <strong>do not belong to any user</strong></li></ul>
                    </ul>

                    <p><strong>SQL Equivalent:</strong></p>
                    <pre><code>
{`SELECT *
FROM addresses
    LEFT OUTER JOIN users
    ON users.id = addresses.user_id
WHERE
    addresses.user_id IS NULL`}
                    </code></pre>

                    <p><strong>THINK:</strong></p>
                    <p className="--indented-meaning-text">The "right leftovers."</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>7. Full Outer Join (manually emulated)</h2>
                <article>
                    <pre><code>
{`left_join = session.query(User, Address).outerjoin(Address)     # Gets all Users
right_join = session.query(User, Address).outerjoin(User)       # Gets all Addresses

full_outer_join = left_join.union(right_join).all() `}
                    </code></pre>

                    <p><strong>RETURN:</strong></p>
                    <pre><code>
{`[
    (None, < Address: 5678 Non-existent Address >),
    (None, < Address: 9012 Extra Address >),
    (< User: Juan Dela Cruz >, < Address: 1234 Random Address >),
    (< User: Taro Yamada >, None)
]`}
                    </code></pre>

                    <p><strong>NOTES:</strong></p>
                    <ul>
                        <li>SQLite does NOT support FULL JOIN</li>
                        <p>→ So you built it by combining:</p>
                        <ul>
                            <li>LEFT OUTER JOIN (all users + matches)</li>
                            <li>RIGHT OUTER JOIN (all addresses + matches)</li>
                        </ul>
                        <li>UNION merges results → produces a <strong>full outer join equivalent</strong></li>
                    </ul>

                    <p><strong>SQL Equivalent:</strong></p>
                    <pre><code>
{`SELECT * 
FROM (
    SELECT users.*,
            addresses.*
        FROM users
            LEFT OUTER JOIN addresses
                ON users.id = addresses.user_id
            UNION
            SELECT users.*,
                addresses.*
            FROM addresses
                LEFT OUTER JOIN users
                    ON users.id = addresses.user_id
)`}
                    </code></pre>

                    <p><strong>THINK:</strong></p>
                    <p className="--indented-meaning-text">FULL = (everything from left) + (everything from right) – duplicates</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>Join Summary</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Join</th>
                            <th>Returns</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Inner Join</th>
                            <td>Only users <strong>with</strong> addresses</td>
                        </tr>
                        <tr>
                            <th>Inverse Inner Join</th>
                            <td>Users <strong>without</strong> addresses + addresses <strong>without</strong> users</td>
                        </tr>
                        <tr>
                            <th>Left Outer Join</th>
                            <td>All users + their addresses (if any)</td>
                        </tr>
                        <tr>
                            <th>Inverse Left</th>
                            <td>Only users <strong>without</strong> addresses</td>
                        </tr>
                        <tr>
                            <th>Right Join (simulated)</th>
                            <td>All addresses + matched users</td>
                        </tr>
                        <tr>
                            <th>Inverse Right</th>
                            <td>Only addresses <strong>not connected</strong> to any user</td>
                        </tr>
                        <tr>
                            <th>Full Outer Join (manual)</th>
                            <td>Everything: all users + all addresses</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}