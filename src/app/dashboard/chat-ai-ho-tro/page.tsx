"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
    Send, Bot, User, Sparkles,
    Eraser, Paperclip, MoreHorizontal, Loader2
} from 'lucide-react';

interface Message {
    id: number;
    role: 'ai' | 'user';
    content: string;
    isTyping?: boolean;
}

const AIChatSupport = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, role: 'ai', content: 'Chào Thanh Loan! Mình là trợ lý ảo EduTrust. Bạn cần mình hỗ trợ gì không?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const typeWriter = (fullText: string, messageId: number) => {
        let currentIndex = 0;
        const speed = 20;

        const interval = setInterval(() => {
            setMessages(prev => prev.map(msg =>
                msg.id === messageId ? { ...msg, content: fullText.slice(0, currentIndex + 1) } : msg
            ));
            currentIndex++;
            scrollToBottom();

            if (currentIndex >= fullText.length) {
                clearInterval(interval);
                setMessages(prev => prev.map(msg =>
                    msg.id === messageId ? { ...msg, isTyping: false } : msg
                ));
            }
        }, speed);
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userContent = input.trim();
        const userMsg: Message = { id: Date.now(), role: 'user', content: userContent };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/unified-agent/ask', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2FudHR0bC5za2lsbGNldGVyYUBnbWFpbC5jb20iLCJleHAiOjE3NzQ0NDUwNTN9.ZerglBKpPYKTxqs1E4EMCz_i_D4Jdb8h3wz2TTP91G4'
                },
                body: JSON.stringify({
                    question: userContent,
                    conversation_id: "string"
                })
            });

            const data = await response.json();

            if (response.ok) {
                const aiMsgId = Date.now() + 1;
                setIsLoading(false);
                setMessages(prev => [...prev, {
                    id: aiMsgId,
                    role: 'ai',
                    content: '',
                    isTyping: true
                }]);
                typeWriter(data.answer, aiMsgId);
            }
        } catch (error) {
            setIsLoading(false);
            setMessages(prev => [...prev, {
                id: Date.now() + 2,
                role: 'ai',
                content: "Lỗi kết nối rồi Loan ơi, kiểm tra lại server nhé!"
            }]);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#5B0019] flex items-center justify-center shadow-lg shadow-red-900/20">
                        <Bot size={22} className="text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800">EduTrust AI Assistant</h2>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] text-gray-400 font-medium tracking-wider">ONLINE</span>
                        </div>
                    </div>
                </div>
                <button onClick={() => setMessages([{ id: 1, role: 'ai', content: 'Lịch sử đã được làm mới!' }])} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                    <Eraser size={18} />
                </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8F9FA]">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            {/* Avatar Icon */}
                            <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-white text-gray-500 border border-gray-200' : 'bg-[#5B0019] text-white'
                                }`}>
                                {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                            </div>

                            {/* Message Content */}
                            <div className={`p-4 rounded-2xl text-sm shadow-sm whitespace-pre-wrap leading-relaxed ${msg.role === 'user'
                                ? 'bg-[#5B0019] text-white rounded-tr-none'
                                : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                                }`}>
                                {msg.content}
                                {msg.isTyping && <span className="inline-block w-1.5 h-4 ml-1 bg-[#5B0019] animate-pulse">|</span>}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Loading State - ĐÃ CĂN CHỈNH THẲNG HÀNG VỚI TIN NHẮN TRÊN */}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex gap-3 items-center max-w-[85%]">
                            {/* Logo xoay đồng bộ với icon AI */}
                            <div className="w-8 h-8 rounded-full bg-[#5B0019] flex shrink-0 items-center justify-center shadow-md">
                                <Loader2 size={16} className="text-white animate-spin" />
                            </div>
                            {/* Text Loading */}
                            <div className="px-4 py-3 bg-white/60 border border-gray-100 rounded-2xl rounded-tl-none shadow-sm">
                                <span className="text-xs text-gray-500 font-medium italic animate-pulse">
                                    EduTrust AI Assistant đang tìm dữ liệu...
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                <div className="max-w-4xl mx-auto relative">
                    <input
                        type="text"
                        value={input}
                        disabled={isLoading}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Hỏi AI bất cứ điều gì..."
                        className="w-full pl-6 pr-14 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#5B0019]/20 text-sm transition-all"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-[#5B0019] text-white rounded-xl shadow-lg shadow-red-900/10 disabled:opacity-50 active:scale-95 transition-all"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChatSupport;