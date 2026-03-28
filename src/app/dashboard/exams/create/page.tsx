"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { Save, ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

const CreateExamForm = () => {
    const searchParams = useSearchParams();
    const preselectedClassId = searchParams.get('class_id');
    
    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        class_id: '',
        start_time: '',
        end_time: '',
        questions: [{ q: '', options: ['', '', '', ''], correct: 0 }]
    });

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const token = Cookies.get('auth_token');
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setClasses(data);
                    
                    // Auto-fill class if provided in URL
                    if (preselectedClassId) {
                        setFormData(prev => ({ ...prev, class_id: preselectedClassId }));
                    }
                }
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };
        fetchClasses();
    }, [preselectedClassId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = Cookies.get('auth_token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                window.location.href = '/dashboard/exams';
            } else {
                alert("Lỗi khi tạo đề thi");
            }
        } catch (error) {
            console.error("Error creating exam:", error);
        } finally {
            setLoading(false);
        }
    };

    const addQuestion = () => {
        setFormData({
            ...formData,
            questions: [...formData.questions, { q: '', options: ['', '', '', ''], correct: 0 }]
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/exams" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Tạo Đề Thi Mới</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest pl-2">Tiêu đề đề thi</label>
                            <input 
                                required
                                type="text" 
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold"
                                placeholder="VD: Kiểm tra giữa kỳ Hóa học"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest pl-2">Môn học</label>
                            <input 
                                required
                                type="text" 
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold"
                                placeholder="VD: Hóa học"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest pl-2">Lớp học</label>
                            <select 
                                required
                                value={formData.class_id}
                                onChange={(e) => setFormData({...formData, class_id: e.target.value})}
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold text-[#5B0019]"
                            >
                                <option value="">Chọn lớp</option>
                                {classes.map(cls => (
                                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest pl-2">Bắt đầu</label>
                            <input 
                                required
                                type="datetime-local" 
                                value={formData.start_time}
                                onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest pl-2">Kết thúc</label>
                            <input 
                                required
                                type="datetime-local" 
                                value={formData.end_time}
                                onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight pl-2">Danh sách câu hỏi</h2>
                    {formData.questions.map((q, qIdx) => (
                        <div key={qIdx} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-black text-[#5B0019] uppercase tracking-tighter">Câu {qIdx + 1}</span>
                                {formData.questions.length > 1 && (
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            const newQ = [...formData.questions];
                                            newQ.splice(qIdx, 1);
                                            setFormData({...formData, questions: newQ});
                                        }}
                                        className="p-2 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                    ><Trash2 size={18} /></button>
                                )}
                            </div>
                            <textarea 
                                required
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold italic text-sm"
                                placeholder="Nhập nội dung câu hỏi..."
                                value={q.q}
                                onChange={(e) => {
                                    const newQ = [...formData.questions];
                                    newQ[qIdx].q = e.target.value;
                                    setFormData({...formData, questions: newQ});
                                }}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {q.options.map((opt, oIdx) => (
                                    <div key={oIdx} className="flex items-center gap-3 bg-gray-50/50 p-2 rounded-xl border border-transparent focus-within:border-red-100 transition-all">
                                        <input 
                                            type="radio" 
                                            checked={q.correct === oIdx}
                                            onChange={() => {
                                                const newQ = [...formData.questions];
                                                newQ[qIdx].correct = oIdx;
                                                setFormData({...formData, questions: newQ});
                                            }}
                                            className="w-5 h-5 text-[#5B0019] focus:ring-[#5B0019]"
                                        />
                                        <input 
                                            required
                                            type="text"
                                            placeholder={`Đáp án ${oIdx + 1}`}
                                            value={opt}
                                            onChange={(e) => {
                                                const newQ = [...formData.questions];
                                                newQ[qIdx].options[oIdx] = e.target.value;
                                                setFormData({...formData, questions: newQ});
                                            }}
                                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button 
                        type="button"
                        onClick={addQuestion}
                        className="w-full py-6 border-2 border-dashed border-gray-100 rounded-[2.5rem] text-gray-400 font-bold hover:border-[#5B0019] hover:text-[#5B0019] hover:bg-red-50/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                    >
                        <Plus size={20} /> Thêm câu hỏi mới
                    </button>
                </div>

                <div className="flex justify-end pt-8 pb-12">
                    <button 
                        disabled={loading}
                        className="bg-[#5B0019] text-white px-12 py-5 rounded-[2rem] font-black flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-red-900/20 active:scale-95 disabled:opacity-50 uppercase tracking-widest text-sm"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Lưu Đề Thi
                    </button>
                </div>
            </form>
        </div>
    );
};

const CreateExamPage = () => {
    return (
        <Suspense fallback={<div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-[#5B0019]" size={40} /></div>}>
            <CreateExamForm />
        </Suspense>
    );
};

export default CreateExamPage;
