// Libraries
import { createBrowserRouter} from 'react-router-dom'

// Children Routes
import { pythonGuidesRoute } from './python.guides.route'
import { javascriptGuideRoute, javascriptProjectsRoute } from './javascript.guides.route'

// Layouts
import RootLayout from '../layout/RootLayout';
import ContentGuideLayout from '../layout/ContentGuideLayout';

// Page Components
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'

// Libraries/Framework Components ('Languages')
import GuidesLayout from '../layout/GuidesLayout';
import Projects from '../pages/Projects';
import LanguagePage from '../pages/Language';
import ProjectsLayout from '../layout/ProjectsLayout';
import GitGuides from '../contents/git/GitGuides';
import { cssGuideRoute } from './css.guides.route';
import LibraryPage from '../pages/LibrarayPage';
import CodingChallengeLanguages from '../coding-challenges/ChallengeLanguages';
import ChallengeTasks from '../coding-challenges/ChallengeTasks';
import ChallengesPage from '../coding-challenges/ChallengesPage';


export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },

            {
                path: 'home/git',
                element: <GitGuides />,
            },

            {   
                path: 'guides/:language/:library',
                element: <GuidesLayout />,
                children: [
                    ...pythonGuidesRoute,
                    ...javascriptGuideRoute,
                    ...cssGuideRoute,

                    {
                        path: 'projects',
                        element: <ProjectsLayout />,
                        children: [
                            ...javascriptProjectsRoute
                        ]
                    },
                ]
            },

            {
                path: "challenges/:language/:library",
                element: <ChallengeTasks />,
                children: [
                    // {
                    //     path: ":id",
                    //     element: <ChallengesPage />,
                    // },
                ],
            },

            {
                path: "challenges/:language/:library/:id",
                element: <ChallengesPage />,
                children: [],
            },

            {path: '*', element: <NotFound />},
        ]
    },

    
])