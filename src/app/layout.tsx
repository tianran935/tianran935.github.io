import type { Metadata } from "next";
import { Crimson_Pro, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import Link from "next/link";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "天然的个人博客",
  description: "湖南大学数字经济专业学生，专注于经济学研究、数据分析与机器学习应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${crimsonPro.variable} ${atkinson.variable}`}>
      <body className="antialiased font-sans bg-[#FAFAFA] text-[#09090B]">
        {/* Floating Navbar */}
        <header className="fixed top-4 left-4 right-4 z-50">
          <nav className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-zinc-200/30">
            <div className="px-6 py-3 flex items-center justify-between">
              <Link
                href="/"
                className="font-serif text-xl font-semibold text-[#18181B] hover:text-[#2563EB] transition-colors duration-200"
              >
                天然
              </Link>
              <div className="flex items-center gap-1">
                <NavLink href="/">首页</NavLink>
                <NavLink href="/blog">博客</NavLink>
                <NavLink href="/tags">标签</NavLink>
                <NavLink href="/about">关于</NavLink>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="pt-24 pb-16 min-h-screen">
          <div className="max-w-5xl mx-auto px-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-200/50 bg-white/80">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[#3F3F46] text-sm">
                © 2025 天然. 湖南大学数字经济专业.
              </p>
              <div className="flex items-center gap-6 text-sm text-[#3F3F46]">
                <a
                  href="mailto:tianran0582@hnu.edu.cn"
                  className="hover:text-[#2563EB] transition-colors duration-200"
                >
                  邮箱
                </a>
                <a
                  href="https://tianran935.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2563EB] transition-colors duration-200"
                >
                  博客
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm text-[#3F3F46] hover:text-[#18181B] hover:bg-zinc-100 rounded-lg transition-all duration-200 cursor-pointer"
    >
      {children}
    </Link>
  );
}