import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { ArrowLeft, BookOpen, Code, MessageSquare, TrendingUp } from "lucide-react";

// 定义主要标签分类及其映射关系
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

export default function TagsPage() {
  const allTags = getAllTags();

  // 统计每个分类的文章数量
  const categoryPostsCount: Record<string, number> = {};
  Object.keys(CATEGORY_MAP).forEach((cat) => {
    categoryPostsCount[cat] = 0;
  });

  allTags.forEach((tag) => {
    const posts = getPostsByTag(tag);
    const categories = TAG_TO_CATEGORY[tag] || ["随笔"];
    categories.forEach((category) => {
      categoryPostsCount[category] += posts.length;
    });
  });

  return (
    <div className="max-w-5xl mx-auto px-4">
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
          标签分类
        </h1>
        <p className="mt-3 text-gray-600">按主题浏览文章内容</p>
      </header>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Object.entries(CATEGORY_MAP).map(([key, { name, icon: Icon, description }]) => {
          const count = categoryPostsCount[key] || 0;
          return (
            <Link
              key={key}
              href={`/tags/category/${encodeURIComponent(key)}`}
              className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors duration-200">
                  <Icon size={20} className="text-blue-600" />
                </div>
                {count > 0 && (
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    {count} 篇
                  </span>
                )}
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {name}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            </Link>
          );
        })}
      </div>

      {/* All Tags */}
      {allTags.length > 0 && (
        <div className="mt-12">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-6">全部标签</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const posts = getPostsByTag(tag);
              return (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors duration-200"
                >
                  {tag}
                  <span className="ml-1.5 text-gray-400">{posts.length}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 mt-12 border-t border-gray-200">
        <p className="text-center text-gray-500 text-sm">感谢阅读</p>
      </footer>
    </div>
  );
}
