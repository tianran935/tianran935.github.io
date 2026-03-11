import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 6);

  return (
    <div className="space-y-16">
      {/* Hero Section with Background */}
      <section className="relative py-16 md:py-24 -mx-6 px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/hero-bg.jpg"
            alt="背景图片"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/80 to-white/90" />

        <div className="relative grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 md:col-span-8">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-[#18181B] leading-tight">
              天然
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-[#3F3F46] leading-relaxed max-w-2xl">
              湖南大学数字经济专业
            </p>
            <p className="mt-3 text-lg text-[#3F3F46] leading-relaxed max-w-2xl">
              专注于经济学研究、数据分析与机器学习应用
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:tianran0582@hnu.edu.cn"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#18181B] text-white rounded-2xl hover:bg-[#3F3F46] transition-colors duration-200 cursor-pointer font-medium text-lg"
              >
                联系我
                <ArrowRight size={20} />
              </a>
              <a
                href="/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-zinc-300 text-[#18181B] rounded-2xl hover:bg-zinc-50 transition-colors duration-200 cursor-pointer text-lg"
              >
                我的 CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts with Cover Images */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#18181B]">
            最新文章
          </h2>
          {posts.length > 6 && (
            <Link
              href="/blog"
              className="flex items-center gap-2 text-[#2563EB] hover:underline cursor-pointer"
            >
              查看全部
              <ArrowRight size={16} />
            </Link>
          )}
        </div>

        {recentPosts.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-3xl border border-zinc-200">
            <p className="text-[#3F3F46]">暂无文章，敬请期待...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <article
                key={post.slug}
                className={`group ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block bg-white rounded-3xl border border-zinc-200 hover:border-[#2563EB]/30 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden h-full"
                >
                  {/* Cover Image - Only show if post has cover */}
                  {post.cover && (
                    <>
                      <div className={`relative overflow-hidden bg-zinc-100 ${index === 0 ? "h-56 md:h-72" : "h-48"}`}>
                        <Image
                          src={post.cover}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-white/90 backdrop-blur text-[#18181B] rounded-full text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Content */}
                  <div className={`p-6 ${!post.cover && index === 0 ? "md:py-10" : ""}`}>
                    <h3 className={`font-serif font-semibold text-[#18181B] group-hover:text-[#2563EB] transition-colors duration-200 ${
                      index === 0 ? "text-2xl md:text-3xl" : "text-xl"
                    }`}>
                      {post.title}
                    </h3>
                    <p className={`mt-3 text-[#3F3F46] leading-relaxed line-clamp-2 ${
                      index === 0 ? "text-base" : "text-sm"
                    }`}>
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-[#3F3F46]">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {post.readingTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Quick Links */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickLink
            href="/blog"
            title="博客文章"
            description="阅读我的研究笔记和技术分享"
          />
          <QuickLink
            href="/tags"
            title="标签分类"
            description="按主题浏览文章内容"
          />
          <QuickLink
            href="/about"
            title="关于我"
            description="了解我的研究背景和兴趣"
          />
        </div>
      </section>
    </div>
  );
}

function QuickLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group p-6 bg-white rounded-2xl border border-zinc-200 hover:border-[#2563EB]/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <h3 className="font-serif text-xl font-semibold text-[#18181B] group-hover:text-[#2563EB] transition-colors duration-200">
        {title}
      </h3>
      <p className="mt-2 text-sm text-[#3F3F46]">{description}</p>
    </Link>
  );
}