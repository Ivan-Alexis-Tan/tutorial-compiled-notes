
export default function GitDeleteCommit() {
    return (
        <div>
            <h1>Deleting Commit</h1>

            <div>
                <h2>1. Deleting the Most Recent Local Commit</h2>
                <p>If <i>not pushed the commit yet</i>, use <code>git reset</code> command.</p>
                <ul>
                    <li><h3>Keep your changes (Soft Reset):</h3></li>
                    <p>Removes the commit but keeps your work in the staging area so you can edit and re-commit.</p>
                    <pre><code>
{`</> Bash
git reset --soft HEAD~1
`}
                    </code></pre>

                    <li><h3>Discard all changes (Hard Reset):</h3></li>
                    <ul>
                        <li><i>Permanently deletes</i> the commit and all changes associated with it.</li>
                        <li><strong>Warning:</strong> This cannot be undone.</li>
                    </ul>
                    <pre><code>
{`</> Bash
git reset --hard HEAD~1
`}
                    </code></pre>
                </ul>
            </div>

            <div>
                <h2>2. Deleting an Older Commit (Interactive Rebase)</h2>
                <p>Use interactive rebase if a specific commit from further back in the history.</p>
                <ol>
                    <li>Run <code>git rebase -i HEAD~N</code>, where <code>N</code> is the number number of commits to look back (e.g. <code>HEAD~5</code> for the last 5 commits).</li>
                    <li>In the text editor that opens, find the line for the commit you want to delete.</li>
                    <li>Change the word <code>pick</code> to <code>drop</code> (or simply delete the entire line).</li>
                    <li>Save and close the editor. Git will then rewrite the history without that commit.</li>
                </ol>
            </div>

            <div>
                <h2>3. Deleting a Pushed Commit (Remote)</h2>
                <p>If the commit is already on a server like GitHub, you must update the remote history.</p>
                <ul>
                    <li><h3>Safe Method (Revert):</h3></li>
                    <ol>
                        <li>The best practice for shared branches.</li>
                        <li>Does not "delete" the history, but <i>creates a new commit</i> that undoes the changes of the old one.</li>
                        <pre><code>
{`</> Bash
git revert <commit_hash>
git push origin <branch_name>
`}
                        </code></pre>
                    </ol>

                    <li><h3>Force Method (Reset + Force Push):</h3></li>
                    <p>Only if you are working alone or have coordinated with your team, as it rewrites history for everyone.</p>
                    <ol>
                        <li>Reset locally: <code>git reset --hard HEAD~1</code></li>
                        <li>Force push: <code>git push origin {`<branch_name>`} -- force</code></li>
                    </ol>
                </ul>
            </div>

            <div>
                <h2>Summary Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Goal</th>
                            <th>Command</th>
                            <th>Best For</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Undo last commit, keep work</td>
                            <td><code>git reset --soft HEAD~1</code></td>
                            <td>Fixing a mistake before re-committing</td>
                        </tr>
                        <tr>
                            <td>Delete last commit & work</td>
                            <td><code>git reset --hard HEAD~1</code></td>
                            <td>Completely starting over locally</td>
                        </tr>
                        <tr>
                            <td>Delete an older commit</td>
                            <td><code>git rebase -i HEAD~N</code></td>
                            <td>Cleaning up complex local history</td>
                        </tr>
                        <tr>
                            <td>Undo a pushed commit</td>
                            <td><code>git revert {`<hash>`}</code></td>
                            <td>Shared team branches (safest)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}