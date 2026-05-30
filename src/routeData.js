const routeData = {
    python: {
        text: "Python",
        libraries: {
            basics: {
                text: 'Python Basics',
                titles: {
                    '1': 'basics 1',
                    '2': 'basics 2',
                    '3': 'basics 3',
                },
                guideCode: 'pyguide1',
            },
            fastapi: {
                text: 'FastAPI',
                titles: {
                    '1': 'FastAPI 1',
                    '2': 'HTTP Status Code',
                    '3': 'FastAPI 3',
                },
                guideCode: 'pyguide2',
            },
            flask: {
                text: 'Flask',
                titles: {
                    '1': 'Flask 1',
                    '2': 'Flask 2',
                    '3': 'Flask 3',
                },
                guideCode: 'pyguide3',
            },
            django: {
                text: 'Django',
                titles: {
                    '1': 'Django 1',
                    '2': 'Django 2',
                    '3': 'Django 3',
                },
                guideCode: 'pyguide4',
            },
            sqlalchemy: {
                text: "SQLAlchemy",
                titles: {
                    1: 'SQLAlchemy Intro Guide',
                    2: 'SQLAlchemy Guide',
                    3: 'SQLAlchemy ORM — CRUD',
                    4: 'SQLAlchemy order_by Guide',
                    5: 'SQLAlchemy Data Handling',
                    6: 'SQLAlchemy Filtering Guide',
                    7: 'SQLAlchemy Grouping and Chaining',
                    8: 'SQLAlchemy Joins',
                    9: 'SQLAlchemy Defer',
                    10: 'SQLAlchemy One-to-Many Relationship',
                    11: 'SQLAlchemy Many-to-Many Relationship',
                    12: 'SQLAlchemy Association Table and Objects',
                    13: 'SQLAlchemy 2.0 Relationship',
                    14: 'SQLAlchemy Self-Relationship & Circular Dependencies',
                },
                guideCode: 'pyguide5',
            },
            asyncio: {
                text: 'AsyncIO',
                titles: {
                    1: 'AsyncIO Introduction',
                    2: 'Coroutine',
                    3: 'Tasks',
                    4: 'Gather Function',
                    5: '"asyncio.TaskGroup( )" Function',
                    6: 'Futures',
                    7: 'Synchronization',
                },
                guideCode: 'asyncioguide',
            },
            alembic: {
                text: 'Alembic',
                titles: {
                    1: 'Installation and Setup',
                    2: "Creating Revision",
                    3: "Common Alembic Commands"
                },
                guideCode: 'alembicguide'
            },
            fastapijwt: {
                text: "FastAPI JWT Auth",
                titles: {
                    1: 'Installation and Setup',
                    2: 'User Registration (Sign up)',
                    3: "User Login",
                    4: "User Validation and Authorization"
                },
                guideCode: "fastapijwtguide"
            },
        },
    },
    javascript: {
        text: "JavaScript",
        libraries: {
            basics: {
                text: 'JavaScript Basics',
                guideCode: 'jsguide1',
                titles: {
                    1: 'HTML Display Using JS',
                    2: 'User Input',
                    3: 'Type Conversion',
                    4: '`const` Usage',
                    5: 'Math (built-in JS Object)',
                    6: 'Random Number Generator',
                    7: '`if`, `else if`, `else` Statements',
                    8: '`.checked` Property',
                    9: 'Ternary Operator',
                    10: '`switch-case` Statements',
                    11: 'String Methods',
                    12: 'String Slicing',
                    13: 'Logical Operators',
                    14: 'Strict Equality',
                    15: '`while` and `do( ){ } while( )` Loop',
                    16: '`for` Loop',
                    17: 'Functions',
                    18: 'Array',
                    19: 'Spread Operator',
                    20: 'Rest Parameters',
                    21: 'Callback',
                    22: '`forEach( )`',
                    23: '`.map( )`',
                    24: '`.filter( )`',
                    25: '`.reduce( )',
                    26: 'Fuction Declaration vs. Function Expression',
                    27: 'Arrow Functions',
                    28: 'Objects',
                    29: '`this`',
                    30: 'Constructor',
                    31: 'Class',
                    32: 'Static',
                    33: 'Inheritance',
                    34: 'Super',
                    35: 'Getter and Setter',
                    36: 'Destructuring',
                    37: 'Nested Objects',
                    38: 'Working witht Array of Objects',
                    39: '`.sort( )` Method',
                    40: 'Shuffling Elements of Array',
                    41: 'Date Objects',
                    42: 'Closure Function',
                    43: '`setTimeout( )` Function',
                    44: 'ES6 Module',
                    45: 'Synchronous and Asynchronous Codes',
                    46: 'Error Handling',
                    47: 'Document Object Model (DOM)',
                    48: 'Element Selectors',
                    49: 'DOM Navigation',
                    50: 'Add and Change HTML',
                    51: 'Event Listener',
                    52: 'Key Events',
                    53: 'Hide/show HTML',
                    54: '`NodeList`',
                    55: '`classList`',
                    56: 'Image Slider',
                    57: 'Callback Hell',
                    58: '`Promise` Object',
                    59: 'Async/Await',
                    60: 'JSON (JavaScript Object Notation)',
                    61: '`fetch()`',
                },
                projCode: 'jsproj',
                projects: {
                    1: 'Digital Clock',
                    2: 'Stopwatch',
                    3: 'Pokemon API DB',
                },
            },
            react: {
                text: 'React Framework',
                guideCode: 'reactGuide',
                titles: {
                    1: 'Creating React Environment',
                    2: 'Quick details about the Project Structure of React Application',
                    3: 'Components Basics',
                    4: 'Card Components',
                    5: 'Adding CSS Syles',
                    6: 'Props, PropTypes, and defaultProps (abandoned module)',
                    7: 'Conditional Rendering',
                    8: 'Rendering List',
                    9: 'Click Events',
                    10: 'React Hook and useState()',
                    11: 'onChange( )',
                    12: 'Updater Function',
                    13: 'Update Objects in State',
                    14: 'Update Arrays in State',
                    15: 'Update Array of Objects in State',
                    16: 'useEffect( )',
                    17: 'useContext( )',
                    18: 'useRef( )',
                    19: 'React Query (TanStack useQuery( ))',
                    20: 'React Zustand',
                    21: "React Hook Form",
                    22: "React Zod",
                    0: 'Connecting React to FastAPI'
                }
            },
            typescript : {
                text: "TypeScript",
                guideCode: "tsguide",
                titles: {
                    1: "Introduction to Typescript",
                    2: "Primitive Types",
                    3: "Arrays and Tuples",
                    4: "Literals and Enums",
                    5: "Any, Unknown and Type Casts",
                    6: "Optional Chaing and Bang",
                    7: "Basic Function Types",
                    8: "Advanced Function Types",
                    9: "Interfaces",
                    10: "Classes and Abstract Classes",
                    11: "Classes and Interfaces",
                    12: "Static Attributes & Methods",
                    13: "Generics",
                    14: "Advanced Types",
                    15: "Type Guards",
                    16: "Discriminated Union Types",
                    17: "Utility Types",
                    18: "Modules (Import/Export)",
                    19: "Module Settings and Configs",
                    20: "Namespaces",
                    21: "Type Syntax",
                },
            },
            nextjs: {
                text: "Next.js",
                guideCode: "nextjsguide",
                titles: {
                    1: "Installation and Setup",
                    2: "Creating Routes, Links, and Navigation",
                    3: "Working with Image files",
                    4: "Server Component vs. Client Component",
                    5: "Routing",
                    6: "Layouts",
                    7: "Error Handling",
                    8: "Loading UI, unauthorized, and forbidden",
                    9: "Data Fetching",
                    10: "API Routes",
                    11: "Caching",
                    12: "Commonly Used Hooks",
                    13: "Authentication",
                }
            },
            prisma: {
                text: "Prisma",
                guideCode: "prismaguide",
                titles: {
                    1: "Installation and Setup",
                    2: "Model Creation",
                    3: "Migrations",
                    4: "Prisma CRUD",
                    5: "Association Table",
                }
            },
        },
    },
    html: {
        text: 'HTML',
        libraries: {},
    },
    css: {
        text: 'CSS',
        libraries: {
            vanilla: {
                text: "Vanilla CSS",
                guideCode: "vanillacssguide",
                titles: {
                    1: "Combinators",
                    2: "Pseudo-classes",
                    3: "Positioning",
                    4: "Overflow Properties",
                    5: "Grid",
                    6: "Transformations",
                },
            },
            tailwind: {
                text: "Tailwind",
                guideCode: "tailwindguide",
                titles: {
                    1: "Installation and Setup",
                }
            }
        }
    },
    git: {
        text: 'Git',
        libraries: {
            base: {
                text: "Git",
                guideCode: "gitguide",
                titles: {
                    1: "Git Commands",
                    2: "Message Convention",
                    3: "Git Ignore",
                    4: "Deleting Commit",
                    5: "Create Branch",
                    6: "Merge Branch",
                    7: "Deleting Branch",
                }
            },
        },
    },
}

