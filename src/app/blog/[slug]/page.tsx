import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostHtml, getAllPosts } from "@/lib/posts";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import PostHero from "@/components/PostHero";
import fs from 'fs';
import path from 'path';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Check if cover image exists and return correct path
function getCoverImagePath(slug: string): string {
  // Decode URL-encoded slug (e.g., "%E5%8F%8C%E9%87%8D" -> "双重")
  const decodedSlug = decodeURIComponent(slug);
  const coversDir = path.join(process.cwd(), 'public/images/covers');

  // Try PNG first
  const pngPath = path.join(coversDir, `${decodedSlug}.png`);
  if (fs.existsSync(pngPath)) {
    return `/images/covers/${decodedSlug}.png`;
  }

  // Try JPEG
  const jpegPath = path.join(coversDir, `${decodedSlug}.jpeg`);
  if (fs.existsSync(jpegPath)) {
    return `/images/covers/${decodedSlug}.jpeg`;
  }

  // Try JPG
  const jpgPath = path.join(coversDir, `${decodedSlug}.jpg`);
  if (fs.existsSync(jpgPath)) {
    return `/images/covers/${decodedSlug}.jpg`;
  }

  // Fall back to default
  return `/images/covers/default.jpg`;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostHtml(slug);

  if (!post) {
    notFound();
  }

  // Use first image from content as cover, or fall back to default cover
  // Validate firstImage to ensure it's a valid path
  const validFirstImage = post.firstImage && (post.firstImage.startsWith('/') || post.firstImage.startsWith('http'))
    ? post.firstImage
    : undefined;
  const coverImage = validFirstImage || getCoverImagePath(slug);

  return (
    <article className="space-y-8">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-[#3F3F46] hover:text-[#18181B] transition-colors duration-200 cursor-pointer"
      >
        <ArrowLeft size={16} />
        返回博客
      </Link>

      {/* Hero Image */}
      <PostHero
        src={coverImage}
        alt={post.title}
      >
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur text-[#18181B] rounded-full text-xs font-medium hover:bg-white transition-colors duration-200 cursor-pointer"
              >
                <Tag size={12} />
                {tag}
              </Link>
            ))}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-white leading-tight max-w-3xl">
            {post.title}
          </h1>
        </div>
      </PostHero>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-[#3F3F46] py-4 border-b border-zinc-200/50">
        <span className="flex items-center gap-2">
          <Calendar size={16} />
          {post.date}
        </span>
        <span className="flex items-center gap-2">
          <Clock size={16} />
          {post.readingTime}
        </span>
      </div>

      {/* Table of Contents */}
      {post.headings && post.headings.length > 0 && (
        <nav className="mb-8 p-6 bg-white/80 backdrop-blur rounded-2xl border border-zinc-200/50">
          <h2 className="font-serif text-lg font-semibold text-[#18181B] mb-4">目录</h2>
          <ul className="space-y-2">
            {post.headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
              >
                <a
                  href={`#${heading.id}`}
                  className="block text-sm text-[#3F3F46] hover:text-[#18181B] transition-colors duration-200"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none py-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer */}
      <footer className="pt-8 border-t border-zinc-200/50">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[#3F3F46] text-sm">
            感谢阅读！如有问题欢迎联系我。
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#18181B] text-white rounded-xl hover:bg-[#3F3F46] transition-colors duration-200 cursor-pointer text-sm font-medium"
          >
            <ArrowLeft size={16} />
            查看更多文章
          </Link>
        </div>
      </footer>
    </article>
  );
}