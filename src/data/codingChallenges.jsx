import SidebarTask1 from "../coding-challenges/css/sidebar/contents/SidebarTask1";

const codingChallengesData = {
    python: {},
    javascript: {
        text: "JavaScript",
        libraries: {
            vanilla: {
                challenges: {
                    1: {title: "Rest parameters", comp: <></>},
                }
            }
        }
    },
    html: {},
    css: {
        text: "CSS",
        libraries: {
            tailwind: {
                challenges: {
                    1: {title: "Sidebar Exercises", comp: <SidebarTask1 />},
                }
            },
        },
    },
}

export const challengeLanguages = Object.keys(codingChallengesData)

export function getChallengesData(language) {
    const challenge = codingChallengesData[language]

    function getLibraries() {
        return Object.keys(challenge.libraries)
    }

    function getChallenges(library) {
        return challenge.libraries[library].challenges
    }

    function getChallenge(library, id) {
        const challengeData = getChallenges(library)[id]
        return {
            title: challengeData["title"],
            component: challengeData["comp"]
        }
    }

    return {
        langTitle: challenge.text,
        libList: getLibraries,
        challenges: getChallenges,
        getChallenge: getChallenge,
    }
}
