const HeaderComponents: React.FC<{ toggleSidebar: () => void; isSidebarOpen: boolean }> = ({ toggleSidebar, isSidebarOpen }) => {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Partidazo ⚽</h1>
            <button
                className="md:hidden bg-blue-500 text-white px-4 py-2 rounded"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? "Cerrar Listado" : "Abrir Listado"}
            </button>
        </div>
    );
};

export default HeaderComponents;