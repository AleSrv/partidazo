import { ReactNode } from "react";

interface LayoutProps {
    header: ReactNode;
    aside: ReactNode;
    main: ReactNode;
    footer: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ header, aside, main, footer }) => {
    return (
        <div className="flex flex-col min-h-screen border-4 border-white">
            {/* Header */}
            <header className="bg-gray-800 text-white p-4 border-4 border-white">
                {header}
            </header>

            <div className="flex flex-1">
                {/* Aside */}
                <aside className="hidden md:block bg-lime-800 text-white w-64 p-4 border-4 border-white">
                    {aside}
                </aside>
                {/* Main Content */}
                <main className="flex-1 p-4 bg-lime-800 text-white border-4 border-white">
                    {main}
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center border-4 border-white">
                {footer}
            </footer>
        </div>
    );
};

export default Layout;
