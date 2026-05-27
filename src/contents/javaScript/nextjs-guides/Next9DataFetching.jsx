export default function Next9DataFetching() {
    return (
        <div>
            <h1>Data Fetching</h1>

            <div>
                <h2>1. Use of <code>useEffect()</code> and <code>fetch()</code></h2>
                <p><strong>Example 1:</strong> <code>useEffect()</code></p>
                <pre><code>
{`</> TypeScript
import React, { useEffect, useState } from "react";

export default function Home() {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/albums")
                const data = await res.json()
                setAlbums(data);
            }
            catch(error) {
                console.error("Error fetching albums:", error)
            }
        };
        
        fetchAlbums();
    }, [])
}
`}
                </code></pre>
                <p>This is the bare fetching and is not efficient.</p>

                <p><strong>Example 2:</strong> Serverside Fetching</p>
                <pre><code>
{`</> TypeScript
async function Home() {
    const res = await fetch("https://jsonplaceholder.typicode.com/albums");
    if (!res.ok) throw new Error("Failed to fetch data");

    const albums = await response.json();

    return (
        <div> ... </div>
    )
}
`}
                </code></pre>
            </div>
        </div>
    )
}