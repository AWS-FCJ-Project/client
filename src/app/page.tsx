import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Login</Button>
    </div>
  );
}
