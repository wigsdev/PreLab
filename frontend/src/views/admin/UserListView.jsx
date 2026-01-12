import { useState, useEffect } from 'react';
import { getUsers, updateUserRole } from '../../services/api';
import { Search, Loader2, Shield, ShieldAlert, User, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserListView() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers({ search: debouncedSearch });
            setUsers(data); // DRF ModelViewSet list returns array or results if paginated?
            // Standard DRF ModelViewSet returns list directly if no pagination configured,
            // or { count, next, previous, results } if pagination is on.
            // Assuming default list for now or we will check structure.
            // Given QuestionListView used pagination, likely this endpoint might too.
            // But let's assume raw list for simplicity first or handle results.

            if (Array.isArray(data)) {
                setUsers(data);
            } else if (data.results) {
                setUsers(data.results);
            }
        } catch (error) {
            toast.error('Error cargando usuarios');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [debouncedSearch]);

    const handleRoleToggle = async (user) => {
        const newIsStaff = !user.is_staff;
        const confirmMessage = newIsStaff
            ? `¿Hacer ADMINISTRADOR a ${user.first_name}?`
            : `¿Quitar permisos de admin a ${user.first_name}?`;

        if (!window.confirm(confirmMessage)) return;

        try {
            const updatedUser = await updateUserRole(user.id, { is_staff: newIsStaff });
            setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
            toast.success(
                newIsStaff ? 'Usuario ascendido a Admin' : 'Usuario degradado a Estudiante'
            );
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Error actualizando rol');
        }
    };

    const handleStatusToggle = async (user) => {
        const newIsActive = !user.is_active;
        if (
            !window.confirm(
                `¿${newIsActive ? 'Reactivar' : 'Desactivar'} acceso a ${user.first_name}?`
            )
        )
            return;

        try {
            const updatedUser = await updateUserRole(user.id, { is_active: newIsActive });
            setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
            toast.success(newIsActive ? 'Usuario reactivado' : 'Usuario desactivado');
        } catch (error) {
            toast.error('Error cambiando estado');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                        Gestión de Usuarios
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Administra roles y acceso a la plataforma
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm dark:text-white transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4 font-medium">Usuario</th>
                                <th className="px-6 py-4 font-medium">Email</th>
                                <th className="px-6 py-4 font-medium">Rol</th>
                                <th className="px-6 py-4 font-medium">Estado</th>
                                <th className="px-6 py-4 font-medium">Registrado</th>
                                <th className="px-6 py-4 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-12 text-center text-slate-500"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <Loader2
                                                className="animate-spin text-indigo-500"
                                                size={24}
                                            />
                                            <p>Cargando usuarios...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-12 text-center text-slate-500"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                                                <User className="text-slate-400" size={24} />
                                            </div>
                                            <p>No se encontraron usuarios</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white ${user.is_staff ? 'bg-indigo-500' : 'bg-slate-400'}`}
                                                >
                                                    {user.avatar ? (
                                                        <img
                                                            src={user.avatar}
                                                            className="w-full h-full object-cover rounded-full"
                                                            alt=""
                                                        />
                                                    ) : (
                                                        user.first_name?.[0]?.toUpperCase() || 'U'
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white">
                                                        {user.first_name} {user.last_name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                                    user.is_staff
                                                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800'
                                                        : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                                                }`}
                                            >
                                                {user.is_staff ? (
                                                    <ShieldAlert size={12} />
                                                ) : (
                                                    <User size={12} />
                                                )}
                                                {user.is_staff ? 'Admin' : 'Estudiante'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    user.is_active
                                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                                                        : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                                }`}
                                            >
                                                {user.is_active ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 text-xs">
                                            {new Date(user.date_joined).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleRoleToggle(user)}
                                                    className={`p-1.5 rounded-lg transition-colors border ${
                                                        user.is_staff
                                                            ? 'text-indigo-600 border-indigo-200 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-900/50 dark:hover:bg-indigo-900/30'
                                                            : 'text-slate-400 border-slate-200 hover:text-indigo-600 hover:border-indigo-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800'
                                                    }`}
                                                    title={
                                                        user.is_staff
                                                            ? 'Quitar Admin'
                                                            : 'Hacer Admin'
                                                    }
                                                >
                                                    <Shield size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusToggle(user)}
                                                    className={`p-1.5 rounded-lg transition-colors border ${
                                                        !user.is_active
                                                            ? 'text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:text-emerald-500'
                                                            : 'text-slate-400 border-slate-200 hover:text-red-600 hover:border-red-200 hover:bg-red-50 dark:border-slate-700 dark:hover:border-red-900/50 dark:hover:text-red-400'
                                                    }`}
                                                    title={
                                                        user.is_active ? 'Desactivar' : 'Activar'
                                                    }
                                                >
                                                    {user.is_active ? (
                                                        <XCircle size={16} />
                                                    ) : (
                                                        <CheckCircle size={16} />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
