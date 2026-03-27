"use client";

import React from 'react';
import { Users, Plus, MoreVertical, MapPin } from 'lucide-react';
interface ClassItem {
    id: number;
    name: string;
    students: number;
    subject: string;
    room: string;
}

const TeacherClasses: React.FC = () => {
    const classes: ClassItem[] = [
        { id: 1, name: 'Lớp 12A1', students: 42, subject: 'Hóa Học', room: 'Phòng 302' },
        { id: 2, name: 'Lớp 12A5', students: 38, subject: 'Hóa Học', room: 'Phòng 105' },
        { id: 3, name: 'Lớp 11B2', students: 45, subject: 'Hóa Học', room: 'Phòng 201' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Quản lý Lớp học</h1>
                    <p className="text-gray-500 font-medium">Bạn đang phụ trách {classes.length} lớp học trực tiếp</p>
                </div>
                <button className="bg-[#5B0019] text-white px-6 py-3 rounded-[1.5rem] flex items-center gap-2 hover:scale-105 transition-all font-black shadow-lg shadow-red-900/20">
                    <Plus size={20} /> Tạo lớp mới
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {classes.map((cls) => (
                    <div key={cls.id} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                        {/* Decor Background */}
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 bg-[#5B0019] text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-red-900/20">
                                    <Users size={28} />
                                </div>
                                <button className="text-gray-300 hover:text-gray-600 transition-colors">
                                    <MoreVertical size={24} />
                                </button>
                            </div>

                            <h3 className="text-2xl font-black text-gray-800 mb-1">{cls.name}</h3>
                            <p className="text-[#5B0019] font-black text-sm uppercase tracking-widest mb-6">{cls.subject}</p>

                            <div className="flex items-center justify-between text-sm border-t border-gray-50 pt-6">
                                <div className="flex flex-col">
                                    <span className="text-gray-400 font-bold text-[10px] uppercase">Sĩ số</span>
                                    <span className="text-gray-800 font-black text-lg">{cls.students} <span className="text-xs font-medium text-gray-400">HS</span></span>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-gray-500 font-bold">
                                    <MapPin size={14} /> {cls.room}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherClasses;