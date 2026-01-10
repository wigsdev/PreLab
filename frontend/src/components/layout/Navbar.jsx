import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useTheme from '../../hooks/useTheme';
import { Sun, Moon, LogIn, UserPlus, User } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800 transition-colors duration-300">
            <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo Area */}
                <div className="flex flex-col">
                    <Link to="/" className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter hover:opacity-80 transition-opacity">
                        PreLab<span className="text-indigo-600 dark:text-indigo-400">_</span>
                    </Link>
                    <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">Simulacros de admisión</span>
                </div>

                {/* Actions Area */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

                    {/* User Auth State */}
                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/dashboard" className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700 hover:opacity-80 transition-opacity">
                                <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-sm ring-2 ring-white dark:ring-slate-800">
                                    {user.first_name ? user.first_name[0] : (user.email?.[0]?.toUpperCase() || 'U')}
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Hola,</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none">
                                        {user.first_name || "Estudiante"}
                                    </p>
                                </div>
                            </Link>
                            <button
                                onClick={logout}
                                className="text-xs text-red-500 hover:text-red-600 font-medium ml-2 dark:text-red-400"
                            >
                                Salir
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/register"
                                className="hidden sm:flex px-4 py-2 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors items-center gap-2 text-sm"
                            >
                                <UserPlus size={16} />
                                Registrarse
                            </Link>
                            <Link
                                to="/login"
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm shadow-indigo-200 dark:shadow-none transition-all active:scale-95 text-sm flex items-center gap-2"
                            >
                                <LogIn size={16} />
                                Ingresar
                            </Link>
                        </div>
                    )}
                </div>
            </nav >
        </header >
    );
}
