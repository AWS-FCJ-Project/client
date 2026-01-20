// src/app/components/Header.tsx
export default function Header() {
    return (
        <header className="w-full px-6 py-4 border-b flex justify-between items-center">
            <h1 className="text-xl font-bold">Education</h1>

            <nav className="flex gap-6">
                <a href="#">Home</a>
                <a href="#">Programs</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </nav>
        </header>
    );
}
