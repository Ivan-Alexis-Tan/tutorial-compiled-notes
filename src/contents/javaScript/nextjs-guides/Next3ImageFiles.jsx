import { languageRoute } from "../../../routeData"
import { useParams } from "react-router-dom"

const titles = languageRoute('javascript').libTitles('nextjs')

export default function WorkingWithImageFiles() {
    return (
        <div>
            <h1>{titles[useParams().id]}</h1>
            <div>
                <ul>
                    <li>Import <code>Image</code> tag: <code>import Image from "next/image"</code></li>
                        <ul>
                            <li>An extension of usual html <code>{"<img>"}</code> tag.</li>
                            <li>Has size optimization (<code>width=</code> and <code>height=</code> attribute)</li>
                            <li>Images are in lazy loading.</li>
                        </ul>
                    <li>Images <strong>must be downloaded or be passed locally</strong>, or else <i>must declare a configuration in <code>next.config.ts</code> file</i>.</li>

                </ul>
            </div>

            <div>
                <h2>Example Usage 1: Passing Source Locally</h2>
                <p><code>next.svg</code> is located at <code>/public</code>, so it is safely passed in <code>src=</code>.</p>
                <pre><code>
{`<Image
    className="dark:invert"
    src="/next.svg"
    alt="Next.js logo"
    width={100}
    height={20}
    priority
/>`}
                </code></pre>
            </div>

            <div>
                <h2>Example Usage 2: Passing Source Online</h2>
                <p>Linking <code>src=</code> to <i>Pavolia Reine's YouTube profile picture</i> without downloading.</p>
                <p>In <code>/app/page.tsx</code> file:</p>
                <pre><code>
{`<Image
    src='https://yt3.ggpht.com/gV1Zr_UQCBsmfyqaJhgj46qud_7HkvdqDNobqz-GSY7cQ4GNSltNxAyc1Y1-9HXXvSoORbzc=s88-c-k-c0x00ffffff-no-rj'
    alt="Next.js logo"
    width={100}
    height={20}
    priority
/>
`}
                </code></pre>

                <p>In <code>next.config.ts</code> file:</p>
                <pre><code>
{`import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{hostname: "yt3.ggpht.com"}]
  }
};

export default nextConfig;
`}
                </code></pre>
                <p>Image hostname is neccessary (on this case, it's <code>yt3.ggpht.com</code>).</p>
                <p>Passed <code>{"images: {remotePatterns: [{ hostname: 'yt3.ggpht.com' }]"}</code></p>
            </div>
        </div>
    )
}