import { useState } from 'react';
import { X, AlertTriangle, Loader2, CheckCircle } from 'lucide-react';
import api from '../../services/api'; // Using raw api instance for specific endpoint if needed, or create service function

export default function ReportModal({ questionId, isOpen, onClose }) {
    const [reason, setReason] = useState('');
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await api.post('/reports/', {
                question: questionId,
                reason: reason,
            });
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setReason('');
            }, 2000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <AlertTriangle className="text-orange-500" size={20} />
                        Reportar un Error
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                    >
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4">
                    {status === 'success' ? (
                        <div className="text-center py-8">
                            <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle
                                    className="text-green-600 dark:text-green-400"
                                    size={24}
                                />
                            </div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-2">
                                ¡Gracias por avisarnos!
                            </h4>
                            <p className="text-sm text-slate-500">
                                Revisaremos tu reporte lo antes posible.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                ¿Qué problema encontraste en esta pregunta? Tu feedback nos ayuda a
                                mejorar.
                            </p>

                            <textarea
                                required
                                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none resize-none h-32 text-sm"
                                placeholder="Ej: La clave correcta debería ser la A porque..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />

                            {status === 'error' && (
                                <p className="text-xs text-red-500 mt-2 font-medium">
                                    Error al enviar reporte. Intenta de nuevo.
                                </p>
                            )}

                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={status === 'submitting' || !reason.trim()}
                                    className="px-4 py-2 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'submitting' ? (
                                        <Loader2 className="animate-spin" size={16} />
                                    ) : (
                                        'Enviar Reporte'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
