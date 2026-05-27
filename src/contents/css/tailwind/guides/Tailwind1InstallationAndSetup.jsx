export default function Tailwind1InstallationAndSetup() {
    return (
        <div>
            <h1>Installation and Setup</h1>

            <h2 className="text-2xl font-bold">1. Create Project</h2>
            <pre><code>
{`</> Bash
npm create vite@latest <projectName>
`}
            </code></pre>
            
            <h2>2. Install Tailwind CSS</h2>
            <pre><code>
{`</> Bas
npm install tailwindcss @tailwincss/vite`}
            </code></pre>

            <h2>3. Configure the Vite plugin</h2>
            <p>Add the <code>@tailwindcss/vite</code> plugin to your Vite configuration <strong>inside the root folder</strong>.</p>
            <pre><code>
{`//dir> /root-proj/vite.config.ts
import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
    plugins: [
        tailwindcss(),
    ]
})
`}
            </code></pre>

            <h2>4. Import Tailwind CSS</h2>
            <p>Add an <code>@import "tailwindcss"</code> to CSS file.</p>
            <pre><code>
{`//dir: style.css
@import "tailwindcss"`}
            </code></pre>
            <hr />

            <div>
                <h2>Installing in a Existing Project</h2>

                <div>
                    <h3>1. Install Tailwind (if using Vite)</h3>
                    <pre><code>
{`</> Bash
npm install -D tailwindcss @tailwindcss/vite
`}
                    </code></pre>
                </div>

                <div>
                    <h3>2. Configure <code>vite.config.js</code>, add the plugin:</h3>
                    <pre><code>
{`</> JS
import { definedConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwind/vite"

export default defineCofig({
    plugins: [
        react(),
        tailwindcss(),
    ]
})
`}
                    </code></pre>
                </div>

                <div>
                    <h3>3. Import Tailwind in <code>index.css</code> file.</h3>
                    <pre><code>
{`</> CSS
@import "tailwindcss";
`}
                    </code></pre>
                </div>

                <p>If installed <code>Tailwind CSS IntelliSense</code> Extension:</p>
                <ul><li>Restart VS Code</li></ul>
            </div>
        </div>
    )
}