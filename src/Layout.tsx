interface LayoutProps {
    header: React.ReactNode;
    aside: React.ReactNode;
    main: React.ReactNode;
    footer: React.ReactNode;
  }
  
  const Layout: React.FC<LayoutProps> = ({ header, aside, main, footer }) => {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-gray-800 text-white p-4">
          {header}
        </header>
  
        <div className="flex flex-1 flex-col md:flex-row">
          {/* Aside */}
          {aside}
          {/* Main Content */}
          <main className="flex-1 p-4 bg-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            {main}
          </main>
        </div>
  
        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          {footer}
        </footer>
      </div>
    );
  };
  
  export default Layout;