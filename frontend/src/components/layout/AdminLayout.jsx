import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    PlusCircle,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Resumen', path: '/dashboard' },
        { icon: BookOpen, label: 'Banco de Preguntas', path: '/admin/questions' },
        { icon: PlusCircle, label: 'Crear Pregunta', path: '/admin/create' },
        { icon: Users, label: 'Usuarios', path: '/admin/users' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
            {/* Sidebar Overlay (Mobile) */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/50 z-40 lg:hidden",
                    sidebarOpen ? "block" : "hidden"
                )}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside
                className={clsx(
                    "fixed lg:sticky top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transition-transform duration-300 ease-in-out flex flex-col",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                    !sidebarOpen && "lg:w-20" // Collapsed state for desktop if needed, for now just hidden on mobile
                )}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        PreLab Admin
                    </span>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* User Info */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold overflow-hidden">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                user?.first_name?.[0] || 'A'
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <h4 className="font-medium text-sm text-slate-800 dark:text-white truncate">
                                {user?.first_name || 'Admin'}
                            </h4>
                            <span className="text-xs text-slate-500 dark:text-slate-500 block">Administrador</span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/dashboard'} // Exact match for dashboard to avoid active state on sub-routes if any
                            className={({ isActive }) => clsx(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                                isActive
                                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 font-medium"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                            )}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Footer Actions */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <NavLink
                        to="/"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                    >
                        <ChevronLeft size={20} />
                        <span>Volver al Sitio</span>
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    >
                        <LogOut size={20} />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="h-16 lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="ml-3 font-semibold text-slate-800 dark:text-white">Panel de Administración</span>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-4 lg:p-8 overflow-auto">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
