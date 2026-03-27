"use client";

import React from 'react';
import { UserCircle } from 'lucide-react';

const TeacherStudents: React.FC = () => {
    return (
        <div className="p-8 flex items-center justify-center min-h-[400px]">
            <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm max-w-md w-full text-center">
                <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                    <UserCircle size={48} />
                </div>
                <h2 className="text-2xl font-black text-gray-800 mb-2">Danh sách Học sinh</h2>
                <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed">Vui lòng chọn lớp học để xem và quản lý danh sách học sinh chi tiết</p>
                <div className="flex flex-col gap-3">
                    <button className="w-full py-3.5 bg-gray-50 hover:bg-[#5B0019] hover:text-white rounded-2xl font-black text-xs text-gray-500 transition-all uppercase tracking-widest">
                        Lớp 12A1
                    </button>
                    <button className="w-full py-3.5 bg-gray-50 hover:bg-[#5B0019] hover:text-white rounded-2xl font-black text-xs text-gray-500 transition-all uppercase tracking-widest">
                        Lớp 12A5
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherStudents;