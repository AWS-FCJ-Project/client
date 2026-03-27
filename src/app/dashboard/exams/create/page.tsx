"use client";

import React, { useEffect, useState } from 'react';
import { Save, ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';

const CreateExamPage = () => {
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
                }
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };
        fetchClasses();
    }, []);

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
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/exams" className="p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Tạo Đề Thi Mới</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Tiêu đề đề thi</label>
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
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Môn học</label>
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
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Lớp học</label>
                            <select 
                                required
                                value={formData.class_id}
                                onChange={(e) => setFormData({...formData, class_id: e.target.value})}
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold"
                            >
                                <option value="">Chọn lớp</option>
                                {classes.map(cls => (
                                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Bắt đầu</label>
                            <input 
                                required
                                type="datetime-local" 
                                value={formData.start_time}
                                onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Kết thúc</label>
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
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Danh sách câu hỏi</h2>
                    {formData.questions.map((q, qIdx) => (
                        <div key={qIdx} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-black text-[#5B0019]">Câu {qIdx + 1}</span>
                                {formData.questions.length > 1 && (
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            const newQ = [...formData.questions];
                                            newQ.splice(qIdx, 1);
                                            setFormData({...formData, questions: newQ});
                                        }}
                                        className="text-red-400 hover:text-red-600"
                                    ><Trash2 size={20} /></button>
                                )}
                            </div>
                            <textarea 
                                required
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold italic"
                                placeholder="Nhập nội dung câu hỏi..."
                                value={q.q}
                                onChange={(e) => {
                                    const newQ = [...formData.questions];
                                    newQ[qIdx].q = e.target.value;
                                    setFormData({...formData, questions: newQ});
                                }}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                {q.options.map((opt, oIdx) => (
                                    <div key={oIdx} className="flex items-center gap-3">
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
                                            className="flex-1 px-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#5B0019] text-sm font-medium"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button 
                        type="button"
                        onClick={addQuestion}
                        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-[2.5rem] text-gray-400 font-black hover:border-[#5B0019] hover:text-[#5B0019] transition-all flex items-center justify-center gap-2"
                    >
                        <Plus size={20} /> Thêm câu hỏi
                    </button>
                </div>

                <div className="flex justify-end pt-8">
                    <button 
                        disabled={loading}
                        className="bg-[#5B0019] text-white px-12 py-4 rounded-[2rem] font-black flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-red-900/20 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Lưu Đề Thi
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateExamPage;
