import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Mail, Lock, User, Loader2, ArrowLeft, Eye, EyeOff, Check, X, AlertCircle, Camera } from 'lucide-react';

export default function RegisterView() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        number: false,
        uppercase: false,
        lowercase: false
    });

    const validatePassword = (password) => {
        setPasswordValidations({
            length: password.length >= 8,
            number: /\d/.test(password),
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password)
        });
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setFormData({ ...formData, password });
        validatePassword(password);
    };

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
        setError(null);

        const dataToSend = new FormData();
        dataToSend.append('email', formData.email);
        dataToSend.append('password', formData.password);
        dataToSend.append('first_name', formData.first_name);
        dataToSend.append('last_name', formData.last_name);
        if (avatarFile) {
            dataToSend.append('avatar', avatarFile);
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/auth/register/', dataToSend);
            // Registration successful, redirect to login with success message (or auto login)
            navigate('/login', { state: { message: 'Cuenta creada exitosamente. Inicia sesión.' } });
        } catch (err) {
            console.error("Registration failed:", err);
            if (err.response && err.response.data) {
                // Simple error handling, ideally parse backend dict
                const firstError = Object.values(err.response.data)[0];
                setError(Array.isArray(firstError) ? firstError[0] : "Error al registrarse.");
            } else {
                setError("Error de conexión. Inténtalo más tarde.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden relative">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-4 left-4 p-2 text-white/80 hover:text-white z-10 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>

                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 pt-12 text-center relative">
                    <h2 className="text-3xl font-black text-white mb-2">Crear Cuenta</h2>
                    <p className="text-emerald-100">Únete a PreLab y guarda tu progreso</p>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center gap-2">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Avatar Upload */}
                        <div className="flex justify-center mb-6">
                            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden flex items-center justify-center">
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="text-slate-300" size={32} />
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="text-white" size={16} />
                                </div>
                                <div className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1 border-2 border-white">
                                    <UserPlus size={10} className="text-white" />
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Nombre *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-700"
                                    placeholder="Nombre"
                                    value={formData.first_name}
                                    onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Apellido *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-700"
                                    placeholder="Apellido"
                                    value={formData.last_name}
                                    onChange={e => setFormData({ ...formData, last_name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Correo Electrónico *</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-700"
                                    placeholder="tu@email.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Contraseña *</label>
                            <div className="relative mb-2">
                                <Lock className="absolute left-3 top-3 text-slate-400 w-5 h-5 z-10" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className={`w-full pl-10 pr-12 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-slate-700
                                        ${Object.values(passwordValidations).every(Boolean)
                                            ? 'border-emerald-200 focus:ring-emerald-500'
                                            : 'border-slate-200 focus:ring-indigo-500'}`}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handlePasswordChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* Password Requirements Checklist */}
                            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pl-1">
                                <div className={`flex items-center gap-1.5 ${passwordValidations.length ? 'text-emerald-600' : ''}`}>
                                    {passwordValidations.length ? <Check size={14} /> : <div className="w-3.5 h-3.5 border border-slate-300 rounded-full" />}
                                    <span>Mínimo 8 caracteres</span>
                                </div>
                                <div className={`flex items-center gap-1.5 ${passwordValidations.number ? 'text-emerald-600' : ''}`}>
                                    {passwordValidations.number ? <Check size={14} /> : <div className="w-3.5 h-3.5 border border-slate-300 rounded-full" />}
                                    <span>Incluye número</span>
                                </div>
                                <div className={`flex items-center gap-1.5 ${passwordValidations.uppercase ? 'text-emerald-600' : ''}`}>
                                    {passwordValidations.uppercase ? <Check size={14} /> : <div className="w-3.5 h-3.5 border border-slate-300 rounded-full" />}
                                    <span>Mayúscula</span>
                                </div>
                                <div className={`flex items-center gap-1.5 ${passwordValidations.lowercase ? 'text-emerald-600' : ''}`}>
                                    {passwordValidations.lowercase ? <Check size={14} /> : <div className="w-3.5 h-3.5 border border-slate-300 rounded-full" />}
                                    <span>Minúscula</span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Registrarse Grátis"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-500 text-sm">
                            ¿Ya tienes cuenta?{' '}
                            <Link to="/login" className="text-emerald-600 font-bold hover:underline">
                                Inicia Sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
