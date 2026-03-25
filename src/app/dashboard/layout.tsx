"use client";
import { Sidebar } from '@/components/ui/sidebar';
import { Bell } from 'lucide-react';
import Image from 'next/image';
import study from '../../../public/study.png';
import { LogOut } from 'lucide-react';
import Cookies from 'js-cookie';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const role = 'student';
    const handleLogout = async () => {
        try {
            const token = Cookies.get('auth_token');

            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Lỗi gọi API logout:", error);
        } finally {
            Cookies.remove('auth_token', { path: '/' });
            window.location.href = '/';
        }
    };
    return (
        <div className="flex h-screen w-full bg-[#F0F2F5] overflow-hidden">
            <Sidebar role={role} />

            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 bg-white flex items-center justify-between px-8 shadow-sm z-10 shrink-0">
                    <h2 className="text-gray-700 font-bold text-lg">
                        {role === 'student' ? 'Chào Thanh Loan! 👋' : 'Hệ thống Quản trị'}
                    </h2>
                    <div className="flex items-center gap-6">
                        <button className="relative p-1"><Bell size={20} /></button>
                        <div className="flex items-center gap-3 border-l pl-6">
                            <p className="text-sm font-bold">Thanh Loan</p>
                            <div className="w-10 h-10 rounded-full relative overflow-hidden">
                                <Image src={study} alt="Avatar" fill className="object-cover" />
                            </div>
                            <button
                                onClick={handleLogout}
                                className="ml-4 flex items-center gap-2 px-5 py-2.5 bg-[#5B0019] text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-all shadow-md active:scale-95"
                            >
                                <LogOut size={18} />
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                    {children}
                </div>
            </main>
        </div>
    );
}