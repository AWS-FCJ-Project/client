import { Folder, File, Download } from 'lucide-react';

const TeacherResources = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Kho Nội Dung</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Bài giảng chương 1', 'Đề tham khảo 2024', 'Video thí nghiệm', 'Tài liệu bổ trợ'].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-[#5B0019] transition-all cursor-pointer">
                        <Folder size={32} className="text-[#5B0019] mb-3" fill="currentColor" fillOpacity={0.1} />
                        <p className="font-bold text-sm text-gray-700 truncate">{item}</p>
                        <p className="text-[10px] text-gray-400">Cập nhật: 2 ngày trước</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherResources;