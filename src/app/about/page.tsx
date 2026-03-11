import Link from "next/link";
import { ArrowLeft, Mail, Github, MapPin, Calendar, GraduationCap, Code2, Phone, ExternalLink, Award, BookOpen, Briefcase } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Back Link */}
      <div className="pt-4 pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#3F3F46] hover:text-[#18181B] transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft size={16} />
          返回首页
        </Link>
      </div>

      {/* Hero Section */}
      <header className="border-b border-gray-100 pb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">天然</h1>
            <p className="mt-2 text-xl text-gray-600">湖南大学 · 数字经济专业</p>
            <div className="mt-4 flex items-center gap-2 text-gray-500">
              <MapPin size={16} />
              <span>湖南·长沙</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:tianran0582@hnu.edu.cn"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Mail size={18} />
              <span>联系我</span>
            </a>
            <a
              href="tel:+86-13808329665"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Phone size={18} />
              <span>电话</span>
            </a>
            <a
              href="https://tianran935.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ExternalLink size={18} />
              <span>博客</span>
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-gray-500">GPA: </span>
              <span className="font-semibold text-gray-900">3.91/4.0</span>
            </div>
            <div>
              <span className="text-gray-500">专业排名： </span>
              <span className="font-semibold text-gray-900">1/61</span>
            </div>
            <div>
              <span className="text-gray-500">荣誉： </span>
              <span className="font-semibold text-gray-900">国家奖学金 (TOP 1%)</span>
            </div>
            <div>
              <span className="text-gray-500">语言： </span>
              <span className="font-semibold text-gray-900">IELTS 7.0 / CET6 580</span>
            </div>
          </div>
        </div>
      </header>

      <main className="py-12">
        {/* Education Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <GraduationCap size={24} className="text-gray-400" />
            教育背景
          </h2>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h3 className="text-xl font-semibold text-gray-900">湖南大学</h3>
              <span className="text-gray-500 flex items-center gap-1 text-sm">
                <Calendar size={14} />
                2023.09 – 至今
              </span>
            </div>
            <p className="text-gray-600 mt-1">数字经济专业 · 本科</p>
            <div className="mt-3">
              <p className="text-gray-600 text-sm">
                <span className="font-medium text-gray-700">核心课程：</span>
                高等数学 A、线性代数 A、计量经济学、博弈论、面向对象编程 (Python)、数据结构、深度学习、统计学等
              </p>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <BookOpen size={24} className="text-gray-400" />
            科研经历
          </h2>

          <div className="space-y-6">
            {/* Paper 1 */}
            <div className="border-l-2 border-gray-200 pl-6 relative">
              <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-gray-900 rounded-full" />
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  "Will Cooperation Boost Green Innovation? Evidence from the Green Alliances of China's Listed Companies"
                </h3>
                <span className="text-gray-500 text-sm whitespace-nowrap">2025.1 – 至今</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">[Status: Revise and Resubmit at Business Strategy and the Environment, 2026]</p>
              <p className="text-gray-600 text-sm mt-2">与胡瑶、涂腾、史云梦合作</p>
              <ul className="mt-3 space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  探讨中国上市公司加入绿色联盟对企业绿色创新的影响，分析知识共享、风险共担及市场信号等机制
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  采用手工文本阅读法对年报进行深度挖掘，构建准自然实验
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  论文处于 Business Strategy and the Environment (中科院 1 区/ABS 3) 的 R&R 阶段
                </li>
              </ul>
              <a
                href="/papers/green-alliance-innovation.docx"
                target="_blank"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ExternalLink size={16} />
                下载文档
              </a>
            </div>

            {/* Paper 2 */}
            <div className="border-l-2 border-gray-200 pl-6 relative">
              <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-gray-900 rounded-full" />
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  "Judicial Institutions and cross-regional Knowledge Spillovers: Evidence from the Reform of China's Intellectual Property Court"
                </h3>
                <span className="text-gray-500 text-sm whitespace-nowrap">2024.10 – 至今</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">[Status: In preparation for China Economic Review]</p>
              <p className="text-gray-600 text-sm mt-2">与胡瑶合作</p>
              <ul className="mt-3 space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  以 2014 年中国知识产权法院（IPC）改革为准自然实验，探讨司法机构改革对跨区域知识溢出的影响
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  识别跨区域管辖制度特征，运用计量模型检验对地理、技术及文化距离城市的异质性影响
                </li>
              </ul>
              <a
                href="/papers/judicial-institutions.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ExternalLink size={16} />
                查看 PDF
              </a>
            </div>

            {/* Paper 3 */}
            <div className="border-l-2 border-gray-200 pl-6 relative">
              <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-gray-900 rounded-full" />
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <h3 className="text-lg font-semibold text-gray-900">"ESG 评级与企业环保专项行动"</h3>
                <span className="text-gray-500 text-sm whitespace-nowrap">2024.5 – 2025.2</span>
              </div>
              <ul className="mt-3 space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  探讨环保专项行动对企业 ESG 表现的影响机理，分析环境管理体系认证与外部绿色资金激励的调节效应
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  运用 Stata 构建双重差分模型（DID），执行机制识别检验、GroupDiff 差异显著性检验等稳健性测试
                </li>
              </ul>
              <a
                href="/papers/esg-paper.docx"
                target="_blank"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ExternalLink size={16} />
                下载文档
              </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Briefcase size={24} className="text-gray-400" />
            项目经历
          </h2>

          <div className="space-y-6">
            {/* Project 1 */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">超大规模异构数据语义匹配</h3>
                  <p className="text-gray-500 text-sm mt-1">核心开发者 · GitHub: IndustryMatching</p>
                </div>
                <span className="text-gray-500 text-sm">2025.03 – 2025.12</span>
              </div>
              <ul className="mt-3 space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  针对 683GB（约 3 亿条）异构语料，构建高性能语义匹配流水线
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  采用 Sentence-BERT 进行向量化，设计多进程并行加速，将 6 个月计算压缩至 2 个月，节省 60% 时长
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  语义匹配率由 60% 提升至 90%，产出了高精度行业关联数据集
                </li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">生成式 AI 行业指标测度与大规模语料处理流水线</h3>
                  <p className="text-gray-500 text-sm mt-1">项目负责人 / 数据工程</p>
                </div>
                <span className="text-gray-500 text-sm">2025.09 – 至今</span>
              </div>
              <ul className="mt-3 space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  运用 LLM 批量处理企业年报语料，构建生成式 AI 行业词典，建立企业 AI 应用程度指标
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  采用 DeepSeek-Chat 与 Qwen3-235B 进行语料提取，集成 GPT-5 实现术语相关性重排与量化评分
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  实现从原始语料到结构化术语清单的端到端自动化产出
                </li>
              </ul>
            </div>

            {/* Project 3 */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">长沙房价影响因素多维测度与空间数据库</h3>
                  <p className="text-gray-500 text-sm mt-1">数据工程 / 经济数据分析</p>
                </div>
                <span className="text-gray-500 text-sm">2025.12</span>
              </div>
              <ul className="mt-3 space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  编写高并发爬虫抓取安居客及贝壳全量房源数据，集成 LangGraph GUI Agent 自动化绕过验证码
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  设计 MySQL 混合架构数据库，通过预计算汇总表与索引优化实现高效查询
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  产出包含 401 条高精房源及配套设施信息的结构化数据集
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Competitions Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Award size={24} className="text-gray-400" />
            竞赛与荣誉
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-900">中国大学生计算机设计大赛</h3>
                <p className="text-gray-600 text-sm">国家级二等奖 · 负责人 · 数据可视化赛道</p>
              </div>
              <span className="text-gray-500 text-sm">2025.03</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-900">全国大学生数学建模竞赛</h3>
                <p className="text-gray-600 text-sm">省级二等奖</p>
              </div>
              <span className="text-gray-500 text-sm">2024.09</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-900">国家奖学金</h3>
                <p className="text-gray-600 text-sm">TOP 1% · 校优秀学生</p>
              </div>
              <span className="text-gray-500 text-sm">2024</span>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Code2 size={24} className="text-gray-400" />
            技术技能
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">数据分析与工程</h3>
              <div className="flex flex-wrap gap-2">
                {["Python (Pandas, NumPy, Matplotlib, Joblib)", "SQL", "ArcGIS", "Stata"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">模型算法</h3>
              <div className="flex flex-wrap gap-2">
                {["因果推断 (DID, IV, PSM)", "遗传算法", "模拟退火"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">机器学习与大语言模型</h3>
              <div className="flex flex-wrap gap-2">
                {["YOLO", "Sentence-BERT", "LangChain", "LangGraph", "AI Agent"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">其他技能</h3>
              <div className="flex flex-wrap gap-2">
                {["Git", "LaTeX", "团队协作", "技术文档"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2025 天然。All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:tianran0582@hnu.edu.cn"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Mail size={20} />
            </a>
            <a
              href="tel:+86-13808329665"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Phone size={20} />
            </a>
            <a
              href="https://tianran935.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
