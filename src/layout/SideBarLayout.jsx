import LanguagePage from "../pages/Language";
import LibraryPage from "../pages/LibrarayPage";

export default function SideBarLayout() {
    return (
        <div className="flex flex-col gap-3 h-full">
            <div className="border rounded-2xl p-1 max-h-1/2">
                <LanguagePage />
            </div>

            <div className="border rounded-2xl p-1 flex-1 min-h-100 overflow-auto">
                <LibraryPage />
            </div>
        </div>
    )
}