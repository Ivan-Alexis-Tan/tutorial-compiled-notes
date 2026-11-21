export default function GuideContentContainer({ children, className }) {
    return (
        <div className={`${className ?? ""} mb-5 
            [&_:is(h1,h2,h3)]:font-bold [&_:is(h1,h2,h3)]:mb-3
            [&_h1]:text-4xl [&_h2]:text-2xl [&_h3]:text-xl [&>div]:mb-5
            [&_ul]:ml-7 [&_ul]:list-disc [&_ul]:mb-3
            [&_li]:mb-1
            [&_p]:mt-1
            [&_hr]:mt-3 [&_hr]:mb-5 [&_hr]:text-gray-500
        `}>
            {children}
        </div>
    )
}