"use client";

import { useState } from 'react';
import {
    Home, FileText, Calendar, GraduationCap,
    MessageSquare, Trophy, BookOpen, CheckCircle,
    Bell, ChevronLeft, ChevronRight, Clock
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import study from '../../../public/study.png';
import logo from '../../../public/logo.png';

const StudentDashboard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const studentCards = [
        { title: "Bài tập về nhà", icon: <FileText className="text-[#5B0019]" size={32} />, color: "bg-[#f5e6ed]", desc: "3 bài chưa nộp", path: "/bai-tap" },
        { title: "Kỳ thi / Kiểm tra", icon: <CheckCircle className="text-[#5B0019]" size={32} />, color: "bg-[#f5e6ed]", desc: "Sắp có bài kiểm tra", path: "/kiem-tra" },
        { title: "Lớp học của tôi", icon: <GraduationCap className="text-[#5B0019]" size={32} />, color: "bg-[#f5e6ed]", desc: "Lớp 12A1", path: "/lop-hoc" },
        { title: "Thư viện bài giảng", icon: <BookOpen className="text-[#5B0019]" size={32} />, color: "bg-[#f5e6ed]", desc: "12 video mới", path: "/thu-vien" },
        { title: "Bảng điểm", icon: <Trophy className="text-[#5B0019]" size={32} />, color: "bg-[#f5e6ed]", desc: "GPA: 8.5", path: "/bang-diem" },
        { title: "Diễn đàn thảo luận", icon: <MessageSquare className="text-[#5B0019]" size={32} />, color: "bg-[#f5e6ed]", desc: "15 tin nhắn mới", path: "/dien-dan" },
    ];

    return (
        <div className="flex min-h-screen bg-[#F0F2F5]">
            <aside className={`transition-all duration-300 ease-in-out flex flex-col bg-[#5B0019] text-white py-6 relative ${isCollapsed ? 'w-20' : 'w-64'}`}>
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="absolute -right-3 top-10 bg-[#5B0019] border border-white/20 rounded-full p-1 z-50 shadow-md">
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>

                <div className={`flex items-center px-4 mb-10 ${isCollapsed ? 'justify-center' : 'justify-start gap-3'}`}>
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                        <Image src={logo} alt="Logo" width={40} height={40} />
                    </div>
                    {!isCollapsed && <span className="font-bold text-lg">EduTrust</span>}
                </div>

                <nav className="flex flex-col gap-2 px-3 flex-1">
                    <SidebarItem icon={<Home size={22} />} label="Trang chủ" active isCollapsed={isCollapsed} path="/" />
                    <SidebarItem icon={<FileText size={22} />} label="Học tập" isCollapsed={isCollapsed} path="/hoc-tap" />
                    <SidebarItem icon={<Calendar size={22} />} label="Lịch học" isCollapsed={isCollapsed} path="/lich-hoc" />
                    <SidebarItem icon={<Trophy size={22} />} label="Kết quả" isCollapsed={isCollapsed} path="/ket-qua" />
                    <SidebarItem icon={<MessageSquare size={22} />} label="Hỗ trợ" isCollapsed={isCollapsed} path="/ho-tro" />
                </nav>
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white flex items-center justify-between px-8 shadow-sm">
                    <h2 className="text-gray-700 font-semibold">Chào Thanh Loan! 👋</h2>
                    <div className="flex items-center gap-6">
                        <Bell size={20} className="text-gray-400 cursor-pointer hover:text-[#5B0019]" />
                        <div className="flex items-center gap-3 border-l pl-6">
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-800 leading-none">Thanh Loan</p>
                                <p className="text-[10px] text-gray-500 font-medium uppercase mt-1">Học sinh</p>
                            </div>
                            <div className="w-10 h-10 rounded-full border overflow-hidden relative shadow-sm">
                                <Image src={study} alt="Avatar" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-700">Tiến độ học tập tuần này</h3>
                                <span className="text-[#5B0019] font-bold">75%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                                <div className="bg-[#5B0019] h-full transition-all duration-500" style={{ width: '75%' }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                                <Clock size={12} /> Bạn còn 2 bài tập cần hoàn thành trước Chủ Nhật
                            </p>
                        </div>

                        <div className="bg-linear-to-br from-[#5B0019] to-[#8a0026] p-6 rounded-2xl shadow-lg text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <Trophy size={24} />
                                <h3 className="font-bold">Bảng xếp hạng</h3>
                            </div>
                            <p className="text-sm opacity-90">Bạn đang đứng hạng 5 trong lớp 12A1</p>
                            <Link href="/xep-hang">
                                <button className="mt-4 text-xs bg-white/20 hover:bg-white/30 py-2 px-4 rounded-lg font-semibold transition-all">
                                    Xem chi tiết
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {studentCards.map((card, index) => (
                            <Link href={card.path} key={index} className="block group">
                                <div className="bg-white rounded-2xl p-6 flex items-start gap-4 cursor-pointer border border-transparent shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                                    <div className={`p-4 rounded-2xl ${card.color} group-hover:scale-110 transition-transform`}>
                                        {card.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 group-hover:text-[#5B0019] transition-colors">{card.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{card.desc}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

const SidebarItem = ({ icon, label, active = false, isCollapsed, path = "#" }: any) => (
    <Link href={path}>
        <div className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'} ${isCollapsed ? 'justify-center px-2' : 'gap-4 px-4'}`}>
            {icon}
            {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
        </div>
    </Link>
);

export default StudentDashboard;