export const languages = Object.keys(routeData)

export function languageRoute(language) {
    const route = routeData[language] ?? null

    const libraries = route?.libraries ?? {}
    const libraryList = Object.keys(libraries)
    const initGuideCode = libraries[libraryList[0]]?.guideCode

    function validateLib(library) {
        if (!route) return false
        if (!libraryList.includes(library)) return false

        return true
    }

    function getLibraryData(library) {
        if (!validateLib(library)) return null
        
        return routeData[language].libraries[library] ?? null
    }

    function getGuideCode(library) {
        const validated = validateLib(library)
        if (!validated) return null

        return routeData[language].libraries[library].guideCode
    }

    function getLibTitles(library) {
        if (!validateLib(library)) return null
        return structuredClone(getLibraryData(library).titles)
    }

    function getProjects(library) {
        if (!validateLib(library)) return null
        return structuredClone(getLibraryData(library)?.projects) ?? {}
    }

    return {
        data: structuredClone(route),
        url: { 
            initUrl: `${libraryList[0]}/${initGuideCode}`,
            initLib: libraryList[0],
            initGuideCode: initGuideCode,
        },
        langTitle: route?.text,
        libraries: libraryList,
        libTitles: getLibTitles,
        libProjects: getProjects,
        libCode: getGuideCode,
        libData: getLibraryData,
    }
}