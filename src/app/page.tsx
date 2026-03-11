import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Login</Button>
      <Footer />
    </div>
  );
}
