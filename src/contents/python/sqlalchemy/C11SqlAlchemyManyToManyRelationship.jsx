export default function C11SqlAlchemyManyToManyRelationship() {
    return (
        <div>
            <section>
                <div className="--title-id-nav">
                    <h1>SQLAlchemy Many-to-Many Relationships</h1>
                    <p><a href="#sqlalchemy-m2m-code-context">Full Code Context</a></p>
                </div>
                <ul>
                    <li><a href="{{ url_for('views.sqlachemy_m2m_coding_variation') }}">Example of Ways to Code</a></li>
                </ul>
            </section>
            <hr />

            <section>
                <h2>1. The Core Idea</h2>
                <article>
                    <ul>
                        <li>One record can be linked to <i>many</i> records on the other side.</li>
                        <li>And those records can link back to <i>many</i> on the first side.</li>
                    </ul>

                    <div>
                        <p>Example:</p>
                        <p>Doctors ↔ Patients</p>
                        <p>Users ↔ Users (following system)</p>
                    </div>

                    <p>A many-to-many <strong>always needs a third table</strong>, called an <strong>association table</strong>.</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>Two Types of Many-to-Many Designs</h2>
                <p>There are <strong>two major designs</strong>, and they have different uses:</p>
                <article>
                    <div>
                        <h3>A. Simple Association Table (NO extra columns)</h3>
                        <p>For <i>pure linking</i>, no extra data.</p>
                        <p>Example structure:</p>
                        <ul>
                            <li>student</li>
                            <li>course</li>
                            <li>student_course &larr; (just links student and course)</li>
                        </ul>
                        <p><strong>Implementation:</strong></p>
                        <p>Use a <code>Table</code> with <code>relationship(... secondary=association_table ...)</code>.</p>

                        <p>✔️Best for pure linking:</p>
                        <p>❌Cannot store extra details (e.g., enrollment date, grade)</p>
                    </div>

                    <div>
                        <h3>B. Association <i>Object</i> (association table AS a model)</h3>
                        <p>Used when the link <strong>has extra details</strong>.</p>
                        <p>Example structure (your Appointment example):</p>
                        <ul>
                            <li>doctor</li>
                            <li>patient</li>
                            <li>appointment &larr; (has notes, date, metadata)</li>
                        </ul>
                        <p>Here the "assosciation" is a <strong>first-class model</strong>:</p>
                        <ul>
                            <li>It has its own columns</li>
                            <li>It stores details</li>
                            <li>It manages the relationship</li>
                        </ul>
                        <div className="--check-bullet">
                            <p>Best when the link needs metadata</p>
                            <p>Cleaner to query</p>
                            <p>More realistic for real systems (e.g., hospital, orders, tags)</p>
                        </div>
                        <p>❌Slightly more code</p>
                    </div>
                </article>
            </section>
            <hr />

            <section>
                <h2>3. Example 1 &mdash; Appointments</h2>
                <article>
                    <pre><code>
{`class Appointment(Base):
    doctor_id = ForeignKey('doctors.id')
    patient_id = ForeignKey('patients.id')
    notes = Column(...)
    appointment_date = Column(...)`}
                    </code></pre>
                    Here:
                    <ul>
                        <li><strong>Doctor ↔ Appointment</strong> is 1-to-many</li>
                        <li><strong>Patient ↔ Appointment</strong> is 1-to-many</li>
                    </ul>
                    <p>Put together → effectively a <i>many-to-many but with extra metadata</i>.</p>

                    <div className="--check-bullet-h3">
                        <h3>Recommended design when:</h3>
                        <ul>
                            <li>The linking event/object has <b>details</b> (notes, date, price, metadata)</li>
                            <li>You often query the link itself (appointments)</li>
                        </ul>
                        <h3>Using <code className="hiligt">backref</code> is fine here</h3>
                        <p>Because this is <strong>two 1-to-many relationships</strong>, not a true M2M.</p>
                    </div>
                </article>
            </section>
            <hr />

            <section>
                <h2>4. Example 2 &mdash; Following Users</h2>
                <article>
                    <p>This is a <strong>self-referential many-to-many</strong>.</p>
                    <ul>
                        <li><code>user_associations</code></li>
                        <ul>
                            <li><code>follower_id</code></li>
                            <li><code>following_id</code></li>
                        </ul>
                        <li><code>users</code></li>
                    </ul>
                    
                    <div>
                        <h3>Why the relationship is complicated?</h3>
                        <p>Because SQLAlchemy must know:</p>
                        <ul>
                            <li>What column connects the left side (User)</li>
                            <li>What column connects the right side (also User)</li>
                        </ul>
                        <p>So use:</p>
                        <ul>
                            <li><code>primaryjoin = follower_id == user.id</code></li>
                            <li><code>secondaryjoin = following_id == user.id</code></li>
                        </ul>
                        <p>This tells SQLAlchemy:</p>
                        <ul>
                            <li><i>When I ask for user.following → use follower_id → following_id</i></li>
                            <li><i>When I ask for user.followers → use following_id → follower_id</i></li>
                        </ul>
                        <p>This is normal in self-referential M2M.</p>
                    </div>

                    <div>
                        <h3>✔️This design is correct when:</h3>
                        <ul>
                            <li>Both sides are the same model</li>
                            <li>No extra metadata is needed</li>
                            <li>Relationship direction matters (A follows B, but B may not follow A)</li>
                        </ul>
                    </div>
                </article>
            </section>
            <hr />

            <section>
                <h2>5. <code className="hiligt">backref=</code> vs <code className="hiligt">back_populates=</code></h2>
                <article>
                    <p><strong>Quick rule:</strong></p>
                    <table>
                        <thead>
                            <tr>
                                <th>When to Use</th>
                                <th>Why</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>backref=</code></td>
                                <td>Auto-creates reverse side. Good for simple cases.</td>
                            </tr>
                            <tr>
                                <td><code>back_populates=</code></td>
                                <td>Explicitly define both sides. Safer for complex models.</td>
                            </tr>
                        </tbody>
                    </table>
                    <p><strong>In complex M2M or self-referential M2M</strong> → prefer <code>back_populates=</code></p>
                    <p>But both are acceptable.</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>6. When to Use Each Many-to-Many Pattern</h2>
                <article>
                    <div>
                        <h3>Pattern A: Simple <code className="hiligt">secondary</code> Table</h3>
                        <p>Use when:</p>
                        <ul>
                            <li>No extra data in the link</li>
                            <li>Simple tag-like relationship</li>
                        </ul>
                        <p>Examples:</p>
                        <ul>
                            <li>Students ↔ Courses</li>
                            <li>Posts ↔ Tags</li>
                            <li>Users ↔ Courses</li>
                        </ul>
                    </div>

                    <div>
                        <h3>Pattern B: Association Object Model</h3>
                        <p>Use when the relationship itself <strong>has meaning or data</strong>.</p>
                        <p>Examples:</p>
                        <ul>
                            <li>Appointments</li>
                            <li>Orders</li>
                            <li>Memberships with start_date, end_date</li>
                            <li>Employee ↔ Project with hours_worked</li>
                        </ul>
                        <p>This is exactly why your appointments model is correct.</p>
                    </div>

                    <div>
                        <h3>Pattern C: Self-Referential Many-to-Many</h3>
                        <p>Use when:</p>
                        <ul>
                            <li>The same table links to itself</li>
                            <li>The direction matters (A follows B)</li>
                        </ul>
                        <p>Examples:</p>
                        <ul>
                            <li>Social media: followers/following</li>
                            <li>Blocking system</li>
                            <li>Friend requests</li>
                        </ul>
                        <p>This is your <strong>UserAssociation</strong> example.</p>
                    </div>
                </article>
            </section>
            <hr />

            <section>
                <h2>7. Key Takeaways</h2>
                <article>
                    <div className="--check-bullet-h3">
                        <h3>Not all many-to-many tables are equal</h3>
                        <p>Some are simple bridges, some are full models.</p>

                        <h3>The Appointment design is recommended</h3>
                        <p>Because appointments have attributes — so they must be their own model.</p>

                        <h3>The Follower system requires <code className="hiligt">primaryjoin</code> / <code className="hiligt">secondaryjoin</code></h3>
                        <p>Self-referential = must declare which direction is which.</p>

                        <h3><code className="hiligt">backref=</code> is fine in simple cases</h3>
                        <p>But for clarity and large apps, <code>back_populates=</code> is safer.</p>

                        <h3>Association object = more realistic, more flexible</h3>
                        <p>Most real projects eventually need this.</p>
                    </div>
                </article>
            </section>
            <hr />

            <section id="sqlalchemy-m2m-code-context">
                <h2>8. Code Context:</h2>
                <article>
                    <div>
                        <h3>Student and Course Models:</h3>
                        <pre><code>
{`Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()

# Association Table
# student_course_link = Table('student_course', Base.metadata,
#     Column('student_id', Integer, ForeignKey('student.id')),
#     Column('course_id', Integer, ForeignKey('course.id'))
# )

class StudentCourse(Base):
    __tablename__ = 'student_courses'

    id = Column(Integer, primary_key=True)
    student_id = Column('student_id', Integer, ForeignKey('students.id'))
    course_id = Column('course_id', Integer, ForeignKey('courses.id'))


class Student(Base):
    __tablename__ = 'students'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    courses = relationship(
        'Course', 
        secondary='student_courses',
        back_populates='students'
    )


class Course(Base):
    __tablename__ = 'courses'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    students = relationship(
        'Student', 
        secondary='student_courses',
        back_populates='courses'
    )


Base.metadata.create_all(engine)

def add_data():
    math = Course(title='Mathematics')
    physics = Course(title='Physics')
    
    bill = Student(name='Bill', courses=[math, physics])
    rob = Student(name='Rob', courses=[math])

    session.add_all([bill, rob, math, physics])
    session.commit()


def view_student_courses(student_name:str) -> None:
    student = session.query(Student).filter_by(name=student_name).first()
    courses = [courses.title for courses in student.courses]
    print(f"{student_name}'s Courses: {', '.join(courses)}")`}
                        </code></pre>
                    </div>

                    <div>
                        <h3>Doctor and Patient Models:</h3>
                        <pre><code>
{`class Appointment(Base):
    __tablename__ = 'appointments'

    id = Column(Integer, primary_key=True)
    doctor_id = Column(Integer, ForeignKey('doctors.id'))
    patient_id = Column(Integer, ForeignKey('patients.id'))
    appointment_date = Column(DateTime, default=datetime.utcnow)
    notes = Column(String) 

    doctor = relationship('Doctor', backref='appointments')
    patient = relationship('Patient', backref='patients')


class Doctor(Base):
    __tablename__ = 'doctors'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    specialty = Column(String)


class Patient(Base):
    __tablename__ = 'patients'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    dob = Column(DateTime)

Base.metadata.create_all(engine)


def add_data():
    dr_smith = Doctor(name='Dr. Smith', specialty='Cardiology')
    john_doe = Patient(name='John Doe', dob=datetime(1990, 1, 1))
    
    appointment = Appointment(doctor=dr_smith, patient=john_doe, notes='Routine check-up')

    session.add_all([appointment, dr_smith, john_doe])
    session.commit()


def query_doctor(doctor_name:str):
    appointment = session.query(Appointment).filter(Appointment.doctor.has(name=doctor_name)).all()

    print(f"{doctor_name}'s appointments: {appointment}")


def query_patient(patient_name:str):
    appointment = session.query(Appointment).filter(Appointment.patient.has(name=patient_name)).all()

    print(f"{patient_name}'s appointments: {appointment}")`}
                        </code></pre>
                    </div>

                    <div>
                        <h3>Follwer and Following M2M DB:</h3>
                        <pre><code>
{`class UserAssociation(Base):
    __tablename__ = 'user_associations'

    id = Column(Integer, primary_key=True)

    follower_id = Column(Integer, ForeignKey('users.id'))
    following_id = Column(Integer, ForeignKey('users.id'))


class User(Base):
    __tablename__ = 'users'

    id = <Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    following = relationship(
        'User',
        secondary='user_associations',
        primaryjoin='UserAssociation.follower_id==User.id',
        secondaryjoin='UserAssociation.following_id==User.id',
        backref='followers'
    )

    def __repr__(self):
        return f'&lt;User: {self.name}>'
    

Base.metadata.create_all(engine)

def add_data():
    user_1 = User(name='John')
    user_2 = User(name='Rob')
    user_3 = User(name='Kyle')

    user_1.following.append(user_2)
    user_2.following.append(user_3)
    user_3.following.append(user_1)

    all_users = [user_1, user_2, user_3]

    session.add_all(all_users)
    session.commit()

    for user in all_users:
        print(f'{user} is following: {user.following}')
        print(f"{user} is being followed by: {user.followers}")
        print('-------------')`}
                        </code></pre>
                    </div>
                </article>
            </section>
        </div>
    )
}