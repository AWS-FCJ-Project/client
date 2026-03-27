"use client";

import React, { useEffect, useState } from 'react';
import { Eye, Edit, Trash2, Plus, Clock, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface ExamItem {
    id: string;
    title: string;
    description: string;
    subject: string;
    start_time: string;
    end_time: string;
    questions?: any[];
}

const TeacherExams: React.FC = () => {
    const [exams, setExams] = useState<ExamItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('auth_token');
                
                // Fetch user info
                const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-info`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const userData = await userRes.json();
                setUser(userData);

                // Fetch exams
                const examsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (examsRes.ok) {
                    const data = await examsRes.json();
                    setExams(data);
                }
            } catch (error) {
                console.error("Error fetching exams:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return (
        <div className="flex h-64 items-center justify-center">
            <Loader2 className="animate-spin text-[#5B0019]" size={40} />
        </div>
    );

    return (
        <div className="space-y-6">
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
                                            <button title="Xem chi tiết" className="p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Eye size={18} /></button>
                                            {user?.role !== 'student' && (
                                                <>
                                                    <button title="Chỉnh sửa" className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl transition-all"><Edit size={18} /></button>
                                                    <button title="Xóa" className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
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
        </div>
    );
};

export default TeacherExams;