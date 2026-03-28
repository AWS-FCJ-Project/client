"use client";

import React, { useEffect, useState } from 'react';
import { Eye, Edit, Trash2, Plus, Clock, FileText, CheckCircle2, Loader2, X, Save, AlertTriangle, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface ExamItem {
    id: string;
    title: string;
    description: string;
    subject: string;
    class_id: string;
    start_time: string;
    end_time: string;
    questions: any[];
}

const TeacherExams: React.FC = () => {
    const [exams, setExams] = useState<ExamItem[]>([]);
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    
    // Modals state
    const [editingExam, setEditingExam] = useState<ExamItem | null>(null);
    const [deletingExam, setDeletingExam] = useState<ExamItem | null>(null);
    const [isActionLoading, setIsActionLoading] = useState(false);

    const fetchData = async () => {
        try {
            const token = Cookies.get('auth_token');
            
            // Fetch user info
            const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-info`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const userData = await userRes.json();
            setUser(userData);

            // Fetch classes (for edit modal)
            const classesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (classesRes.ok) {
                const classesData = await classesRes.json();
                setClasses(classesData);
            }

            // Fetch exams
            const examsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (examsRes.ok) {
                const data = await examsRes.json();
                setExams(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteExam = async () => {
        if (!deletingExam) return;
        setIsActionLoading(true);
        try {
            const token = Cookies.get('auth_token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams/${deletingExam.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setDeletingExam(null);
                fetchData();
            }
        } catch (error) {
            console.error("Error deleting exam:", error);
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleUpdateExam = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingExam) return;
        setIsActionLoading(true);
        try {
            const token = Cookies.get('auth_token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams/${editingExam.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editingExam)
            });
            if (res.ok) {
                setEditingExam(null);
                fetchData();
            }
        } catch (error) {
            console.error("Error updating exam:", error);
        } finally {
            setIsActionLoading(false);
        }
    };

    const addQuestion = () => {
        if (!editingExam) return;
        setEditingExam({
            ...editingExam,
            questions: [...(editingExam.questions || []), { q: '', options: ['', '', '', ''], correct: 0 }]
        });
    };

    const removeQuestion = (idx: number) => {
        if (!editingExam) return;
        const newQ = [...editingExam.questions];
        newQ.splice(idx, 1);
        setEditingExam({ ...editingExam, questions: newQ });
    };

    if (loading) return (
        <div className="flex h-64 items-center justify-center">
            <Loader2 className="animate-spin text-[#5B0019]" size={40} />
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Kho Đề Thi</h1>
                    <p className="text-gray-500 font-medium">Quản lý và biên soạn bộ đề kiểm tra</p>
                </div>
                {user?.role !== 'student' && (
                    <Link 
                        href="/dashboard/exams/create"
                        className="bg-[#5B0019] text-white px-6 py-3 rounded-[1.5rem] font-black flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-red-900/10"
                    >
                        <Plus size={20} /> Tạo đề thi mới
                    </Link>
                )}
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                {exams.length === 0 ? (
                    <div className="p-20 text-center text-gray-400 font-bold">
                        Chưa có đề thi nào được tạo.
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Thông tin đề thi</th>
                                <th className="px-8 py-5 text-center text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Môn học</th>
                                <th className="px-8 py-5 text-center text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Thời gian bắt đầu</th>
                                <th className="px-8 py-5 text-right text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {exams.map((exam) => (
                                <tr key={exam.id} className="hover:bg-red-50/30 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-[#5B0019] transition-all">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-base">{exam.title}</p>
                                                <p className="text-xs text-gray-400 font-medium">{exam.description || 'Không có mô tả'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                                            {exam.subject}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-center text-sm font-medium text-gray-600">
                                        {new Date(exam.start_time).toLocaleString('vi-VN')}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            {user?.role !== 'student' && (
                                                <>
                                                    <button 
                                                        onClick={() => setEditingExam(exam)}
                                                        title="Chỉnh sửa" 
                                                        className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl transition-all"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => setDeletingExam(exam)}
                                                        title="Xóa" 
                                                        className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Edit Exam Modal */}
            {editingExam && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
                        <div className="p-8 border-b bg-gray-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-[#5B0019] text-white rounded-2xl">
                                    <Edit size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-gray-800 tracking-tight">Chỉnh sửa đề thi</h2>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Cập nhật nội dung & bộ câu hỏi</p>
                                </div>
                            </div>
                            <button onClick={() => setEditingExam(null)} className="p-2 hover:bg-gray-200 rounded-xl transition-all">
                                <X size={24} className="text-gray-400" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleUpdateExam} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Tiêu đề đề thi</label>
                                        <input 
                                            required
                                            type="text" 
                                            value={editingExam.title}
                                            onChange={(e) => setEditingExam({...editingExam, title: e.target.value})}
                                            className="w-full px-6 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Môn học</label>
                                        <input 
                                            required
                                            type="text" 
                                            value={editingExam.subject}
                                            onChange={(e) => setEditingExam({...editingExam, subject: e.target.value})}
                                            className="w-full px-6 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Lớp học</label>
                                        <select 
                                            required
                                            value={editingExam.class_id}
                                            onChange={(e) => setEditingExam({...editingExam, class_id: e.target.value})}
                                            className="w-full px-6 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold"
                                        >
                                            <option value="">Chọn lớp</option>
                                            {classes.map(cls => (
                                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Bắt đầu</label>
                                        <input 
                                            required
                                            type="datetime-local" 
                                            value={editingExam.start_time.substring(0, 16)}
                                            onChange={(e) => setEditingExam({...editingExam, start_time: e.target.value})}
                                            className="w-full px-6 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Kết thúc</label>
                                        <input 
                                            required
                                            type="datetime-local" 
                                            value={editingExam.end_time.substring(0, 16)}
                                            onChange={(e) => setEditingExam({...editingExam, end_time: e.target.value})}
                                            className="w-full px-6 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between px-4">
                                    <h3 className="text-xl font-black text-gray-800 tracking-tight">Bộ câu hỏi ({editingExam.questions?.length || 0})</h3>
                                    <button 
                                        type="button"
                                        onClick={addQuestion}
                                        className="flex items-center gap-2 text-indigo-600 font-bold hover:scale-105 transition-all text-sm uppercase tracking-widest"
                                    >
                                        <PlusCircle size={20} /> Thêm câu hỏi
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    {editingExam.questions?.map((q, qIdx) => (
                                        <div key={qIdx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-4 relative group/q">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-black text-[#5B0019] uppercase tracking-widest">Câu hỏi {qIdx + 1}</span>
                                                <button 
                                                    type="button"
                                                    onClick={() => removeQuestion(qIdx)}
                                                    className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover/q:opacity-100"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <textarea 
                                                required
                                                placeholder="Nội dung câu hỏi..."
                                                value={q.q}
                                                onChange={(e) => {
                                                    const newQ = [...editingExam.questions];
                                                    newQ[qIdx].q = e.target.value;
                                                    setEditingExam({...editingExam, questions: newQ});
                                                }}
                                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold italic text-sm"
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {q.options.map((opt: string, oIdx: number) => (
                                                    <div key={oIdx} className="flex items-center gap-3 bg-gray-50/50 p-2 rounded-xl border border-transparent focus-within:border-indigo-100 transition-all">
                                                        <input 
                                                            type="radio" 
                                                            checked={q.correct === oIdx}
                                                            onChange={() => {
                                                                const newQ = [...editingExam.questions];
                                                                newQ[qIdx].correct = oIdx;
                                                                setEditingExam({...editingExam, questions: newQ});
                                                            }}
                                                            className="w-5 h-5 text-[#5B0019] focus:ring-[#5B0019]"
                                                        />
                                                        <input 
                                                            required
                                                            placeholder={`Đáp án ${oIdx + 1}`}
                                                            value={opt}
                                                            onChange={(e) => {
                                                                const newQ = [...editingExam.questions];
                                                                newQ[qIdx].options[oIdx] = e.target.value;
                                                                setEditingExam({...editingExam, questions: newQ});
                                                            }}
                                                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </form>
                        
                        <div className="p-8 border-t bg-gray-50/50 flex gap-4">
                            <button 
                                type="button"
                                onClick={() => setEditingExam(null)}
                                className="flex-1 py-4 bg-white border border-gray-200 rounded-2xl font-black text-sm text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest shadow-sm"
                            >
                                Hủy bỏ
                            </button>
                            <button 
                                onClick={handleUpdateExam}
                                disabled={isActionLoading}
                                className="flex-[2] py-4 bg-[#5B0019] text-white rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-red-900/10"
                            >
                                {isActionLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deletingExam && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-10 text-center space-y-6">
                            <div className="mx-auto w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center animate-bounce duration-1000">
                                <AlertTriangle size={40} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-black text-gray-800 tracking-tight">Xóa đề thi?</h2>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    Bạn có chắc chắn muốn xóa đề thi <span className="text-gray-900 font-bold">"{deletingExam.title}"</span>? Hành động này không thể hoàn tác.
                                </p>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button 
                                    onClick={() => setDeletingExam(null)}
                                    className="flex-1 py-4 bg-gray-100 rounded-2xl font-black text-gray-500 hover:bg-gray-200 transition-all uppercase text-[10px] tracking-widest"
                                >
                                    Quay lại
                                </button>
                                <button 
                                    disabled={isActionLoading}
                                    onClick={handleDeleteExam}
                                    className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg shadow-red-900/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest"
                                >
                                    {isActionLoading ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                                    Xác nhận xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #eee;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #ddd;
                }
            `}</style>
        </div>
    );
};

export default TeacherExams;