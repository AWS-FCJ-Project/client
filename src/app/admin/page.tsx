"use client";

import { useState } from 'react';
import {
    Home, FileText, Folder, Layers, Users, BookOpen,
    Library, GraduationCap, Lightbulb, Bell, Settings,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import study from '../../../public/study.png';
import logo from '../../../public/logo.png';

const Dashboard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const router = useRouter();

    const mainCards = [
        {
            title: "Bài tập",
            icon: <FileText className="text-[#5B0019]" size={32} />,
            color: "bg-[#f5e6ed]",
            path: "/admin/assignment"
        },
        {
            title: "Đề thi",
            icon: <Folder className="text-[#5B0019]" size={32} />,
            color: "bg-[#f5e6ed]",
            path: "/admin/exams"
        },
        {
            title: "Quản lý lớp",
            icon: <Layers className="text-[#5B0019]" size={32} />,
            color: "bg-[#f5e6ed]",
            path: "/admin/classes"
        },
        {
            title: "Quản lý giáo viên",
            icon: <Users className="text-[#5B0019]" size={32} />,
            color: "bg-[#f5e6ed]",
            path: "/admin/teachers"
        },
        {
            title: "Kho nội dung",
            icon: <BookOpen className="text-[#5B0019]" size={32} />,
            color: "bg-[#f5e6ed]",
            path: "/admin/content"
        },
        {
            title: "Ngân hàng câu hỏi",
            icon: <Library className="text-[#5B0019]" size={32} />,
            color: "bg-[#f5e6ed]",
            path: "/admin/question-bank"
        },
        {
            title: "Khóa học",
            icon: <GraduationCap className="text-[#5B0019]" size={32} />,
            color: "bg-[#f5e6ed]",
            path: "/admin/courses"
        },
        {
            title: "Mẹo",
            icon: <Lightbulb className="text-[#5B0019]" size={32} />,
            color: "bg-[#f5e6ed]",
            path: "/admin/tips"
        },
    ];

    return (
        <div className="flex min-h-screen bg-[#F0F2F5]">
            <aside
                className={`transition-all duration-300 ease-in-out flex flex-col bg-[#5B0019] text-white py-6 relative
                ${isCollapsed ? 'w-20' : 'w-64'}`}
            >
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-10 bg-[#5B0019] border border-white/20 rounded-full p-1 hover:bg-[#7a0022] transition-colors z-50 shadow-md"
                >
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>

                <div className={`flex items-center px-4 mb-10 transition-all ${isCollapsed ? 'justify-center' : 'justify-start gap-3'}`}>
                    <div className="w-10 h-10 bg-white rounded-lg shrink-0 overflow-hidden flex items-center justify-center">
                        <Image src={logo} alt="Logo" width={40} height={40} className="object-cover" />
                    </div>
                    {!isCollapsed && <span className="font-bold text-lg tracking-wide whitespace-nowrap">EduTrust</span>}
                </div>

                <nav className="flex flex-col gap-2 px-3 flex-1">
                    <SidebarItem icon={<Home size={22} />} label="Trang chủ" active isCollapsed={isCollapsed} />
                    <SidebarItem icon={<FileText size={22} />} label="Bài tập" isCollapsed={isCollapsed} />
                    <SidebarItem icon={<Folder size={22} />} label="Đề thi" isCollapsed={isCollapsed} />
                    <SidebarItem icon={<Layers size={22} />} label="Lớp học" isCollapsed={isCollapsed} />
                    <SidebarItem icon={<Users size={22} />} label="Giáo viên" isCollapsed={isCollapsed} />
                    <SidebarItem icon={<BookOpen size={22} />} label="Nội dung" isCollapsed={isCollapsed} />
                </nav>

                <div className="px-3 border-t border-white/10 pt-4">
                    <SidebarItem icon={<Settings size={22} />} label="Cài đặt" isCollapsed={isCollapsed} />
                </div>
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white flex items-center justify-between px-8 shadow-sm border-b border-gray-100">
                    <h2 className="text-gray-700 font-semibold">Màn hình chính</h2>
                    <div className="flex items-center gap-6">
                        <Bell size={20} className="text-gray-400 cursor-pointer hover:text-[#5B0019] transition-colors" />
                        <div className="flex items-center gap-3 border-l pl-6">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-800 leading-none">Thanh Loan</p>
                                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter mt-1">Giáo viên</p>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden relative shadow-sm shrink-0">
                                <Image src={study} alt="Avatar" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {mainCards.map((card, index) => (
                            <div
                                key={index}
                                onClick={() => card.path && router.push(card.path)}
                                className="group bg-white rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95"
                            >
                                <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 ${card.color}`}>
                                    {card.icon}
                                </div>
                                <span className="font-bold text-gray-700 text-sm group-hover:text-[#5B0019]">{card.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

const SidebarItem = ({ icon, label, active = false, isCollapsed }: any) => (
    <div
        title={isCollapsed ? label : ""}
        className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 
        ${active ? 'bg-white/20 text-white shadow-inner' : 'text-white/70 hover:bg-white/10 hover:text-white'} 
        ${isCollapsed ? 'justify-center px-2' : 'gap-4 px-4'}`}
    >
        <div className="shrink-0">{icon}</div>
        {!isCollapsed && (
            <span className="text-sm font-medium whitespace-nowrap">
                {label}
            </span>
        )}
    </div>
);

export default Dashboard;
