import { useAuth } from "../../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <span className="text-xl font-semibold text-gray-900 dark:text-white">
                            Sistema de Monitoramento
                        </span>
                    </div>

                    {user && (
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                Olá, {user.name}
                            </span>
                            <button
                                onClick={logout}
                                className="text-sm bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 px-3 py-2 rounded-md transition-colors"
                            >
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;