import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout({ theme, toggleTheme }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <div className="max-w-5xl mx-auto px-4 py-4">
                <Outlet />
            </div>
        </div>
    );
}
