import { UserCircle, TrendingUp } from 'lucide-react';

const TeacherStudents = () => {
    return (
        <div className="p-8 text-center">
            <div className="bg-white p-12 rounded-[3rem] border-2 border-dashed border-gray-200">
                <UserCircle size={64} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-800">Danh sách Học sinh</h2>
                <p className="text-gray-500 mb-6">Chọn lớp để xem danh sách học sinh chi tiết</p>
                <div className="flex justify-center gap-3">
                    <button className="px-6 py-2 bg-gray-100 rounded-xl font-bold text-sm">Lớp 12A1</button>
                    <button className="px-6 py-2 bg-gray-100 rounded-xl font-bold text-sm">Lớp 12A5</button>
                </div>
            </div>
        </div>
    );
};

export default TeacherStudents;