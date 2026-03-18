
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Content from "@/components/layout/Content";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
