import { languageRoute } from "../../../routeData"

const titles = languageRoute('git').libTitles('base')

export default function GitIgnore() {
    return (
        <div>
            <h1>{titles[3]}</h1>

            <div>
                <h2>A. Backend Common <code>.gitignore</code> (FastAPI / Python)</h2>
                <pre><code>
{`</> Bash
# Python
__pycache__/
*.pyc

# Virtual environment
.venv/
venv/

# Environment variables
.env

# Logs
*.log

# Local DB (SQLite)
*.db

# Editor / OS
.vscode/
.idea/
.DS_Store
`}
                </code></pre>
            </div>

            <div>
                <h2>B. Frontend <code>.gitignore</code> (React / Vite / Next)</h2>

                <pre><code>
{`</> Bash
node_modules/
dist/
build/
.env
.env.local
`}
                </code></pre>
            </div>
        </div>
    )
}