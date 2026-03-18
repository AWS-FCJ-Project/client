"use client";

import { useState } from 'react';
import {
    FileText, Clock, MessageSquare,
    Upload, X, AlertCircle, Edit3, ListChecks, PlayCircle
} from 'lucide-react';

const AssignmentsPage = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [assignments] = useState([
        {
            id: 1,
            title: "Giải bài tập Giải tích chương 3",
            subject: "Toán học",
            deadline: "Còn 2 giờ",
            status: "pending",
            type: "Tự luận",
            description: "Hoàn thành các bài tập từ trang 45 đến 50 trong sách giáo khoa nâng cao."
        },
        {
            id: 2,
            title: "Kiểm tra 15 phút - Từ vựng Unit 8",
            subject: "Tiếng Anh",
            deadline: "Còn 5 giờ",
            status: "pending",
            type: "Trắc nghiệm",
            questions: [
                { id: 1, question: "What is the synonym of 'Happy'?", options: ["Sad", "Joyful", "Angry", "Bored"] },
                { id: 2, question: "Choose the correct spelling:", options: ["Accomodate", "Accommodate", "Acomodate", "Accommodat"] },
                { id: 3, question: "He ____ to school every day.", options: ["go", "goes", "going", "gone"] }
            ]
        },
        {
            id: 3,
            title: "Bài tập làm văn số 2",
            subject: "Ngữ văn",
            deadline: "Còn 1 ngày",
            status: "pending",
            type: "Tự luận",
            description: "Nghị luận về tư tưởng đạo lý trong đoạn trích sau..."
        }
    ]);

    const filteredAssignments = assignments.filter(item => item.status === activeTab);

    return (
        <div className="p-8 bg-[#F0F2F5] min-h-screen font-sans">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Cổng Học Tập Trực Tuyến</h1>
                <p className="text-sm text-gray-500">Hoàn thành bài tập đúng hạn để đạt kết quả tốt nhất</p>
            </div>

            <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-2xl shadow-sm w-fit border border-gray-100">
                <TabButton label="Chưa hoàn thành" active={activeTab === 'pending'} onClick={() => setActiveTab('pending')} />
                <TabButton label="Đã hoàn thành" active={activeTab === 'submitted'} onClick={() => setActiveTab('submitted')} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAssignments.map((assignment) => (
                    <AssignmentCard
                        key={assignment.id}
                        data={assignment}
                        onAction={() => { setSelectedAssignment(assignment); setIsModalOpen(true); }}
                    />
                ))}
            </div>

            {isModalOpen && (
                <ActionModal
                    assignment={selectedAssignment}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

interface Assignment {
    id: number;
    title: string;
    subject: string;
    deadline: string;
    status: string;
    type: string;
    description?: string;
    questions?: { id: number; question: string; options: string[] }[];
}

interface ModalProps {
    assignment: Assignment | null;
    onClose: () => void;
}

const ActionModal = ({ assignment, onClose }: ModalProps) => {
    if (!assignment) return null;
    const isQuiz = assignment.type === 'Trắc nghiệm';
    const [answers, setAnswers] = useState<Record<number, string>>({});

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-4 duration-300">

                <div className={`p-6 flex justify-between items-center shrink-0 ${isQuiz ? 'bg-[#5B0019]/5' : 'bg-[#f5e6ed]'}`}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm bg-[#5B0019] text-white">
                            {isQuiz ? <ListChecks size={24} /> : <Edit3 size={24} />}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 leading-tight">
                                {isQuiz ? "Đang làm bài trắc nghiệm" : "Nộp bài tự luận"}
                            </h2>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{assignment.subject}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-full transition-colors"><X size={20} /></button>
                </div>

                <div className="p-8 overflow-y-auto">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{assignment.title}</h3>
                        {assignment.description && <p className="text-sm text-gray-500 italic">"{assignment.description}"</p>}
                    </div>

                    {!isQuiz ? (
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Nội dung bài làm</label>
                                <textarea
                                    className="w-full h-44 p-5 rounded-2xl border-2 border-gray-100 focus:border-[#5B0019]/30 focus:ring-0 outline-none transition-all text-gray-700 bg-gray-50/50"
                                    placeholder="Viết câu trả lời của bạn tại đây..."
                                />
                            </div>
                            <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center hover:bg-gray-50 transition-all cursor-pointer group">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                    <Upload className="text-[#5B0019]" size={20} />
                                </div>
                                <p className="text-sm font-bold text-gray-700">Tải tệp đính kèm</p>
                                <p className="text-xs text-gray-400 mt-1">PDF, Word hoặc Ảnh (Tối đa 20MB)</p>
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {assignment.questions?.map((q: any, idx: number) => (
                                <div key={q.id} className="animate-in fade-in duration-500">
                                    <div className="flex gap-3 mb-4">
                                        <span className="shrink-0 w-8 h-8 rounded-lg bg-[#5B0019]/10 text-[#5B0019] flex items-center justify-center font-bold text-sm">
                                            {idx + 1}
                                        </span>
                                        <p className="font-bold text-gray-800 pt-1">{q.question}</p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-11">
                                        {q.options.map((opt: string) => (
                                            <button
                                                key={opt}
                                                onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                                                className={`text-left px-5 py-3 rounded-2xl text-sm font-medium transition-all border-2 
                                                ${answers[q.id] === opt
                                                        ? 'bg-[#5B0019] text-white border-[#5B0019] shadow-lg shadow-[#5B0019]/20'
                                                        : 'bg-white text-gray-600 border-gray-100 hover:border-[#5B0019]/20 hover:bg-[#5B0019]/5'}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                    <button onClick={onClose} className="px-6 py-2.5 font-bold text-gray-500 hover:text-gray-700">Hủy bỏ</button>
                    <button className={`px-10 py-3 rounded-2xl font-extrabold text-white shadow-xl transition-all active:scale-95 bg-[#5B0019] hover:bg-[#7a0022] shadow-[#5B0019]/20`}>
                        {isQuiz ? 'Hoàn thành bài thi' : 'Xác nhận nộp bài'}
                    </button>
                </div>
            </div>
        </div>
    );
};

interface CardProps {
    data: Assignment;
    onAction: () => void;
}

const AssignmentCard = ({ data, onAction }: CardProps) => {
    const isQuiz = data.type === 'Trắc nghiệm';

    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${isQuiz ? 'bg-[#5B0019]/10 text-[#5B0019]' : 'bg-[#f5e6ed] text-[#5B0019]'}`}>
                        {isQuiz ? <ListChecks size={28} /> : <FileText size={28} />}
                    </div>
                    <div>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md mb-1 inline-block ${isQuiz ? 'bg-[#5B0019]/10 text-[#5B0019]' : 'bg-[#f5e6ed] text-[#5B0019]'}`}>
                            {data.type}
                        </span>
                        <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#5B0019] transition-colors">{data.title}</h3>
                        <p className="text-sm text-gray-400 font-medium">{data.subject}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[11px] font-bold">
                        <Clock size={12} /> {data.deadline}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                <div className="flex gap-3">
                    <div className="p-2 text-gray-400 hover:text-[#5B0019] cursor-pointer transition-colors">
                        <MessageSquare size={18} />
                    </div>
                    <div className="p-2 text-gray-400 hover:text-[#5B0019] cursor-pointer transition-colors">
                        <AlertCircle size={18} />
                    </div>
                </div>

                <button
                    onClick={onAction}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95 bg-[#5B0019] text-white hover:bg-[#7a0022] shadow-[#5B0019]/20`}
                >
                    {isQuiz ? (
                        <><PlayCircle size={18} /> Làm bài ngay</>
                    ) : (
                        <><Upload size={18} /> Nộp bài ngay</>
                    )}
                </button>
            </div>
        </div>
    );
};

interface TabProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

const TabButton = ({ label, active, onClick }: TabProps) => (
    <button
        onClick={onClick}
        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${active ? 'bg-white shadow-md text-[#5B0019]' : 'text-gray-500 hover:bg-gray-50'}`}
    >
        {label}
    </button>
);

export default AssignmentsPage;