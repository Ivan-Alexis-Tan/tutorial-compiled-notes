import PythonBasics from "../contents/python/PythonBasics"
import FastAPIGuide from "../contents/python/FastAPIGuide"
import FlaskGuide from "../contents/python/FlaskGuide"
import DjangoGuide from "../contents/python/DjangoGuide"
import SQLAlchemyGuide from "../contents/python/SQLAlchemyGuide"
import AsyncIOGuide from "../contents/python/AsyncIOGuide"
import AlembicGuide from "../contents/python/AlembecGuide"
import FastApiJwt from "../contents/python/FastApiJwtGuide"

export const pythonGuidesRoute = [
    {
        path: 'pyguide1/:id',
        element: <PythonBasics />
    },
    {
        path: 'pyguide2/:id',
        element: <FastAPIGuide />
    },
    {
        path: 'pyguide3/:id',
        element: <FlaskGuide />
    },
    {
        path: 'pyguide4/:id',
        element: <DjangoGuide />
    },
    {
        path: 'pyguide5/:id',
        element: <SQLAlchemyGuide />
    },
    {
        path: 'asyncioguide/:id',
        element: <AsyncIOGuide />
    },
    {
        path: 'alembicguide/:id',
        element: <AlembicGuide />
    },
    {
        path: 'fastapijwtguide/:id',
        element: <FastApiJwt />
    }
]

export const pythonProjectsRoute = [
    
]