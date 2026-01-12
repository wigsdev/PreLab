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
    ChevronLeft,
    ArrowUpRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

export default function AdminLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [desktopCollapsed, setDesktopCollapsed] = useState(false); // Default expanded
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Resumen', path: '/admin' },
        { icon: BookOpen, label: 'Banco de Preguntas', path: '/admin/questions' },
        { icon: PlusCircle, label: 'Crear Pregunta', path: '/admin/create' },
        { icon: Users, label: 'Usuarios', path: '/admin/users' },
        { icon: ArrowUpRight, label: 'Vista Estudiante', path: '/dashboard' },
        {
            icon: Settings,
            label: 'Django Admin',
            path: `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/admin`,
            external: true,
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Mobile/Tablet Header (Hamburger) - Visible up to XL */}
            <header className="xl:hidden h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 sticky top-0 z-30">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                    <Menu size={24} />
                </button>
                <span className="ml-3 font-semibold text-slate-800 dark:text-white">
                    Panel de Administración
                </span>
            </header>

            {/* Backdrop (Mobile/Tablet Only) */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 xl:hidden backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={clsx(
                    'fixed top-0 left-0 z-50 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out flex flex-col',
                    // Mobile/Tablet: Transform based on state
                    'xl:transform-none',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0',
                    // Desktop Width: Collapsed vs Expanded
                    desktopCollapsed ? 'xl:w-20' : 'xl:w-64',
                    'w-64' // Base width is always full sidebar width
                )}
            >
                {/* Logo / Toggle Area */}
                <div
                    className={clsx(
                        'h-16 flex items-center border-b border-slate-100 dark:border-slate-800 transition-all',
                        desktopCollapsed ? 'xl:justify-center px-0' : 'justify-between px-6'
                    )}
                >
                    {/* Desktop: Show Logo only if expanded */}
                    <span
                        className={clsx(
                            'text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent whitespace-nowrap',
                            desktopCollapsed && 'xl:hidden'
                        )}
                    >
                        PreLab Admin
                    </span>

                    {/* Desktop Toggle Button (Visible only on XL+) */}
                    <button
                        onClick={() => setDesktopCollapsed(!desktopCollapsed)}
                        className="hidden xl:flex p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 rounded-lg transition-colors"
                        title={desktopCollapsed ? 'Expandir' : 'Colapsar'}
                    >
                        {desktopCollapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
                    </button>

                    {/* Mobile Close Button (Visible only < XL) */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="xl:hidden p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 absolute right-4"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* User Info */}
                <div
                    className={clsx(
                        'border-b border-slate-100 dark:border-slate-800 transition-all',
                        desktopCollapsed ? 'p-2' : 'p-4'
                    )}
                >
                    <div
                        className={clsx(
                            'flex items-center',
                            desktopCollapsed ? 'justify-center' : 'gap-3'
                        )}
                    >
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold overflow-hidden shrink-0">
                            {user?.avatar ? (
                                <img
                                    src={
                                        user.avatar?.startsWith('http')
                                            ? user.avatar
                                            : `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}${user.avatar}`
                                    }
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                user?.first_name?.[0] || 'A'
                            )}
                        </div>

                        <div
                            className={clsx(
                                'overflow-hidden lg:block',
                                desktopCollapsed && 'xl:hidden'
                            )}
                        >
                            <h4 className="font-medium text-sm text-slate-800 dark:text-white truncate">
                                {user?.first_name || 'Admin'}
                            </h4>
                            <span className="text-xs text-slate-500 dark:text-slate-500 block">
                                Administrador
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-2 xl:p-4 space-y-1 overflow-y-auto overflow-x-hidden">
                    {navItems.map((item) =>
                        item.external ? (
                            <a
                                key={item.path}
                                href={item.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={clsx(
                                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 transition-all group relative',
                                    desktopCollapsed && 'justify-center'
                                )}
                                title={desktopCollapsed ? item.label : undefined}
                            >
                                <item.icon size={20} className="shrink-0" />
                                <span
                                    className={clsx(
                                        'whitespace-nowrap transition-opacity',
                                        desktopCollapsed && 'xl:hidden'
                                    )}
                                >
                                    {item.label}
                                </span>
                            </a>
                        ) : (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/admin'}
                                onClick={() => setMobileOpen(false)} // Close mobile menu on click
                                className={({ isActive }) =>
                                    clsx(
                                        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative',
                                        isActive
                                            ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 font-medium'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200',
                                        desktopCollapsed && 'justify-center'
                                    )
                                }
                                title={desktopCollapsed ? item.label : undefined}
                            >
                                <item.icon size={20} className="shrink-0" />
                                <span
                                    className={clsx(
                                        'whitespace-nowrap transition-opacity',
                                        desktopCollapsed && 'xl:hidden'
                                    )}
                                >
                                    {item.label}
                                </span>
                            </NavLink>
                        )
                    )}
                </nav>

                {/* Footer Actions */}
                <div className="p-2 xl:p-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <NavLink
                        to="/"
                        className={clsx(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all',
                            desktopCollapsed && 'justify-center'
                        )}
                        title={desktopCollapsed ? 'Volver al Sitio' : undefined}
                    >
                        <ChevronLeft size={20} className="shrink-0" />
                        <span
                            className={clsx(
                                'whitespace-nowrap transition-opacity',
                                desktopCollapsed && 'xl:hidden'
                            )}
                        >
                            Volver al Sitio
                        </span>
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className={clsx(
                            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all',
                            desktopCollapsed && 'justify-center'
                        )}
                        title={desktopCollapsed ? 'Cerrar Sesión' : undefined}
                    >
                        <LogOut size={20} className="shrink-0" />
                        <span
                            className={clsx(
                                'whitespace-nowrap transition-opacity',
                                desktopCollapsed && 'xl:hidden'
                            )}
                        >
                            Cerrar Sesión
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area - Adjusts margin based on sidebar state */}
            <main
                className={clsx(
                    'flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out',
                    // Desktop Margin adjustment
                    desktopCollapsed ? 'xl:ml-20' : 'xl:ml-64'
                )}
            >
                {/* Content Container */}
                <div className="p-4 xl:p-8">
                    {/* No extra header here for desktop, sidebar has toggle */}
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
