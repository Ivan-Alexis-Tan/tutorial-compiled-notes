
export default function GitCreateBranch() {
    return (
        <div>
            <h1>Creating Branch</h1>

            <div>
                <h2>1. Command Line (Recommended)</h2>
                <p><i>Most common way</i>: Create and immediately move into a new branch using <code>checkout</code> and <code>switch</code> command.</p>

                <ul>
                    <li><strong>Create and Switch (Single Step)</strong></li>
                    <ul>
                        <li><code>git checkout -b {`<branch-name>`}</code></li>
                        <li><code>git switch -c {`<branch-name>`}</code> (Available in Git 2.23+)</li>
                    </ul>

                    <li><strong>Create Only (Stay on current branch):</strong></li>
                    <ul><li>git branch {`<branch-name>`}</li></ul>

                    <li><strong>Create from a Specific Point:</strong></li>
                    <ul>
                        <li><strong>From another branch:</strong> <code>git branch {`<new-branch> <existing-branch>`}</code></li>
                        <li><strong>From a specific commit:</strong> <code>git branch {`<branch-name> <commit-hash>`}</code></li>
                    </ul>
                </ul>
            </div>

            <div>
                <h2>2. Publishing to a Remote (GitHub/GitLab)</h2>
                <p>Uploads your branch to repo and automatically visible to others.</p>

                <ol>
                    <li><strong>Push and track:</strong> Use <code>git push -u origin {`<branch-name>`}</code>.</li>
                    <li>The <code>-u</code> (or <code>--set-upstream</code>) flag links to local branch to the remote one for easier future pulls/pushes.</li>
                </ol>
            </div>

            <div>
                <h2>3. Using Web Interfaces (GitHub/GitLab/Desktop)</h2>
                <ul>
                    <li><h3>GitHub/GitLab Web:</h3></li>
                    <ol>
                        <li>Navigate to your repo</li>
                        <li>Click <strong>Branch selector</strong> dropdown (usually says "main")</li>
                        <li>Type the new branch name</li>
                        <li>Click <strong>Create branch</strong></li>
                    </ol>

                    <li><h3>GitHub Desktop:</h3></li>
                    <ol>
                        <li>Click the <strong>Current Branch</strong> menu at the top</li>
                        <li>Select <strong>New Branch</strong></li>
                        <li>Name it and click <strong>Create Branch</strong></li>
                    </ol>

                    <li><h3>IDE (Visual Studios/VS Code):</h3></li>
                    <ol>
                        <li>Use the <strong>Git menu</strong></li>
                        <li>Select <strong>New Branch</strong> to create one based on your current local or remote status.</li>
                    </ol>
                </ul>
            </div>

            <div>
                <h1>Best Practices</h1>
                <ul>
                    <li><strong>Check status first:</strong> Run <code>git status</code> to ensure your working directory is clean before branching.</li>
                    <li><strong>Sync before branching:</strong> Run <code>git pull</code> on your main brnach to ensure your new branch starts with the latest code.</li>
                    <li><strong>Naming:</strong> Use descriptive names like <code>features/login-page</code> or <code>bugfix/issue-123</code>.</li>
                </ul>
            </div>
        </div>
    )
}