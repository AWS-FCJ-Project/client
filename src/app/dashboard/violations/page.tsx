"use client";

import React, { useEffect, useState } from 'react';
import { ShieldAlert, User, Calendar, FileText, Loader2, AlertCircle } from 'lucide-react';
import Cookies from 'js-cookie';

const ViolationsPage = () => {
    const [violations, setViolations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchViolations = async () => {
            try {
                const token = Cookies.get('auth_token');
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/homeroom/violations`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setViolations(data);
                }
            } catch (error) {
                console.error("Error fetching violations:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchViolations();
    }, []);

    if (loading) return (
        <div className="flex h-64 items-center justify-center">
            <Loader2 className="animate-spin text-red-600" size={40} />
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
                    <ShieldAlert size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Danh Sách Vi Phạm</h1>
                    <p className="text-gray-500 font-medium">Báo cáo học sinh bị khóa bài thi do vi phạm quy chế (Lớp chủ nhiệm)</p>
                </div>
            </div>

            {violations.length === 0 ? (
                <div className="bg-white p-20 rounded-[3rem] border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
                    <AlertCircle size={48} className="mb-4 opacity-20" />
                    <p className="text-xl font-bold">Hiện chưa có vi phạm nào được ghi nhận.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {violations.map((v) => (
                        <div key={v.id} className="bg-white p-8 rounded-[3rem] border border-red-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                             <div className="absolute top-0 right-0 w-2 h-full bg-red-500"></div>
                            
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                                        <User size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-gray-800">{v.student_name}</h3>
                                        <p className="text-red-600 font-black text-xs uppercase tracking-widest">ĐÃ KHÓA BÀI THI</p>
                                    </div>
                                </div>

                                <div className="space-y-3 bg-gray-50 p-6 rounded-2xl">
                                    <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                        <FileText size={16} className="text-gray-400" />
                                        Môn: {v.subject}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                        <Calendar size={16} className="text-gray-400" />
                                        Thời gian: {new Date(v.violation_time).toLocaleString('vi-VN', { 
                                            day: '2-digit', 
                                            month: '2-digit', 
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>

                                {v.evidence_images && v.evidence_images.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bằng chứng hình ảnh</p>
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {v.evidence_images.map((img: string, idx: number) => (
                                                <div key={idx} className="w-16 h-16 bg-gray-200 rounded-xl shrink-0 border border-gray-100 overflow-hidden">
                                                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${img}`} alt="evidence" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViolationsPage;
