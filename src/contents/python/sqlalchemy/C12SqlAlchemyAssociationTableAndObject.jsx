export default function C12SqlAlchemyAssociationTableAndObject() {
    return (
        <div>
            <section>
                <h1>SQLAlchemy Association Table and Objects</h1>
            </section>
            <hr />

            <section>
                <h2>Association Tables</h2>
                <article>
                    <h3>1. Article and Tag Tables (Many-to-Many Relationship)</h3>
                    <pre><code>
{`# Declarative Base
class BaseModel(DeclarativeBase):
    __abstract__ = True

    id: Mapped[int] = mapped_column(Integer, primary_key=True)


# Association Table
article_tag_assotable = Table(
    'article_tags',
    BaseModel.metadata,
    Column('article_id', ForeignKey('articles.id'), primary_key=True),
    Column('tag_id', ForeignKey('tags.id'), primary_key=True)
)

# Models
class Article(BaseModel):
    __tablename__ = 'articles'

    title: Mapped[str] = mapped_column(String(150))

    tags: Mapped[list['Tag']] = relationship(
        'Tag',
        back_populates='articles',
        secondary=article_tag_assotable
    )


class Tag(BaseModel):
    __tablename__ = 'tags'

    name: Mapped[str] = mapped_column(String(150))

    articles: Mapped[list['Article']] = relationship(
        'Article',
        back_populates='tags',
        secondary=article_tag_assotable
    )`}
                    </code></pre>

                    <div>
                        <h3>2. Product Compatibility (Self Many-to-Many Relationship)</h3>
                        <pre><code>
{`class BaseModel(DeclarativeBase):
    __abstract__ = True

    id: Mapped[int] = mapped_column(Integer, primary_key=True)


# Assocation Table
product_compatibility = Table(
    'product_compatibilities',
    BaseModel.metadata,
    Column('product_1', ForeignKey('products.id')),
    Column('product_2', ForeignKey('products.id'))
)

# Model
class Product(BaseModel):
    __tablename__ = 'products'

    name: Mapped[str] = mapped_column(String(150))

    product_compatibility = relationship(
        "Product",
        secondary=product_compatibilities,
        primaryjoin=Product.id == product_compatibilities.c.product_1,
        secondaryjoin=Product.id == product_compatibilities.c.product_2
    )`}
                        </code></pre>
                        <pre><code>
{`Base = declarative_base()

# --- 1) Association table (plain table, no ORM class) ---
product_compatibility = Table(
    "product_compatibility",
    Base.metadata,
    Column("product_id", Integer, ForeignKey("products.id"), primary_key=True),
    Column("compatible_product_id", Integer, ForeignKey("products.id"), primary_key=True),
    # optional: prevent duplicate pairs like (A,B) repeated
    # UniqueConstraint("product_id", "compatible_product_id", name="uq_product_pair")
)

# --- 2) Product model ---
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String(150), nullable=False)

    # The self-referential many-to-many relationship:
    compatibles = relationship(
        "Product",                                                            
        secondary=product_compatibility,                                        
        primaryjoin=id == product_compatibility.c.product_id,
        secondaryjoin=id == product_compatibility.c.compatible_product_id,
        backref="compatible_with"
    )

    def __repr__(self):
        return f"<Product id={self.id} name={self.name!r}>"

# --- 3) Demo usage ---
def demo():
    engine = create_engine("sqlite:///:memory:", echo=False, future=True)
    Base.metadata.create_all(engine)

    with Session(engine) as session:
        # create products
        a = Product(name="Product A")
        b = Product(name="Product B")
        c = Product(name="Product C")

        session.add_all([a, b, c])
        session.commit()  # assign ids

        # make A compatible with B, and B compatible with C (directional inserts)
        # This inserts rows into the association table:
        a.compatibles.append(b)  # creates (A -> B)
        b.compatibles.append(c)  # creates (B -> C)
        session.commit()

        # Query and print
        print("a.compatibles ->", a.compatibles)  # expected: [Product B]
        print("b.compatibles ->", b.compatibles)  # expected: [Product C]
        print("b.compatible_with ->", b.compatible_with)  # expected: [Product A]

        # If you want a symmetric relationship (A <-> B), add both directions:
        # Make A and C mutual
        a.compatibles.append(c)   # A -> C
        c.compatibles.append(a)   # C -> A  (to make it mutual)
        session.commit()

        print("a.compatibles after adding c ->", a.compatibles)
        print("c.compatible_with ->", c.compatible_with)

if __name__ == "__main__":
    demo()`}
                    </code></pre>
                    </div>
                </article>
            </section>
            <hr />

            <section>
                <h2>Association Object</h2>
                <article>
                    <h3>1. Product Compatibility (Self Many-to-Many Relationship)</h3>
                    <pre><code>
{`from sqlalchemy import Integer, String, ForeignKey, UniqueConstraint, Index
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class BaseModel(DeclarativeBase):
    __abstract__ = True

    id: Mapped[int] = mapped_column(Integer, primary_key=True)


class ProductCompatibility(BaseModel):
    __tablename__ = 'product_compatibilities'

    product_1_id: Mapped[int] = mapped_column(ForeignKey('products.id'), nullable=False)
    product_2_id: Mapped[int] = mapped_column(ForeignKey('products.id'), nullable=False)

    product_1: Mapped["Product"] = relationship(
        "Product", foreign_keys=[product_1_id], back_populates="compatibilities_from"
    )
    product_2: Mapped["Product"] = relationship(
        "Product", foreign_keys=[product_2_id], back_populates="compatibilities_to"
    )

    __table_args__ = (
        UniqueConstraint('product_1_id', 'product_2_id', name='uq_product_pair'),
        Index('ix_product_1', 'product_1_id'),
        Index('ix_product_2', 'product_2_id'),
    )

    
class Product(BaseModel):
    __tablename__ = 'products'

    name: Mapped[str] = mapped_column(String(150), nullable=False)

    compatibilities_from: Mapped[list[ProductCompatibility]] = relationship(
        "ProductCompatibility",
        foreign_keys="[ProductCompatibility.product_1_id]",
        back_populates="product_1",
        cascade="all, delete-orphan",
    )
    compatibilities_to: Mapped[list[ProductCompatibility]] = relationship(
        "ProductCompatibility",
        foreign_keys="[ProductCompatibility.product_2_id]",
        back_populates="product_2",
        cascade="all, delete-orphan",
    )

    @property
    def compatible_products(self) -> list["Product"]:
        return [c.product_2 for c in self.compatibilities_from]`}
                    </code></pre>

                    <div>
                        <h3>2. Student &mdash; Course (Many-to-Many Relationship)</h3>
                        <pre><code>
{`class BaseModel(DeclarativeBase):
    __abstract__ = True
    
    id: Mapped[int] = mapped_column(primary_key=True)


# Association Object
class Enrollment(BaseModel):
    __tablename__ = 'enrollments'

    student_id: Mapped[int] = mapped_column(ForeignKey('students.id'))
    course_id: Mapped[int] = mapped_column(ForeignKey('courses.id'))
    grade: Mapped[str] = mapped_column(String)
    enrollment_date: Mapped[DateTime] = mapped_column(DateTime, default=datetime.utcnow)

    student: Mapped['Student'] = relationship(back_populates='enrollments')
    course: Mapped['Course'] = relationship(back_populates='enrollments')


# Models
class Student(BaseModel):
    __tablename__ = 'students'

    name: Mapped[str] = mapped_column(String(150))
    
    enrollments: Mapped[list['Enrollment']] = relationship(
        back_populates='student', 
        cascade='all, delete-orphan'
    )
    courses: Mapped[list['Course']] = relationship(
        secondary='enrollments',
        primaryjoin=id == Enrollment.student_id,
        secondaryjoin=Course.id == Enrollment.course_id,
        viewonly=True                                          #<- REQUIRED
    )


class Course(BaseModel):
    __tablename__ = 'courses'

    title: Mapped[str] = mapped_column(String(150))
    credits: Mapped[int] = mapped_column(Integer)

    enrollments: Mapped[list['Enrollment']] = relationship(
        back_populates='course', 
        cascade='all, delete-orphan'
    )
    students: Mapped[list['Student']] = relationship(
        secondary='enrollments',
        primaryjoin=id == Enrollment.course_id,
        secondaryjoin=Student.id == Enrollment.student_id,
        viewonly=True                                          #<- REQUIRED
    )


def add_data():
    # Create student and course
    student = Student(name="Alice")
    course = Course(title="Math", credits=3)

    # Create the association object
    enrollment = Enrollment(
        student=student,
        course=course,
        grade="A"
    )

    # Append it through the relationship
    student.enrollments.append(enrollment)          # Or: course.enrollments.append(enrollment)

    session.add_all([student, course])
    session.commit()`}
                        </code></pre>
                    </div>

                    <div>
                        <h3>3. User Table: follower-following (Self Many-to-Many Relationship)</h3>
                        <pre><code>
{`Base = declarative_base()

# Association Object
class UserAssociation(Base):
    __tablename__ = 'user_associations'

    id = Column(Integer, primary_key=True)

    follower_id = Column(Integer, ForeignKey('users.id'))
    following_id = Column(Integer, ForeignKey('users.id'))


# Model
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    following = relationship(
        'User',
        secondary='user_associations',
        primaryjoin='UserAssociation.follower_id==User.id',
        secondaryjoin='UserAssociation.following_id==User.id',
        backref='followers'
    )`}
                        </code></pre>
                    </div>
                </article>
            </section>
        </div>
    )
}