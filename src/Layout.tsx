interface LayoutProps {
    header: React.ReactNode;
    aside: React.ReactNode;
    main: React.ReactNode;
    footer: React.ReactNode;
  }
  
  const Layout: React.FC<LayoutProps> = ({ header, aside, main, footer }) => {
    return (
      <div className="flex flex-col min-h-screen bg-lime-800 text-white p-4 border-2 border-white">
        {/* Header */}
        <header className="bg-lime-800 text-white p-8 border-4 border-white">
          {header}
        </header>
  
        <div className="flex flex-1 flex-col md:flex-row gap-4 my-2">
          {/* Aside */}
          <aside className="bg-lime-800 text-white border-4 border-white md:w-1/4">
            {aside}
          </aside>
  
          {/* Main Content */}
          <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 bg-lime-800 text-white  border-4 border-white">
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