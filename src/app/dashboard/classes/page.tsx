"use client";
import { Users, Search, Plus, MoreVertical } from 'lucide-react';

const TeacherClasses = () => {
    const classes = [
        { id: 1, name: 'Lớp 12A1', students: 42, subject: 'Hóa Học', room: 'Phòng 302' },
        { id: 2, name: 'Lớp 12A5', students: 38, subject: 'Hóa Học', room: 'Phòng 105' },
        { id: 3, name: 'Lớp 11B2', students: 45, subject: 'Hóa Học', room: 'Phòng 201' },
    ];

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý Lớp học</h1>
                    <p className="text-gray-500">Bạn đang phụ trách {classes.length} lớp học</p>
                </div>
                <button className="bg-[#5B0019] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-red-900 transition-all">
                    <Plus size={20} /> Tạo lớp mới
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {classes.map((cls) => (
                    <div key={cls.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-red-50 text-[#5B0019] rounded-2xl flex items-center justify-center">
                                <Users size={24} />
                            </div>
                            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={20} /></button>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{cls.name}</h3>
                        <p className="text-[#5B0019] font-medium mb-4">{cls.subject}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                            <span>Sĩ số: <strong>{cls.students}</strong></span>
                            <span>{cls.room}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherClasses;