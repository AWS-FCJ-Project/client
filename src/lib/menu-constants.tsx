import {
    Home, FileText, Calendar, Trophy, MessageSquare,
    Folder, Layers, Users, BookOpen, Library, Lightbulb
} from 'lucide-react';

export const MENU_CONFIG = {
    student: [
        { label: "Trang chủ", icon: <Home size={22} />, desc: "Tổng quan về học tập", path: "/dashboard" },
        { label: "Thư viện tài liệu", icon: <FileText size={22} />, desc: "Các bài giảng và tài liệu học", path: "/dashboard/hoc-tap" },
        { label: "Bài tập", icon: <Library size={22} />, desc: "Bài tập về nhà và ôn luyện", path: "/dashboard/bai-tap" },
        { label: "Bài thi", icon: <BookOpen size={22} />, desc: "Đề thi", path: "/dashboard/danh-sach-bai-thi" },
        { label: "Kết quả", icon: <Trophy size={22} />, desc: "Kết quả học tập", path: "/dashboard/ket-qua" },
        { label: "AI hỗ trợ", icon: <MessageSquare size={22} />, desc: "Hỗ trợ học tập bằng AI", path: "/dashboard/chat-ai-ho-tro" },
    ],
    admin: [
        { label: "Trang chủ", icon: <Home size={22} />, path: "/dashboard" },
        { label: "Bài tập", icon: <FileText size={22} />, desc: "Quản lý bài tập", path: "/dashboard/bai-tap" },
        { label: "Đề thi", icon: <Folder size={22} />, desc: "Quản lý đề thi", path: "/dashboard/exams" },
        { label: "Lớp học", icon: <Layers size={22} />, desc: "Quản lý lớp học", path: "/dashboard/students" },
        { label: "Giáo viên", icon: <Users size={22} />, desc: "Quản lý giáo viên", path: "/dashboard/teachers" },
        { label: "Thư viện tài liệu", icon: <BookOpen size={22} />, desc: "Quản lý kho nội dung", path: "/dashboard/resources" },
    ],
    teacher: [
        { label: "Trang chủ", icon: <Home size={22} />, path: "/dashboard" },
        { label: "Bài tập", icon: <FileText size={22} />, desc: "Quản lý bài tập", path: "/dashboard/bai-tap" },
        { label: "Đề thi", icon: <Folder size={22} />, desc: "Quản lý đề thi", path: "/dashboard/exams" },
        { label: "Lớp học", icon: <Layers size={22} />, desc: "Quản lý lớp học", path: "/dashboard/students" },
        { label: "Thư viện tài liệu", icon: <BookOpen size={22} />, desc: "Quản lý kho nội dung", path: "/dashboard/resources" },
    ]
};