"use client";

import React, { useEffect, useState } from 'react';
import { Users, Plus, MoreVertical, MapPin, Loader2, X, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import Cookies from 'js-cookie';

interface ClassItem {
    id: string;
    name: string;
    grade: number;
    school_year: string;
    homeroom_teacher_id: string;
    student_count: number;
    status: 'active' | 'inactive';
    room?: string; 
}

const ClassesPage: React.FC = () => {
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [newClass, setNewClass] = useState({
        name: '',
        grade: 10,
        school_year: '2026-2027',
        homeroom_teacher_id: '',
        subject_teachers: []
    });

    const fetchData = async () => {
        try {
            const token = Cookies.get('auth_token');
            if (!token) return;

            const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-info`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const userData = await userRes.json();
            setUser(userData);

            const classesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (classesRes.ok) {
                const data = await classesRes.json();
                setClasses(data);
            }

            if (userData.role === 'admin') {
                const teachersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/teachers`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (teachersRes.ok) {
                    const teacherData = await teachersRes.json();
                    setTeachers(teacherData);
                }
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

    const handleCreateClass = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = Cookies.get('auth_token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newClass)
            });
            if (res.ok) {
                setShowModal(false);
                fetchData();
            } else {
                alert("Lỗi khi tạo lớp học");
            }
        } catch (error) {
            console.error("Error creating class:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && classes.length === 0) return (
        <div className="flex h-64 items-center justify-center">
            <Loader2 className="animate-spin text-[#5B0019]" size={40} />
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Quản lý Lớp học</h1>
                    <p className="text-gray-500 font-medium">
                        {user?.role === 'admin' ? `Tổng số ${classes.length} lớp học trong hệ thống` : `Thông tin lớp học của bạn`}
                    </p>
                </div>
                {user?.role === 'admin' && (
                    <button 
                        onClick={() => setShowModal(true)}
                        className="bg-[#5B0019] text-white px-6 py-3 rounded-[1.5rem] flex items-center gap-2 hover:scale-105 transition-all font-black shadow-lg shadow-red-900/20"
                    >
                        <Plus size={20} /> Tạo lớp mới
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {classes.map((cls) => (
                    <div key={cls.id} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                        {/* Decor Background */}
                        <div className={`absolute -right-4 -top-4 w-24 h-24 ${cls.status === 'active' ? 'bg-green-50' : 'bg-red-50'} rounded-full group-hover:scale-150 transition-transform duration-700`}></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 ${cls.status === 'active' ? 'bg-[#5B0019]' : 'bg-gray-400'} text-white rounded-[1.5rem] flex items-center justify-center shadow-lg`}>
                                    <Users size={28} />
                                </div>
                                <div className="flex items-center gap-2">
                                     {cls.status === 'active' ? (
                                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                            <CheckCircle2 size={10} /> Active
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                                            <AlertCircle size={10} /> Inactive
                                        </span>
                                    )}
                                    <button className="text-gray-300 hover:text-gray-600 transition-colors">
                                        <MoreVertical size={24} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-gray-800 mb-1">{cls.name}</h3>
                            <p className="text-[#5B0019] font-black text-sm uppercase tracking-widest mb-6">Khối {cls.grade} - {cls.school_year}</p>

                            <div className="flex items-center justify-between text-sm border-t border-gray-50 pt-6">
                                <div className="flex flex-col">
                                    <span className="text-gray-400 font-bold text-[10px] uppercase">Sĩ số (Thực tế)</span>
                                    <span className="text-gray-800 font-black text-lg">{cls.student_count} <span className="text-xs font-medium text-gray-400">HS</span></span>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-gray-500 font-bold">
                                    <MapPin size={14} /> {cls.room || 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Class Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[3rem] w-full max-w-lg p-8 space-y-8 animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-black text-gray-900">Tạo Lớp Mới</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateClass} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2">Tên lớp</label>
                                <input 
                                    required
                                    type="text"
                                    value={newClass.name}
                                    onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold"
                                    placeholder="VD: 10A2"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2">Khối</label>
                                    <input 
                                        required
                                        type="number"
                                        value={newClass.grade}
                                        onChange={(e) => setNewClass({...newClass, grade: parseInt(e.target.value)})}
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2">Năm học</label>
                                    <input 
                                        required
                                        type="text"
                                        value={newClass.school_year}
                                        onChange={(e) => setNewClass({...newClass, school_year: e.target.value})}
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center pr-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2">Giáo viên chủ nhiệm</label>
                                    <span className="text-[10px] text-gray-400 italic">(Không bắt buộc)</span>
                                </div>
                                <select 
                                    value={newClass.homeroom_teacher_id}
                                    onChange={(e) => setNewClass({...newClass, homeroom_teacher_id: e.target.value})}
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019] transition-all font-bold text-gray-700 appearance-none"
                                >
                                    <option value="">Chưa gán giáo viên</option>
                                    {teachers.map(t => (
                                        <option key={t.id} value={t.id}>{t.name} ({t.email})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                                <p className="text-[10px] font-bold text-red-600 leading-tight">
                                    Lưu ý: Nếu chưa gán Giao viên Chủ nhiệm hoặc GV Bộ môn, lớp sẽ ở trạng thái "Inactive" và chưa thể bắt đầu hoạt động giảng dạy.
                                </p>
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#5B0019] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-red-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                                Lưu lớp học
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassesPage;