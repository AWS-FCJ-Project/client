"use client";

import React from 'react';
import { Eye, Edit, Trash2, Plus, Clock, FileText, CheckCircle2 } from 'lucide-react';
interface ExamItem {
    id: number;
    title: string;
    duration: string;
    questions: number;
    status: 'Published' | 'Draft';
}
const TeacherExams: React.FC = () => {
    const exams: ExamItem[] = [
        { id: 1, title: 'Kiểm tra giữa kỳ - Hóa hữu cơ', duration: '45 phút', questions: 40, status: 'Published' },
        { id: 2, title: 'Ôn tập chương 1 - Kim loại kiềm', duration: '15 phút', questions: 20, status: 'Draft' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Kho Đề Thi</h1>
                    <p className="text-gray-500 font-medium">Quản lý và biên soạn bộ đề kiểm tra</p>
                </div>
                <button className="bg-[#5B0019] text-white px-6 py-3 rounded-[1.5rem] font-black flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-red-900/10">
                    <Plus size={20} /> Tạo đề thi mới
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-8 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Thông tin đề thi</th>
                            <th className="px-8 py-5 text-center text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Thời lượng</th>
                            <th className="px-8 py-5 text-center text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Trạng thái</th>
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
                                            <p className="text-xs text-gray-400 font-medium">Số lượng: {exam.questions} câu hỏi</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                                        <Clock size={14} /> {exam.duration}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg ${exam.status === 'Published' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                        {exam.status === 'Published' && <CheckCircle2 size={12} />}
                                        {exam.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button title="Xem trước" className="p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Eye size={18} /></button>
                                        <button title="Chỉnh sửa" className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl transition-all"><Edit size={18} /></button>
                                        <button title="Xóa" className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherExams;