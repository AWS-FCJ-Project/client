"use client";

import React, { useState, useEffect } from 'react';
import { Layers, Plus, Search, User, Users, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

const ClassesPage = () => {
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [newClass, setNewClass] = useState({
        name: '',
        grade: '',
        school_year: '2026-2027'
    });

    const fetchClasses = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = Cookies.get('auth_token');
            if (!token) {
                setError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (res.ok) {
                const data = await res.json();
                setClasses(data);
            } else {
                setError(`Lỗi từ máy chủ: ${res.status} (${res.statusText})`);
            }
        } catch (error: any) {
            console.error("Lỗi lấy danh sách lớp:", error);
            setError(`Lỗi kết nối: ${error.message || "Kiểm tra lại mạng hoặc Backend"}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleCreateClass = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = Cookies.get('auth_token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...newClass,
                    grade: parseInt(newClass.grade)
                })
            });

            if (res.ok) {
                setIsModalOpen(false);
                setNewClass({ name: '', grade: '', school_year: '2026-2027' });
                fetchClasses();
            }
        } catch (error) {
            console.error("Lỗi tạo lớp:", error);
        }
    };

    const filteredClasses = classes.filter(cls => 
        (cls.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cls.grade || "").toString().includes(searchTerm)
    );

    if (loading) return (
        <div className="flex h-64 items-center justify-center">
            <Loader2 className="animate-spin text-[#5B0019]" size={40} />
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Quản lý Lớp học</h1>
                    <p className="text-gray-500 font-medium tracking-wide border-l-4 border-[#5B0019] pl-3">
                        Danh sách lớp học và tình trạng phân công giảng dạy.
                    </p>
                </div>
                
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-8 py-4 bg-[#5B0019] text-white rounded-2xl font-black shadow-lg shadow-red-900/20 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus size={20} /> Tạo lớp mới
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-[2rem] flex items-center gap-4 animate-in slide-in-from-top-4">
                    <AlertCircle className="shrink-0" size={24} />
                    <div>
                        <p className="font-black text-sm uppercase tracking-wider">Phát hiện lỗi</p>
                        <p className="font-bold">{error}</p>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="relative group max-w-2xl">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5B0019] transition-colors" size={20} />
                <input 
                    type="text"
                    placeholder="Tìm theo tên lớp (10A1, 12B...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-[2rem] shadow-sm focus:ring-2 focus:ring-[#5B0019] transition-all font-bold text-gray-700"
                />
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredClasses.map((cls) => (
                    <div key={cls.id} className="bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group p-10 relative overflow-hidden">
                        <div className="flex items-start justify-between relative z-10">
                            <div className="space-y-1">
                                <h3 className="text-4xl font-black text-[#5B0019] leading-none mb-2">{cls.name}</h3>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Khối {cls.grade}</p>
                            </div>
                            <div className={`p-3 rounded-2xl ${cls.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                {cls.status === 'active' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-4 relative z-10">
                            <div className="bg-gray-50 p-4 rounded-3xl border border-transparent hover:border-gray-200 transition-colors">
                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                    <Users size={14} />
                                    <span className="text-[10px] font-black uppercase">Sĩ số</span>
                                </div>
                                <p className="text-xl font-black text-gray-800">{cls.student_count || 0}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-3xl border border-transparent hover:border-gray-200 transition-colors">
                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                    <User size={14} />
                                    <span className="text-[10px] font-black uppercase">GV Chủ nhiệm</span>
                                </div>
                                <p className="text-[12px] font-bold text-gray-800 truncate">
                                    {cls.homeroom_teacher_id ? 'Đã phân công' : 'Chưa có'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between relative z-10">
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${cls.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                                {cls.status === 'active' ? '● Hoạt động' : '● Chưa đủ điều kiện'}
                            </span>
                            <button className="text-[#5B0019] font-black text-sm hover:translate-x-1 transition-transform flex items-center gap-1">
                                CHI TIẾT <Plus size={14} />
                            </button>
                        </div>
                        
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-50 rounded-full group-hover:bg-[#5B0019]/5 transition-colors"></div>
                    </div>
                ))}
            </div>

            {filteredClasses.length === 0 && !loading && !error && (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200 text-gray-400">
                    <Layers size={48} className="mb-4 opacity-20" />
                    <p className="font-bold">Danh sách lớp học đang trống</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#5B0019] p-3 rounded-2xl text-white"><Layers size={24} /></div>
                            <h2 className="text-2xl font-black text-gray-800">Tạo Lớp học mới</h2>
                        </div>

                        <form onSubmit={handleCreateClass} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Tên lớp</label>
                                <input 
                                    required
                                    type="text"
                                    value={newClass.name}
                                    onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] font-black transition-all"
                                    placeholder="VD: 10A2"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Khối</label>
                                <input 
                                    required
                                    type="number"
                                    value={newClass.grade}
                                    onChange={(e) => setNewClass({...newClass, grade: e.target.value})}
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] font-black transition-all"
                                    placeholder="VD: 10"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 bg-gray-100 rounded-2xl font-black text-gray-500 hover:bg-gray-200 transition-all"
                                >
                                    Hủy
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 py-4 bg-[#5B0019] text-white rounded-2xl font-black shadow-lg shadow-red-900/20 hover:scale-[1.02] active:scale-95 transition-all text-center"
                                >
                                    Tạo ngay
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassesPage;