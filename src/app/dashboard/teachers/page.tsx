"use client";

import React, { useEffect, useState } from 'react';
import { Users, UserPlus, Mail, Shield, Search, Loader2, Download, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';

const TeachersPage = () => {
    const [teachers, setTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTeachers = async () => {
            const token = Cookies.get('auth_token');
            try {
                setLoading(true);
                setError(null);
                const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/classes/teachers`;
                
                const res = await fetch(apiUrl, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (res.ok) {
                    const data = await res.json();
                    setTeachers(data);
                } else {
                    setError(`Lỗi: ${res.status} khi gọi ${apiUrl}`);
                }
            } catch (error: any) {
                console.error("Lỗi lấy danh sách giáo viên:", error);
                setError(`Lỗi kết nối hoặc dữ liệu không hợp lệ. Đang gọi: ${process.env.NEXT_PUBLIC_API_URL}/classes/teachers`);
            } finally {
                setLoading(false);
            }
        };
        fetchTeachers();
    }, []);

    const filteredTeachers = teachers.filter(t => 
        (t.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
        (t.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex h-64 items-center justify-center">
            <Loader2 className="animate-spin text-[#5B0019]" size={40} />
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Danh sách Giáo viên</h1>
                    <p className="text-gray-500 font-medium tracking-wide border-l-4 border-[#5B0019] pl-3">
                        Quản lý toàn bộ đội ngũ giảng dạy trong hệ thống.
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                        <Download size={18} /> Xuất file
                    </button>
                    <Link 
                        href="/dashboard/management?role=teacher"
                        className="flex items-center gap-2 px-6 py-3 bg-[#5B0019] text-white rounded-2xl font-black shadow-lg shadow-red-900/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        <UserPlus size={18} /> Thêm giáo viên
                    </Link>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-[2rem] flex items-center gap-4">
                    <AlertCircle className="shrink-0" size={24} />
                    <div>
                        <p className="font-black text-sm uppercase tracking-wider">Lỗi hệ thống</p>
                        <p className="font-bold">{error}</p>
                    </div>
                </div>
            )}

            {/* Search Bar */}
            <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5B0019] transition-colors" size={20} />
                <input 
                    type="text"
                    placeholder="Tìm kiếm giáo viên theo tên hoặc email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-[2rem] shadow-sm focus:ring-2 focus:ring-[#5B0019] transition-all font-bold text-gray-700"
                />
            </div>

            {/* Teacher Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTeachers.map((teacher) => (
                    <div key={teacher.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                        <div className="flex items-start justify-between relative z-10">
                            <div className="bg-[#5B0019]/5 p-4 rounded-2xl text-[#5B0019] group-hover:bg-[#5B0019] group-hover:text-white transition-all duration-500">
                                <Users size={28} />
                            </div>
                            <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-green-100">
                                Đang hoạt động
                            </div>
                        </div>

                        <div className="mt-6 relative z-10">
                            <h3 className="text-xl font-black text-gray-800 group-hover:text-[#5B0019] transition-colors">{teacher.name || 'N/A'}</h3>
                            <div className="flex items-center gap-2 text-gray-400 mt-2 text-sm font-bold">
                                <Mail size={14} />
                                {teacher.email}
                            </div>
                            <div className="flex items-center gap-2 text-[#5B0019] mt-4 text-xs font-black uppercase tracking-widest">
                                <Shield size={14} />
                                Vai trò: Giáo viên
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-50 flex gap-3 relative z-10 transition-all">
                            <button className="flex-1 py-3 px-4 bg-gray-50 rounded-xl font-bold text-gray-600 text-sm hover:bg-gray-100 transition-all">
                                Xem hồ sơ
                            </button>
                            <button className="flex-1 py-3 px-4 bg-gray-50 rounded-xl font-bold text-gray-600 text-sm hover:bg-gray-100 transition-all">
                                Giao lớp
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTeachers.length === 0 && !loading && !error && (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200 text-gray-400">
                    <Users size={48} className="mb-4 opacity-20" />
                    <p className="font-bold">Không tìm thấy giáo viên nào</p>
                </div>
            )}
        </div>
    );
};

export default TeachersPage;