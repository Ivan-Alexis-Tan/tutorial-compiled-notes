import { languageRoute } from "../../../routeData"

const titles = languageRoute('git').libTitles('base')

export default function MergeBranch() {
    return (
        <div>
            <h1>{titles[6]}</h1>
            <div>
                <p>Example branch:</p>
                <pre><code>
{`main
└── feature-users
`}
                </code></pre>
                <p><strong>Goal:</strong> Merge <code>feature-users</code> into <code>main</code>.</p>
            </div>

            <div>
                <h2>1. Switch to the branch that will RECEIVE the changes</h2>
                <p>Always merge into branch you are currently on.</p>
                <pre><code>
{`</>
git checkout main
`}
                </code></pre>
                <p>(or)</p>

                <pre><code>
{`</> Bash
git switch main
`}
                </code></pre>
            </div>

            <div>
                <h2>2. Update it first (important habit)</h2>
                <pre><code>
{`</> Bash
git pull
`}
                </code></pre>
                <p>Makes sure <code>main</code> is up to date before merging.</p>
            </div>

            <div>
                <h2>3. Merge the feature branch</h2>
                <pre><code>
{`</> Bash
git merge feature-users
`}
                </code></pre>
                <p>Git will:</p>
                <ul>
                    <li>Combine commits</li>
                    <li>Create a merge commit if necessary</li>
                    <li>Or fast-forward if possible</li>
                </ul>
            </div>

            <div>
                <h2>4. Push the result</h2>
                <pre><code>
{`</> Bash
git push
`}
                </code></pre>
                <p>Uploads the merged result on the remote repo.</p>
            </div>

            <div>
                <h2>Example Full Flow</h2>
                <pre><code>
{`</> Bash
git checkout main
git pull
git merge feature-users
git push
`}
                </code></pre>
                <p>✅ Done.</p>
            </div>

            <div>
                <h2>If conflicts happen</h2>
                <p>Git will stop and tell you something like:</p>
                <pre><code>CONFLICT (content): Merge conflicts in users.jsx</code></pre>

                <p>Then you:</p>
                <ol>
                    <li>Open the conflicted file</li>
                    <li>You'll see something like:</li>
                    <pre><code>
{`<<<<<<< HEAD
old code
=======
new code
>>>>>>> feature-users
`}
                    </code></pre>

                    <li>Choose what should remain</li>
                    <li>Remove the markers</li>
                    <li>Save the file</li>
                </ol>

                <p>Then finish merge:</p>
                <pre><code>
{`</> Bash
git add .
git commit
`}
                </code></pre>
            </div>

            <div>
                <h2>After merging (optional cleanup)</h2>
                <p>Delete the feature branch if you're done with it.</p>
                <h3>Local</h3>
                <pre><code>
{`</> Bash
git branch -d feature-users
`}
                </code></pre>

                <h3>Remote</h3>
                <pre><code>
{`</> Bash
git push origin --delete feature-users
`}
                </code></pre>
            </div>

            <div>
                <h2>Visual Example</h2>
                <p>Before merge:</p>
                <pre><code>
{`
main
  A---B---C

feature-users
      `}&#92;{`
       D---E
`}
                </code></pre>

                <p>After merge:</p>
                <pre><code>
{`
main
  A---B---C------F
       `}&#92;{`        /
        D------E
`}
                </code></pre>
                <p><code>F</code> = merge commit.</p>
            </div>
        </div>
    )
}