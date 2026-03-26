import { FileText, Eye, Edit, Trash2 } from 'lucide-react';

const TeacherExams = () => {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Kho Đề Thi</h1>
                <button className="bg-[#5B0019] text-white px-4 py-2 rounded-xl text-sm font-bold">Tạo đề thi mới</button>
            </div>
            <table className="w-full bg-white rounded-3xl overflow-hidden shadow-sm">
                <thead className="bg-gray-50 border-b">
                    <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <th className="p-5">Tên Đề Thi</th>
                        <th className="p-5">Thời Gian</th>
                        <th className="p-5">Số Câu</th>
                        <th className="p-5">Thao Tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                    <tr>
                        <td className="p-5 font-bold text-gray-700">Kiểm tra 1 tiết - Chương 1</td>
                        <td className="p-5 text-gray-500">45 phút</td>
                        <td className="p-5 text-gray-500">40</td>
                        <td className="p-5">
                            <div className="flex gap-2">
                                <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Eye size={18} /></button>
                                <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg"><Edit size={18} /></button>
                                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TeacherExams;