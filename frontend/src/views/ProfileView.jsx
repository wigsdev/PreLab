import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/api';
import { User, Lock, LogOut, Save, Loader2, AlertTriangle, Camera } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProfileView() {
    const { user, logout, fetchUser } = useAuth(); // We might need to refresh user context after update
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                password: '',
            });
            setAvatarPreview(user.avatar);
        }
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const dataToSend = new FormData();
        dataToSend.append('first_name', formData.first_name);
        dataToSend.append('last_name', formData.last_name);

        if (formData.password) {
            dataToSend.append('password', formData.password);
        }

        if (avatarFile) {
            dataToSend.append('avatar', avatarFile);
        }

        try {
            await updateProfile(dataToSend);
            await fetchUser(); // Update context
            toast.success('Perfil actualizado correctamente');
        } catch (error) {
            console.error(error);
            const msg = error.response?.data
                ? JSON.stringify(error.response.data)
                : 'Error al actualizar perfil';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <User className="text-indigo-600 dark:text-indigo-400" /> Mi Perfil
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 rounded-2xl p-6 mb-8"
            >
                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-8">
                    <div
                        className="relative group cursor-pointer"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
                            {avatarPreview ? (
                                <img
                                    src={
                                        avatarPreview.startsWith('http') ||
                                        avatarPreview.startsWith('blob')
                                            ? avatarPreview
                                            : `http://127.0.0.1:8000${avatarPreview}`
                                    }
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <User size={40} />
                                </div>
                            )}
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white" size={24} />
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Click para cambiar foto</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                                Nombre
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.first_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, first_name: e.target.value })
                                }
                                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                                Apellido
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.last_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, last_name: e.target.value })
                                }
                                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="Tu apellido"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            disabled
                            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 text-slate-500 dark:text-slate-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-slate-400 mt-1">El email no se puede cambiar.</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 flex items-center gap-1">
                            <Lock size={12} /> Cambiar Contraseña
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="Nueva contraseña (opcional)"
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                        Guardar Cambios
                    </button>
                </div>
            </form>

            <div className="border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-2xl p-6">
                <h3 className="text-red-700 dark:text-red-400 font-bold flex items-center gap-2 mb-2">
                    <AlertTriangle size={18} /> Zona de Peligro
                </h3>
                <p className="text-sm text-red-600/80 dark:text-red-400/80 mb-4">
                    Estas acciones no son reversibles o afectan tu sesión actual.
                </p>
                <button
                    onClick={logout}
                    className="w-full py-3 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
                >
                    <LogOut size={18} />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
