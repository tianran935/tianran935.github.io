import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <header className="pt-12 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          返回首页
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-6">
          博客文章
        </h1>
        <p className="mt-3 text-gray-600">
          {posts.length > 0 ? `共 ${posts.length} 篇文章` : "暂无文章"}
        </p>
      </header>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="py-20 text-center bg-gray-50 rounded-2xl">
          <p className="text-gray-500">暂无文章，敬请期待...</p>
        </div>
      ) : (
        <div className="grid gap-6 mt-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {/* Cover Image - Integrated with card */}
                {post.cover && (
                  <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Content - Compact layout */}
                <div className="p-5 md:p-6">
                  {/* Tags - Inline with date */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-snug">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="mt-4 flex items-center gap-2 text-blue-600 text-sm font-medium">
                    <span>阅读全文</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 mt-12 border-t border-gray-200">
        <p className="text-center text-gray-500 text-sm">
          感谢阅读
        </p>
      </footer>
    </div>
  );
}
