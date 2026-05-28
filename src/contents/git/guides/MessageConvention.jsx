import { languageRoute } from "../../../routeData"

const titles = languageRoute('git').libTitles('basic')

export default function MessageConvention() {
    return (
        <div>
            <h1>{titles[2]}</h1>
            <h2>Commit Types &mdash; reference table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>What it means (operational)</th>
                        <th>What changed</th>
                        <th>Example</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>feat</code></td>
                        <td>New capability</td>
                        <td>App can do something new</td>
                        <td><code>feat(quiz): add sumission endpoint</code></td>
                    </tr>
                    <tr>
                        <td><code>fix</code></td>
                        <td>Wrong behavior corrected</td>
                        <td>Bug fixed</td>
                        <td><code>fix(auth): prevent token reuse</code></td>
                    </tr>
                    <tr>
                        <td><code>refactor</code></td>
                        <td>Internal restructure</td>
                        <td>Same behaviour, cleaner code</td>
                        <td><code>refactor(quiz): simplify grading logic</code></td>
                    </tr>
                    <tr>
                        <td><code>perf</code></td>
                        <td>Performance improvement</td>
                        <td>Same output, faster/cheaper</td>
                        <td><code>perf(db): reduce N+1 queries</code></td>
                    </tr>
                    <tr>
                        <td><code>test</code></td>
                        <td>Automated checks only</td>
                        <td>Test files only</td>
                        <td><code>test(quiz) add empty submission cases</code></td>
                    </tr>
                    <tr>
                        <td><code>chore</code></td>
                        <td>Repo/tooling maintenance</td>
                        <td>No user-visible change</td>
                        <td><code>chore: remove debug logs</code></td>
                    </tr>
                    <tr>
                        <td><code>docs</code></td>
                        <td>Documentation only</td>
                        <td>README/docs</td>
                        <td><code>docs(api): document quiz endpoint</code></td>
                    </tr>
                    <tr>
                        <td><code>build</code></td>
                        <td>Build system changes</td>
                        <td>Bundler/compiler</td>
                        <td><code>build: update vite config</code></td>
                    </tr>
                    <tr>
                        <td><code>ci</code></td>
                        <td>CI pipeline changes</td>
                        <td>GitHub Actions, etc</td>
                        <td><code>ci: add lint step</code></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}