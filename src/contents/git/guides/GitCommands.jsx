import { routeData } from "../../../routeData"

const titles = routeData.git.guides

export default function GitCommands() {
    return (
        <div>
            <h1>{titles[1]}</h1>

            <div>
                <h2>Basic Daily Flow</h2>
                <pre><code>
{`</> Bash
git status              <- what changed
git add .               <- stage all changes
git commit -m "<commit message>"
git push                <- upload to repo
`}
                </code></pre>
            </div>

            <div>
                <h2>Safer Staging (recommended)</h2>
                <pre><code>
{`</> Bash
git add -p
`}
                </code></pre>
                <p>Stages changes <strong>chunk by chunk</strong>.</p>
                <p>This is how devs avoid messy commits.</p>
            </div>

            <div>
                <h2>Common Commands</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Comand</th>
                            <th>What it does</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>git status</code></td>
                            <td>Show current state</td>
                        </tr>
                        <tr>
                            <td><code>git diff</code></td>
                            <td>See unstaged changes</td>
                        </tr>
                        <tr>
                            <td><code>git diff --staged</code></td>
                            <td>See staged changes</td>
                        </tr>
                        <tr>
                            <td><code>git log --oneline</code></td>
                            <td>Compact history</td>
                        </tr>
                        <tr>
                            <td><code>git commit --amend</code></td>
                            <td>Fix last commit</td>
                        </tr>
                        <tr>
                            <td><code>git restore {`<file>`}</code></td>
                            <td>Discard changes</td>
                        </tr>
                        <tr>
                            <td><code>git restore --staged {`<file>`}</code></td>
                            <td>Unstage</td>
                        </tr>
                        <tr>
                            <td><code>git pull</code></td>
                            <td>Fetch + merge</td>
                        </tr>
                        <tr>
                            <td><code>git fetch</code></td>
                            <td>Fetch only</td>
                        </tr>
                        <tr>
                            <td><code>git checkout -b {`<branch-name>`}</code></td>
                            <td>Create the branch before switching</td>
                        </tr>
                        <tr>
                            <td><code>git switch -c {`<branch-name>`}</code></td>
                            <td>Create branch (use <code>-C</code> to force-create, overwriting if it exists)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Undo Mistakes</h2>
                <p>Haven't pushed yet? You're safe.</p>

                <h3>A. Forgot a file in last commit</h3>
                <pre><code>
{`</> Bash
git add <missing_file>
git commit --amend
`}
                </code></pre>

                <h3>B. Commit Message Typo</h3>
                <pre><code>
{`</> Bash
git commit --amend -m "<new_message>"
`}
                </code></pre>
            </div>
        </div>
    )
}