export default function C14SqlAlchemySelfRelationshipAndCircularDependencies() {
    return (
        <div>
            <section>
                <div className="--title-id-nav">
                    <h1>SQLAlchemy Self-Relationship & Circular Dependencies</h1>
                    <a href="#sqlalchemy-self-relationship__code-context">Full code context</a>
                </div>
                <aside>
                    <p>Self-relationship = a model that points to another record of <strong>its own table</strong>.</p>
                    <p>Example Idea:</p>
                    <p>&ndash; A Node points to the next Node → like a linked list.</p>
                </aside>
            </section>
            <hr />

            <section>
                <h2>1. Simplest Self-Relationship</h2>
                <article>
                    <p>Example model:</p>
                    <pre><code>
{`class Node(Base):
    __tablename__ = 'nodes'

    id = Column(Integer, primary_key=True)
    value = Column(Integer, nullable=False)

    node_id = Column(Integer, ForeignKey('nodes.id'))
    next_node = relationship('Node', remote_side=[id], uselist=False)`}
                    </code></pre>

                    <div>
                        <h3>✔️What this models</h3>
                        <ul>
                            <li>Each node has one pointer to another node.</li>
                            <li>That pointer is stored as an integer foreign key:</li>
                            <pre><code>node.node_id → holds the id of the next_node</code></pre>
                        </ul>
                    </div>
                    
                    <div>
                        <h3>✔️Why <code className="hiligt">remote_side=[id]</code> is needed</h3>
                        <p>This is the part beginners struggle with the most.</p>
                        <p>SQLAlchemy sees:</p>
                        <pre><code>Node.next_node → relationship to Node</code></pre>
                        <p>But SQLAlchemy gets confused:</p>
                        <p className="--indented-meaning-text"><i>"Which ‘id’ is the parent’s primary key and which is the child referencing it?"</i></p>
                        <p><code>remote_side=</code> is how you tell SQLAlchemy:</p>
                        <p>→ “Use THAT side’s id as the target of the foreign key.”</p>
                        <p>Specifically:</p>
                        <ul>
                            <li><code>local_side=</code> &rarr; <code>node_id</code> (the FK column)</li>
                            <li><code>remote_side=</code> &rarr; id (the PK you are pointing at)</li>
                        </ul>
                        <p>If you DON'T put <code>remote_side</code>, SQLAlchemy cannot disambiguate self-references and throws errors.</p>
                        <p>So think of <code>remote_side=</code> as:</p>
                        <p className="--indented-meaning-text">"SQLAlchemy, the foreign key points to THAT id."</p>
                        <div className="--check-bullet">
                            <p>Only needed for self-referential relationships.</p>
                            <p>Needed ONLY when using a single relationship column like node_id.</p>
                        </div>
                    </div>
                </article>
            </section>
            <hr />

            <section>
                <h2>2. The Big Problem: Circular Relationships</h2>
                <article>
                    <p>This version breaks when you try:</p>
                    <pre><code>node1 → node2 → node3 → node1</code></pre>
                    <p>That's a cycle.</p>
                    <p>SQLite (and the ORM’s flush order resolver) cannot handle inserting these records in the correct dependency order because:</p>
                    <ul>
                        <li>each insert depends on another node that doesn’t exist yet</li>
                        <li>circular foreign key chains cause integrity errors</li>
                    </ul>
                    <p>That's why <code><a href="#sqlalchemy-self-relationship__code-context" style={{color: "white"}}>add_value_circ_depend()</a></code> fails in the simple version.</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>3. Why an Association Table Fixes It</h2>
                <article>
                    <p>Tutor's "working version":</p>
                    <pre><code>
{`class NodeAssociation(Base):
    __tablename__ = 'node_associations'

    id = Column(Integer, primary_key=True)
    current_node_id = Column(Integer, ForeignKey('nodes.id'))
    next_node_id = Column(Integer, ForeignKey('nodes.id'))`}
                    </code></pre>
                    <p>and</p>
                    <pre><code>
{`class Node(Base):
    __tablename__ = 'nodes'

    id = Column(Integer, primary_key=True)
    value = Column(Integer, nullable=False)

    next_node = relationship(
        'Node',
        secondary='node_associations',
        primaryjoin='NodeAssociation.current_node_id==Node.id',
        secondaryjoin='NodeAssociation.next_node_id==Node.id',
        uselist=False)

    def __repr__(self):
        return f"&lt;Node value={self.value}>"`}
                    </code></pre>
                    
                    <div>
                        <h3>✔️Why do we need an association table?</h3>
                        <p>Because cycles break the simple FK system.</p>
                        <p>With an association table:</p>
                        <ul>
                            <li><strong>nodes</strong> table:</li>
                            <p>&ndash; only stores basic node info</p>
                            <li><strong>node_associations</strong> table:</li>
                            <p>&ndash; stores relationships between nodes</p>
                        </ul>
                        <p>Instead of storing “next node” inside the same row, you store it <b>externally</b>, like:</p>
                        <p style={{display: "flex", justifyContent: "center", gap: ".5em"}}>class <code>node_associations</code></p>
                        <table>
                            <thead>
                                <tr>
                                    <th>current_node_id</th>
                                    <th>next_node_id</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>1</td>
                                </tr>
                            </tbody>
                        </table>

                        <p>This solves everything because:</p>
                        <ul>
                            <li>inserts are independent</li>
                            <li>relationships don’t require “future” nodes to already exist</li>
                            <li>circular chains no longer cause constraint issues</li>
                        </ul>
                    </div>
                </article>
            </section>
            <hr />

            <section>
                <h2>
                    4. What <code className="hiligt"><a href="#sqlalchemy-self-relationship__code-context" style={{color: "white"}}>primaryjoin</a></code> and 
                    <code className="hiligt"><a href="#sqlalchemy-self-relationship__code-context" style={{color: "white"}}>secondaryjoin</a></code> mean
                </h2>
                <article>
                    <p>These confuse everyone. Here’s the simplest possible breakdown.</p>
                    <p>You are telling SQLAlchemy:</p>
                    <div className="--check-bullet-h3">
                        <h3>How to match the current node to its association row</h3>
                        <p><code><a href="#sqlalchemy-self-relationship__code-context" style={{color: "white"}}>primaryjoin</a></code>:</p>
                        <pre><code><span className="--orange">"NodeAssociation.current_node_id == Node.id"</span></code></pre>
                        <p>Meaning:</p>
                        <p>“I am looking for rows in the association table whose <code>current_node_id</code> is me.”</p>
                        
                        <h3>How to match the association row to the next node</h3>
                        <p><code><a href="#sqlalchemy-self-relationship__code-context" style={{color: "white"}}>secondaryjoin</a></code>:</p>
                        <pre><code><span className="--orange">"NodeAssociation.next_node_id == Node.id"</span></code></pre>
                        <p>Meaning:</p>
                        <p>“From that row, get the Node whose ID equals <code>next_node_id</code>.”</p>
                    </div>
                </article>
            </section>
            <hr />

            <section>
                <h2>Why <code className="hiligt">uselist=False</code></h2>
                <article>
                    <p>You want:</p>
                    <pre><code>node.next_node → a single node</code></pre>
                    
                    <p>NOT:</p>
                    <pre><code>node.next_node → [node2, node5, node9]</code></pre>

                    <p>Setting <code>uselist=False</code> forces a 1-to-1 behavior even though you're using a many-to-many-style table.</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>6. Mental Model Summary</h2>
                <article>
                    <div>
                        <h3>Version 1 (simple)</h3>
                        <p>1. <strong>Nodes</strong> table</p>
                        <ul>
                            <li><code>id</code></li>
                            <li><code>value</code></li>
                            <li><code>node_id</code> &rarr; foreign key to <code>nodes.id</code></li>
                        </ul>
                        <p>This breaks if you try to form cycle.</p>
                    </div>

                    <div>
                        <h3>Version 2 (association table)</h3>
                        <ol>
                            <li><strong>Nodes</strong> table</li>
                            <ul>
                                <li><code>id</code></li>
                                <li><code>value</code></li>
                            </ul>

                            <li><strong>node_associations</strong> table</li>
                            <ul>
                                <li><code>id</code></li>
                                <li><code>current_node_id</code> &rarr; <code>nodes.id</code></li>
                                <li><code>next_node_id</code> &rarr; <code>nodes.id</code></li>
                            </ul>
                        </ol>

                        <p>SQLAlchemy now connects them like:</p>
                        <pre><code>Node → NodeAssociation → Node</code></pre>
                    </div>
                </article>
            </section>
            <hr />

            <section>
                <h2>7. Why the association table is more flexible</h2>
                <article>
                    <p>It supports:</p>
                    <ul>
                        <li>cycles</li>
                        <li>multiple next-nodes (if you remove <code>uselist=False</code>)</li>
                        <li>complex graphs structures</li>
                        <li>branching</li>
                        <li>bi-directional or directional edges</li>
                    </ul>
                    <p>It's a general-purpose solution for graphs.</p>
                    <p>This is why every graph database, linked-list simulation, or adjacency structure uses association/bridge/edge tables.</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>8. Quick Comparison Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Concept</th>
                            <th>Simple FK Version</th>
                            <th>Association Version</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Self-reference allowed</td>
                            <td>✔️Yes</td>
                            <td>✔️Yes</td>
                        </tr>
                        <tr>
                            <td>Cycle allowed</td>
                            <td>❌No</td>
                            <td>✔️Yes</td>
                        </tr>
                        <tr>
                            <td>Needs <code>remote_side</code></td>
                            <td>✔️Yes</td>
                            <td>❌No</td>
                        </tr>
                        <tr>
                            <td>Needs <code>primaryjoin</code> & <code>secondaryjoin</code></td>
                            <td>❌No</td>
                            <td>✔️Yes</td>
                        </tr>
                        <tr>
                            <td>Support graph-like relationships</td>
                            <td>Weak</td>
                            <td>Strong</td>
                        </tr>
                        <tr>
                            <td>Best for...</td>
                            <td>Simple linked list</td>
                            <td>Any directional graph</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <hr />

            <section>
                <h2 id="sqlalchemy-self-relationship__code-context">Code context for what codes it is referring to</h2>
                <article>
                    <pre><code>
{`from sqlalchemy import create_engine, ForeignKey, Column, String, Integer
from sqlalchemy.orm import sessionmaker, declarative_base, relationship

rel_path = fr'Projects\Flask\practice project\sqlalchemy_test\from_tutorial_vids\relationship_to_itself'
engine = create_engine(f'sqlite:///{rel_path}/relationship_to_itself.db')

Base = declarative_base()

Session = sessionmaker(bind=engine)
session = Session()

class NodeAssociation(Base):
    __tablename__ = 'node_associations'

    id = Column(Integer, primary_key=True)
    current_node_id = Column(Integer, ForeignKey('nodes.id'))
    next_node_id = Column(Integer, ForeignKey('nodes.id'))

class Node(Base):
    __tablename__ = 'nodes'

    id = Column(Integer, primary_key=True)
    value = Column(Integer, nullable=False)

    next_node = relationship(
        'Node',
        secondary='node_associations', 
        primaryjoin='NodeAssociation.current_node_id==Node.id',
        secondaryjoin='NodeAssociation.next_node_id==Node.id',
        uselist=False)

    def __repr__(self):
        return f"&lt;Node value={self.value}>"

 
# Simple Relationship (but prone to circular dependency error)
# class Node(Base):
#     __tablename__ = 'nodes'

#     id = Column(Integer, primary_key=True)
#     value = Column(Integer, nullable=False)

#     node_id = Column(Integer, ForeignKey('nodes.id'))
#     next_node = relationship('Node', remote_side=[id], uselist=False)

#     def __repr__(self):
#         return f"&lt;Node value={self.value}, next node={self.next_node}>"
    

Base.metadata.create_all(engine)

def add_value():
    node1 = Node(value=1)
    node2 = Node(value=2)
    node3 = Node(value=3)

    node1.next_node = node2
    node2.next_node = node3
    
    session.add_all([node1, node2, node3])
    session.commit()


def add_value_circ_depend():
    node1 = Node(value=1)
    node2 = Node(value=2)
    node3 = Node(value=3)

    node1.next_node = node2
    node2.next_node = node3
    node3.next_node = node1
    
    session.add_all([node1, node2, node3])
    session.commit()


add_value_circ_depend()

test = session.query(Node).all()

for idx, node in enumerate(test, start=1):
    print(f"{idx}. {node.value=}, {node.next_node=}")`}
                    </code></pre>
                </article>
            </section>
        </div>
    )
}