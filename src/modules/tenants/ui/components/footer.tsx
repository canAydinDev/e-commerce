import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const Footer = () => {
  return (
    <footer className="border-t font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto gap-2 flex  items-center h-full px-4 py-6 lg:px-12 ">
        <Link href="/">
          <span className={cn("text-2xl font-medium", poppins.className)}>
            takasKutusu
          </span>
        </Link>
        <p>tarafindan olusturuldu.</p>
      </div>
    </footer>
  );
};
