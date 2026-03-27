"use client";

import React, { useState } from 'react';
import {
    Search, Plus, MoreVertical, Mail,
    Phone, BookOpen, Star, Filter,
    UserCheck, UserX, Download
} from 'lucide-react';

// Định nghĩa kiểu dữ liệu cho Giáo viên
interface Teacher {
    id: number;
    name: string;
    subject: string;
    email: string;
    phone: string;
    classes: number;
    rating: number;
    status: 'Active' | 'On Leave';
    avatar: string;
}

const TeacherManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const teachers: Teacher[] = [
        { id: 1, name: 'ThS. Nguyễn Văn A', subject: 'Hóa học', email: 'vanna@edutrust.edu.vn', phone: '0901 234 567', classes: 5, rating: 4.9, status: 'Active', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Cô Lê Thị B', subject: 'Ngữ văn', email: 'lethib@edutrust.edu.vn', phone: '0908 765 432', classes: 4, rating: 5.0, status: 'Active', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Thầy Trần C', subject: 'Toán học', email: 'tranc@edutrust.edu.vn', phone: '0912 333 444', classes: 6, rating: 4.8, status: 'On Leave', avatar: 'https://i.pravatar.cc/150?u=3' },
        { id: 4, name: 'Mr. John Wick', subject: 'Tiếng Anh', email: 'johnw@edutrust.edu.vn', phone: '0944 555 666', classes: 3, rating: 4.7, status: 'Active', avatar: 'https://i.pravatar.cc/150?u=4' },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-10 font-sans text-sm text-gray-900">
            <div className="max-w-7xl mx-auto">

                {/* --- Header & Actions --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">Quản lý Giáo viên</h1>
                        <p className="text-gray-500 font-medium mt-1">Tổng số {teachers.length} giáo viên đang công tác</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                            <Download size={18} /> Xuất file
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-[#5B0019] text-white rounded-2xl font-black shadow-lg shadow-red-900/20 hover:scale-105 transition-all">
                            <Plus size={20} /> Thêm giáo viên
                        </button>
                    </div>
                </div>

                {/* --- Filters Bar --- */}
                <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm tên, email, bộ môn..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#5B0019]/10 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex items-center gap-2 px-5 py-3 bg-gray-50 text-gray-500 rounded-xl font-bold hover:bg-gray-100 transition-all">
                            <Filter size={18} /> Lọc bộ môn
                        </button>
                        <div className="h-10 w-[1px] bg-gray-100 hidden md:block"></div>
                        <p className="text-xs font-bold text-gray-400 px-2 whitespace-nowrap">Sắp xếp: <span className="text-[#5B0019]">Mới nhất</span></p>
                    </div>
                </div>

                {/* --- Teachers Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teachers.map((t) => (
                        <div key={t.id} className="group bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 relative flex flex-col items-center text-center">

                            <button className="absolute top-6 right-6 text-gray-300 hover:text-gray-600">
                                <MoreVertical size={20} />
                            </button>

                            <div className="relative mb-4">
                                <div className="w-24 h-24 rounded-[2rem] overflow-hidden ring-4 ring-gray-50 group-hover:ring-[#5B0019]/10 transition-all">
                                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-lg border-4 border-white flex items-center justify-center ${t.status === 'Active' ? 'bg-green-500' : 'bg-amber-500'
                                    }`}>
                                    {t.status === 'Active' ? <UserCheck size={10} className="text-white" /> : <UserX size={10} className="text-white" />}
                                </div>
                            </div>

                            <h3 className="text-lg font-black text-gray-800 leading-tight mb-1 group-hover:text-[#5B0019] transition-colors">{t.name}</h3>
                            <p className="text-[#5B0019] font-bold text-xs uppercase tracking-widest mb-4">{t.subject}</p>

                            <div className="space-y-2 w-full mb-6 text-gray-500 font-medium text-[13px]">
                                <div className="flex items-center justify-center gap-2">
                                    <Mail size={14} /> <span className="truncate">{t.email}</span>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <Phone size={14} /> {t.phone}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-gray-50 mt-auto text-gray-900">
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Số lớp</p>
                                    <div className="flex items-center justify-center gap-1 font-black">
                                        <BookOpen size={14} className="text-[#5B0019]" /> {t.classes}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Đánh giá</p>
                                    <div className="flex items-center justify-center gap-1 font-black">
                                        <Star size={14} className="text-yellow-400 fill-yellow-400" /> {t.rating}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 w-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                <button className="w-full py-3 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-black transition-all">
                                    Xem hồ sơ chi tiết
                                </button>
                            </div>
                        </div>
                    ))}

                    <button className="border-2 border-dashed border-gray-200 rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-gray-400 hover:border-[#5B0019] hover:text-[#5B0019] transition-all bg-gray-50/30 group min-h-[320px]">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                            <Plus size={32} />
                        </div>
                        <span className="font-black text-sm uppercase tracking-wider">Thêm nhân sự mới</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TeacherManagement;