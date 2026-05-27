import { useParams } from "react-router-dom"

export default function SidebarTask1() {
    return (
        <div>
            <h1 className="text-xl my-5">Basic App Sidebar (Flex)</h1>

            <div className="bg-white text-black h-[50vh]">
                <div className="flex gap-5 h-full">
                    <aside className="border max-w-60 px-5 bg-[hsl(188,100%,49%)]">
                        Sidebar
                    </aside>

                    <div className="w-full border px-2 [&>div]:mb-3 overflow-auto bg-[hsl(61,95%,85%)]">
                        <h2 className="text-xl font-bold mb-3">Main Content</h2>
                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dignissimos porro enim praesentium laudantium magnam dolore eos architecto voluptatum nobis, quod, sint eaque libero? Recusandae, ea eligendi nam pariatur iure dolore aspernatur eos, accusantium dolorum quae amet labore facilis nostrum, expedita minima! Possimus repellat vero dicta nam magni, expedita similique fuga ipsa perspiciatis cumque? Quibusdam commodi animi veritatis magnam sint! Nostrum atque odit qui totam! Architecto necessitatibus repellat vero tenetur aperiam eaque deleniti magni libero, ea modi, asperiores, blanditiis illum quis? Sint nulla explicabo, sed exercitationem assumenda, illo aliquid hic in voluptatem magni iusto debitis, dolores molestias excepturi ipsa quo.</div>

                        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima rerum, totam fugiat distinctio quidem beatae placeat harum. Ratione ab, sunt facilis animi voluptas, pariatur veritatis ipsa voluptatibus commodi iusto fuga sequi suscipit? Nostrum, reprehenderit alias officia commodi iste illo accusamus enim culpa corrupti, laboriosam perferendis nobis impedit vel qui corporis dolor minima error consequuntur? Distinctio, odio. Natus fugiat quos, rem commodi eveniet nisi ex doloribus optio neque voluptatibus? Non magni facere officiis quasi quae cupiditate adipisci blanditiis aperiam incidunt doloribus fugiat sed suscipit fuga numquam molestias ratione saepe nesciunt laboriosam repellendus dolor quaerat quibusdam, maxime itaque inventore. Iure, ipsum natus.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}