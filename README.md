# 天然的博客

个人博客项目，基于 Next.js 16 + TypeScript + Tailwind CSS 构建。

**在线访问：** [https://tianran936.github.io](https://tianran935.github.io)

## 技术栈

- **框架：** Next.js 16 (App Router)
- **语言：** TypeScript
- **样式：** Tailwind CSS 4
- **内容：** Markdown / Jupyter Notebook (.ipynb)
- **部署：** GitHub Pages (静态导出)

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建静态文件
npm run build
```

开发服务器启动后，访问 http://localhost:3000 预览。

## 部署

本项目使用 GitHub Actions 自动部署到 GitHub Pages。

推送代码到 `main` 分支会自动触发构建和部署：

```bash
git add .
git commit -m "Your message"
git push origin main
```

GitHub Actions 会执行以下步骤：
1. 安装 Node.js 20
2. 安装依赖
3. 运行 `npm run build` 生成静态文件到 `out/` 目录
4. 自动部署到 GitHub Pages

## 文章发布

1. 在 `content/posts/` 目录下创建新的 `.md` 或 `.ipynb` 文件
2. 文件开头添加 frontmatter 元数据：
   ```markdown
   ---
   title: "文章标题"
   date: "2025-01-01"
   excerpt: "文章摘要"
   tags: ["标签 1", "标签 2"]
   category: ["经济学","econometrics"]
   language: "zh"
   ---
   ```
3. 提交并推送到 GitHub，自动部署

## 图片资源放置规则

### 封面图片
放在 `public/images/covers/` 目录，使用与文章 slug 相同的文件名：
- `public/images/covers/双重差分法.png`

### 文章内容图片
放在 `public/images/posts/` 目录，在 Markdown 中使用绝对路径引用：
```markdown
![描述](/images/posts/图片名称.png)
```

### 注意事项

1. **文件名规范：**
   - 使用英文、数字、连字符（`-`）或下划线（`_`）
   - 避免空格、星号（`*`）等特殊字符
   - 中文文件名理论上支持，但建议优先使用英文

2. **路径格式：**
   - 必须使用以 `/` 开头的绝对路径
   - 不要使用相对路径（如 `./images` 或 `../images`）

3. **图片格式：**
   - 推荐使用 `.png` 或 `.jpg`
   - 封面图建议使用 `.jpg` 以减小文件大小

## 目录结构

```
my-blog/
├── content/posts/          # 博客文章（Markdown / Notebook）
├── public/
│   ├── images/
│   │   ├── covers/         # 封面图片
│   │   └── posts/          # 文章内容图片
│   └── .nojekyll           # 禁用 Jekyll 处理
├── src/
│   ├── app/                # Next.js App Router 页面
│   └── lib/                # 工具函数
├── .github/workflows/      # GitHub Actions 配置
│   └── deploy.yml          # Pages 部署工作流
├── next.config.ts          # Next.js 配置（静态导出）
└── package.json
```

## License

MIT
