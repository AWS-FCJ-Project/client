"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Search, Clock, FileText, PlayCircle,
    CheckCircle, XCircle, ChevronRight, BookOpen
} from 'lucide-react';

const MOCK_EXAMS = [
    {
        id: 1,
        title: "Bài thi cuối kỳ: Hóa Học Vô Cơ",
        subject: "Hóa học 12",
        duration: 60,
        questions: 40,
        status: "pending",
        deadline: "28/03/2026",
        score: null
    },
    {
        id: 2,
        title: "Kiểm tra 15 phút: Đạo hàm và Ứng dụng",
        subject: "Toán học 11",
        duration: 15,
        questions: 15,
        status: "completed",
        deadline: "25/03/2026",
        score: 9.5
    },
    {
        id: 3,
        title: "Thi thử THPT Quốc gia 2026 Lần 1",
        subject: "Tiếng Anh",
        duration: 90,
        questions: 50,
        status: "pending",
        deadline: "30/03/2026",
        score: null
    },
    {
        id: 4,
        title: "Kiểm tra giữa kỳ: Động học chất điểm",
        subject: "Vật lý 10",
        duration: 45,
        questions: 30,
        status: "missed",
        deadline: "20/03/2026",
        score: 0
    }
];

const ExamListPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    const filteredExams = MOCK_EXAMS.filter(exam => {
        const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = activeTab === "all" ? true :
            activeTab === "pending" ? exam.status === "pending" :
                exam.status === "completed" || exam.status === "missed";
        return matchesSearch && matchesTab;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold"><Clock size={14} /> Chưa làm</span>;
            case 'completed':
                return <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-bold"><CheckCircle size={14} /> Đã hoàn thành</span>;
            case 'missed':
                return <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold"><XCircle size={14} /> Quá hạn</span>;
            default:
                return null;
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
            <div className="max-w-7xl mx-auto space-y-8">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Danh sách bài thi</h1>
                        <p className="text-gray-500 mt-2">Quản lý và theo dõi tiến độ các bài kiểm tra của bạn.</p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài thi, môn học..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B0019]/20 focus:border-[#5B0019] transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 p-1 bg-gray-200/50 rounded-2xl w-fit">
                    {[
                        { id: 'all', label: 'Tất cả' },
                        { id: 'pending', label: 'Chưa làm' },
                        { id: 'completed', label: 'Đã hoàn thành' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                ? 'bg-white text-[#5B0019] shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExams.length > 0 ? (
                        filteredExams.map(exam => (
                            <div
                                key={exam.id}
                                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#5B0019]/30 transition-all group flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#5B0019]">
                                            <BookOpen size={16} />
                                        </div>
                                        {exam.subject}
                                    </div>
                                    {getStatusBadge(exam.status)}
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 leading-snug mb-4 group-hover:text-[#5B0019] transition-colors line-clamp-2">
                                    {exam.title}
                                </h3>

                                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 bg-gray-50 w-fit px-4 py-2 rounded-xl">
                                    <span className="flex items-center gap-2 font-medium">
                                        <Clock size={16} className="text-gray-400" /> {exam.duration} phút
                                    </span>
                                    <span className="text-gray-300">|</span>
                                    <span className="flex items-center gap-2 font-medium">
                                        <FileText size={16} className="text-gray-400" /> {exam.questions} câu
                                    </span>
                                </div>

                                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                                    <div className="text-sm">
                                        <span className="text-gray-400">Hạn chót: </span>
                                        <span className="font-bold text-gray-700">{exam.deadline}</span>
                                    </div>

                                    {exam.status === 'pending' ? (
                                        <Link
                                            href="/dashboard/bai-thi"
                                            className="flex items-center gap-2 px-5 py-2.5 bg-[#5B0019] text-white rounded-xl font-bold text-sm hover:bg-red-900 transition-colors shadow-md shadow-red-900/20 active:scale-95"
                                        >
                                            <PlayCircle size={18} /> Vào thi
                                        </Link>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            {exam.score !== null && (
                                                <span className="font-black text-lg text-[#5B0019]">{exam.score}đ</span>
                                            )}
                                            <button className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-[#5B0019] transition-colors">
                                                Chi tiết <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
                            <Search size={48} className="mb-4 text-gray-300" />
                            <p className="text-lg font-medium">Không tìm thấy bài thi nào phù hợp.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ExamListPage;
