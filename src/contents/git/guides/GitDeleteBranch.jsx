
export default function GitDeleteBranch() {
    return (
        <div>
            <h1>Delete Branch</h1>
            
            <div>
                <h2>1. Delete a Local Branch</h2>
                <p>You cannot delete the branch you are currently on.</p>
                <p>You must first switch to another branch (e.g., <code>main</code>).</p>
                <ul>
                    <li><h3>For Merged Branches:</h3></li>
                    <ul>
                        <li>If already been merged into your current branch:</li>
                        <pre><code>
{`</> Bash
git branch -d <branch_name>
`}
                        </code></pre>
                        <p>The <code>-d</code> flag is an alias for <code>--delete</code> and inlcudes a safety check to ensure changes aren't lost.</p>
                    </ul>

                    <li><h3>For Unmerged Branches (Force Delete):</h3></li>
                    <ul>
                        <pre><code>
{`</> Bash
git branch -D <branch_name>
`}
                        </code></pre>
                        <li>This is an alias for <code>git branch --delete --force</code>.</li>
                        <li>Uppercase <code>-D</code> flag: delete a branch regardless of its merge status.</li>
                    </ul>
                </ul>
            </div>

            <div>
                <h2>2. Delete a Remote Branch</h2>
                <p>Deleting a local branch does not automatically remove it from the remote server.</p>
                <ul>
                    <li><strong>Standard Command:</strong></li>
                    <pre><code>
{`</> Bash
git push origin --delete <branch_name>
`}
                    </code></pre>

                    <li><strong>Shortened Syntax</strong></li>
                    <pre><code>
{`</> Bash
git push origin :<branch_name>
`}
                    </code></pre>
                    <li>This older syntax "pushes nothing" to the remote branch, effectively deleting it.</li>
                </ul>
            </div>

            <div>
                <h2>3. Clean Up Remote References (Pruning)</h2>
                <p>After a remote branch is deleted by someone else, your local machine may still show it in your remote-tracking list (e.g., <code>origin/feature-branch</code>)</p>
                <p>To sync your local list and remove these "stale" references, run:</p>
                <pre><code>
{`</> Bash
git fetch --all --prune
`}
                </code></pre>
                <p>Alternatively, use <code>git remote prune origin</code> to specifically clean up the references for that remote.</p>
            </div>

            <div>
                <h2>4. Alternative Methods (Web UI & IDEs)</h2>
                <ul>
                    <li><h3>GitHub/GitLab:</h3></li>
                    <ol>
                        <li>Navigate to the <strong>Branches</strong> tab of repo on the web</li>
                        <li>Click the <strong>Trash Can</strong> icon next to the branch name</li>
                    </ol>

                    <li><h3>VS Code:</h3></li>
                    <ol>
                        <li>Open the <strong>Command Palette</strong> (<code>ctrl + shift + P</code>)</li>
                        <li>Type "Git: Delete Branch</li>
                        <li>Select the branch from the list</li>
                    </ol>

                    <p>Must not be currently checked out to that branch</p>
                </ul>
            </div>
        </div>
    )
}