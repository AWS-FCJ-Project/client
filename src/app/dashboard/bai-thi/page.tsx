"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    ChevronLeft, ChevronRight, Send,
    LayoutGrid, Trophy, Clock, Camera, X, AlertTriangle
} from 'lucide-react';
import CameraMonitor from '@/components/camera/CameraMonitor';

const TOTAL_QUESTIONS = 40;
const QUESTIONS_PER_PAGE = 10;
const EXAM_DURATION = 3600;

type SelectedAnswers = { [key: number]: number };

const ExamPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
    const [timeLeft, setTimeLeft] = useState<number>(EXAM_DURATION);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isStarted, setIsStarted] = useState(false);
    const [cameraStatus, setCameraStatus] = useState("Initializing...");
    const [violationCount, setViolationCount] = useState(0);
    const [showCheatModal, setShowCheatModal] = useState(false);
    const [exitCountdown, setExitCountdown] = useState(3);
    const mainContentRef = useRef<HTMLDivElement>(null);

    const [sidebarWidth, setSidebarWidth] = useState(320);
    const isResizing = useRef(false);

    const startResizing = useCallback(() => {
        isResizing.current = true;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    }, []);

    const stopResizing = useCallback(() => {
        isResizing.current = false;
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
    }, []);

    const resize = useCallback((e: MouseEvent) => {
        if (!isResizing.current) return;
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth > 200 && newWidth < 600) {
            setSidebarWidth(newWidth);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    useEffect(() => {
        if (mainContentRef.current) mainContentRef.current.scrollTop = 0;
    }, [currentPage]);

    useEffect(() => {
        if (isStarted && timeLeft > 0 && !isSubmitted) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (isStarted && timeLeft === 0 && !isSubmitted) {
            setIsSubmitted(true);
        }
    }, [timeLeft, isSubmitted, isStarted]);

    useEffect(() => {
        if (showCheatModal && exitCountdown > 0) {
            const timer = setInterval(() => setExitCountdown(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (showCheatModal && exitCountdown === 0) {
            window.location.href = '/dashboard/exams';
        }
    }, [showCheatModal, exitCountdown]);

    const handleViolation = useCallback((vList: string[]) => {
        if (!isStarted) return;
        setViolationCount(prev => {
            const n = prev + 1;
            if (n >= 4) setShowCheatModal(true);
            return n;
        });
    }, [isStarted]);

    const formatTime = (seconds: number): string => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
    };

    const handleSelect = (qIdx: number, ansIdx: number) => {
        setSelectedAnswers(prev => ({ ...prev, [qIdx]: ansIdx }));
    };

    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const currentQuestions = Array.from({ length: QUESTIONS_PER_PAGE }, (_, i) => startIndex + i)
        .filter(idx => idx < TOTAL_QUESTIONS);
    const totalPages = Math.ceil(TOTAL_QUESTIONS / QUESTIONS_PER_PAGE);

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
                    <Trophy size={40} />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Hoàn thành!</h1>
                <button onClick={() => window.location.reload()} className="mt-8 px-12 py-3 bg-[#5B0019] text-white rounded-2xl font-bold shadow-xl">Thoát</button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col w-full h-screen bg-gray-50 font-sans overflow-hidden text-sm">

            <header className="h-16 bg-[#5B0019] border-b border-red-900 flex items-center justify-between px-6 shrink-0 shadow-md z-10">
                <div className="flex flex-col text-white">
                    <h1 className="text-lg font-bold uppercase leading-none">Hóa Học Vô Cơ</h1>
                    <span className="text-xs text-red-200 mt-1">Đã làm: {Object.keys(selectedAnswers).length}/{TOTAL_QUESTIONS} câu</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border font-mono font-bold text-xl text-white ${timeLeft < 300 ? 'bg-red-500 animate-pulse' : 'bg-white/10 border-white/20'
                        }`}>
                        <Clock size={18} /> {formatTime(timeLeft)}
                    </div>
                    <button
                        onClick={() => setIsSubmitted(true)}
                        className="bg-white text-[#5B0019] hover:bg-[#5B0019] hover:text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={Object.keys(selectedAnswers).length === 0}
                    >
                        <Send size={16} /> Nộp bài
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Violation Counter Badge */}
                <div className="absolute top-4 left-4 z-30 pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-3 flex flex-col items-center gap-1 min-w-[80px]">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Vi phạm</span>
                        <div className={`text-2xl font-black transition-colors duration-300 ${
                            violationCount <= 1 ? 'text-green-500' : 
                            violationCount === 2 ? 'text-yellow-500' : 
                            'text-red-500'
                        }`}>
                            {Math.min(violationCount, 3)}/3
                        </div>
                    </div>
                </div>

                <main ref={mainContentRef} className="flex-1 overflow-y-auto bg-gray-100">
                    <div className="max-w-3xl mx-auto p-6 space-y-4 pb-24">
                        {currentQuestions.map((qIdx) => (
                            <div key={qIdx} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-5 border-b border-gray-50 max-h-40 overflow-y-auto">
                                    <div className="flex items-start gap-4">
                                        <span className="shrink-0 w-8 h-8 bg-red-50 rounded-full flex items-center justify-center font-bold text-[#5B0019] border border-red-100">{qIdx + 1}</span>
                                        <h3 className="text-[15px] font-semibold text-gray-800 leading-snug pt-1">
                                            Nồng độ cồn trong máu được xác định bằng công thức nào sau đây để đảm bảo an toàn giao thông?
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-5 bg-gray-50/50 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {['C2H5OH 40 độ', 'CH3OH nguyên chất', 'C3H7OH loãng', 'Tất cả đều sai'].map((opt, aIdx) => (
                                        <button key={aIdx} onClick={() => handleSelect(qIdx, aIdx)}
                                            className={`p-3 text-left border rounded-xl transition-all flex items-center gap-3 ${selectedAnswers[qIdx] === aIdx ? 'border-[#5B0019] bg-[#5B0019] text-white' : 'border-gray-200 bg-white text-gray-700'
                                                }`}>
                                            <span className={`w-6 h-6 shrink-0 rounded-md flex items-center justify-center text-xs font-bold ${selectedAnswers[qIdx] === aIdx ? 'bg-white text-[#5B0019]' : 'bg-gray-100 text-gray-400'
                                                }`}>{String.fromCharCode(65 + aIdx)}</span>
                                            <span className="font-medium">{opt}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                <div
                    onMouseDown={startResizing}
                    className="w-1.5 hover:w-2 bg-gray-200 hover:bg-[#5B0019] cursor-col-resize transition-all shrink-0 relative z-20 group"
                >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="w-[2px] h-8 bg-white rounded-full"></div>
                    </div>
                </div>

                <aside
                    style={{ width: `${sidebarWidth}px` }}
                    className="bg-white flex flex-col shrink-0 shadow-sm"
                >
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="flex items-center gap-2 mb-4 text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                            <LayoutGrid size={14} /> Danh sách câu hỏi
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
                                <button key={i} onClick={() => setCurrentPage(Math.floor(i / QUESTIONS_PER_PAGE))}
                                    className={`h-9 rounded-lg text-xs font-bold border transition-all ${selectedAnswers[i] !== undefined ? 'bg-[#5B0019] text-white border-[#5B0019]' : 'bg-white text-gray-400 border-gray-200'
                                        } ${Math.floor(i / QUESTIONS_PER_PAGE) === currentPage ? 'ring-2 ring-red-100 border-[#5B0019]' : ''}`}>
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                        {isStarted && (
                            <CameraMonitor onViolation={handleViolation} onStatusChange={setCameraStatus} />
                        )}
                        {!isStarted && (
                            <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Đang chờ bắt đầu...</span>
                            </div>
                        )}
                        <p className="mt-2 text-[10px] text-center text-gray-400 italic font-medium">Vui lòng không rời khỏi khung hình</p>
                    </div>

                </aside>
            </div>

            {/* Camera Check Screen */}
            {!isStarted && !isSubmitted && (
                <div className="fixed inset-0 z-[10001] bg-white flex items-center justify-center p-6 animate-in fade-in duration-500">
                    <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl font-black text-gray-900 leading-tight">
                                    Chuẩn bị hệ thống <br />
                                    <span className="text-[#5B0019]">Giám sát AI</span>
                                </h1>
                                <p className="text-gray-500 mt-4 text-lg leading-relaxed">
                                    Hệ thống đang khởi tạo môi trường thi an toàn. Vui lòng đảm bảo khuôn mặt nằm trong khung hình và không có vật lạ.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <ul className="space-y-3">
                                    {[
                                        "Ngồi ngay ngắn trước camera",
                                        "Đảm bảo đủ ánh sáng",
                                        "Không sử dụng tài liệu, điện thoại",
                                        "Hệ thống sẽ ghi lại hình ảnh vi phạm"
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#5B0019]" />
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => setIsStarted(true)}
                                disabled={cameraStatus !== "Ready"}
                                className={`w-full py-5 rounded-3xl font-black text-lg shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 ${
                                    cameraStatus === "Ready" 
                                    ? "bg-[#5B0019] text-white hover:bg-black" 
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                                }`}
                            >
                                {cameraStatus === "Ready" ? (
                                    <>Bắt đầu làm bài <ChevronRight size={20} /></>
                                ) : (
                                    <>Đang khởi tạo AI... ({cameraStatus})</>
                                )}
                            </button>
                        </div>

                        <div className="relative flex items-center justify-center">
                            <div className={`rounded-3xl overflow-hidden border-4 transition-all duration-700 shadow-2xl relative ${
                                cameraStatus === "Ready" ? "border-[#5B0019]" : "border-gray-100"
                            }`}>
                                <CameraMonitor onStatusChange={setCameraStatus} isCheck={true} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cheat Detection Modal */}
            {showCheatModal && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-red-100 relative">
                        <button 
                            onClick={() => window.location.href = '/dashboard/exams'}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                        >
                            <X size={20} />
                        </button>
                        
                        <div className="p-8 text-center space-y-6">
                            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                                <AlertTriangle size={40} />
                            </div>
                            
                            <div className="space-y-2">
                                <h2 className="text-2xl font-black text-gray-800">Cảnh báo nghiêm trọng</h2>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    Phát hiện hành vi gian lận / hủy bài thi
                                </p>
                            </div>

                            <div className="bg-red-50 text-red-700 py-3 px-6 rounded-2xl font-bold inline-block border border-red-100">
                                Tự động thoát sau {exitCountdown}s
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 border-t border-gray-100">
                            <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
                                Hệ thống giám sát AI proctoring
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamPage;
