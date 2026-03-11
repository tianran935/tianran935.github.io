import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { ArrowLeft, ArrowRight, BookOpen, Code, MessageSquare, TrendingUp } from "lucide-react";

interface PageProps {
  params: Promise<{ category: string }>;
}

const CATEGORY_MAP: Record<string, { name: string; icon: any; description: string }> = {
  经济:{
    name: "经济",
    icon: BookOpen,
    description: "因果推断、计量经济、政策评估等经济学研究",
  },
  技术:{
    name: "技术",
    icon: Code,
    description: "机器学习、NLP、爬虫、数据处理等技术分享",
  },
  随笔:{
    name: "随笔",
    icon: MessageSquare,
    description: "日常思考、生活记录、读书心得",
  },
  econometrics: {
    name: "econometrics",
    icon: TrendingUp,
    description: "计量经济学、因果推断、面板数据等研究方法",
  },
};

// 标签到分类的映射（支持一个标签映射到多个分类）
const TAG_TO_CATEGORY: Record<string, string[]> = {
  // 经济类
  DID: ["经济"],
  双重差分:["经济", "econometrics"],
  平行趋势:["经济", "econometrics"],
  ATT: ["经济"],
  合成控制:["经济"],
  SCM: ["经济"],
  SDID: ["经济"],
  CSDID: ["经济"],
  IW: ["经济"],
  DIDM: ["经济"],
  PanelMatch: ["经济", "econometrics"],
  固定效应:["经济", "econometrics"],
  TWFE: ["经济", "econometrics"],
  因果推断:["经济", "econometrics"],
  熵平衡:["经济"],
  安慰剂检验:["经济"],
  样本选择偏差:["经济"],
  PSM: ["经济"],
  Heckman: ["经济"],
  异质性:["经济"],
  // 技术类
  NLP: ["技术"],
  术语提取:["技术"],
  jieba: ["技术"],
  embedding: ["技术"],
  因子模型:["技术"],
  交互项:["技术"],
  爬虫:["技术"],
  HTTP: ["技术"],
  数据抓取:["技术"],
  异步:["技术"],
  Playwright: ["技术"],
};

function getCategoryPosts(category: string) {
  const allTags = getAllTags();
  const postsMap = new Map<string, ReturnType<typeof getPostsByTag>[number]>();

  allTags.forEach((tag) => {
    const tagCategories = TAG_TO_CATEGORY[tag] || ["随笔"];
    if (tagCategories.includes(category)) {
      const posts = getPostsByTag(tag);
      posts.forEach((post) => {
        if (!postsMap.has(post.slug)) {
          postsMap.set(post.slug, post);
        }
      });
    }
  });

  return Array.from(postsMap.values()).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((category) => ({ category }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const posts = getCategoryPosts(decodedCategory);
  const categoryInfo = CATEGORY_MAP[decodedCategory];

  if (!categoryInfo) {
    notFound();
  }

  const Icon = categoryInfo.icon;

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <header className="pt-12 pb-8">
        <Link
          href="/tags"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          返回标签页
        </Link>
        <div className="mt-6 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <Icon size={24} className="text-blue-600" />
          </div>
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900">
              {categoryInfo.name}
            </h1>
            <p className="mt-2 text-gray-600">{categoryInfo.description}</p>
          </div>
        </div>
        <p className="mt-4 text-gray-500">共 {posts.length} 篇文章</p>
      </header>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="py-20 text-center bg-gray-50 rounded-2xl">
          <p className="text-gray-500">该分类下暂无文章</p>
        </div>
      ) : (
        <div className="grid gap-6 mt-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {/* Cover Image - Only show if post has cover */}
                {post.cover && (
                  <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-5 md:p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags
                      .filter((tag) => {
                        const cats = TAG_TO_CATEGORY[tag] || ["随笔"];
                        return cats.includes(decodedCategory);
                      })
                      .slice(0, 3)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-snug">
                    {post.title}
                  </h2>

                  {/* Date */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="flex items-center gap-1 text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      阅读全文
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 mt-12 border-t border-gray-200">
        <Link
          href="/tags"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          返回标签页
        </Link>
      </footer>
    </div>
  );
}
