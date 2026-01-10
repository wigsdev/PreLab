import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useTheme from '../../hooks/useTheme';
import { Sun, Moon, LogIn, UserPlus, User, LayoutDashboard, Settings, LogOut, ChevronDown, ShieldCheck } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

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
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                            >
                                <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-sm ring-2 ring-white dark:ring-slate-800 overflow-hidden">
                                    {user.avatar ? (
                                        <img src={user.avatar.startsWith('http') ? user.avatar : `http://127.0.0.1:8000${user.avatar}`} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{user.first_name ? user.first_name[0] : (user.email?.[0]?.toUpperCase() || 'U')}</span>
                                    )}
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Hola,</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none flex items-center gap-1">
                                        {user.first_name || user.email.split('@')[0]}
                                        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                    </p>
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {isOpen && (
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">

                                    {/* Header Mobile Only (shows name if hidden in navbar) */}
                                    <div className="md:hidden px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Sesión iniciada como</p>
                                        <p className="font-bold text-slate-800 dark:text-white truncate">{user.email}</p>
                                    </div>

                                    <div className="p-2">
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-colors"
                                        >
                                            <LayoutDashboard size={18} />
                                            Dashboard
                                        </Link>

                                        <Link
                                            to="/profile"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-colors"
                                        >
                                            <User size={18} />
                                            Mi Perfil
                                        </Link>

                                        {/* Admin Link - Only for Staff */}
                                        {user.is_staff && (
                                            <Link
                                                to="/admin/create"
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition-colors bg-amber-50/50 dark:bg-amber-900/10 my-1"
                                            >
                                                <ShieldCheck size={18} />
                                                Panel Admin
                                            </Link>
                                        )}
                                    </div>

                                    <div className="h-px bg-slate-100 dark:bg-slate-800 mx-2"></div>

                                    <div className="p-2">
                                        <button
                                            onClick={() => { setIsOpen(false); logout(); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors text-left"
                                        >
                                            <LogOut size={18} />
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            )}
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
