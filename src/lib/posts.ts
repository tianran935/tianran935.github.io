import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import math from 'remark-math';
import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import 'katex/dist/katex.min.css';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  category: string[];
  readingTime: string;
  language: 'zh' | 'en';
  firstImage?: string;
  cover?: string;
}

export interface Post extends PostMetadata {
  content: string;
  headings?: Heading[];
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Extract the first image path from markdown content
 * Matches both standard markdown ![](url) and HTML <img> tags
 */
function extractFirstImage(content: string): string | undefined {
  // Match markdown image syntax: ![alt](url)
  const markdownImageRegex = /!\[[^\]]*\]\(([^)]+)\)/;
  // Match HTML img tags: <img src="url"> or <img src='url'>
  const htmlImgRegex = /<img[^>]+src=["']([^"']+)["']/;

  // Try markdown syntax first
  const markdownMatch = content.match(markdownImageRegex);
  if (markdownMatch && markdownMatch[1]) {
    return markdownMatch[1];
  }

  // Try HTML img tag
  const htmlMatch = content.match(htmlImgRegex);
  if (htmlMatch && htmlMatch[1]) {
    return htmlMatch[1];
  }

  return undefined;
}

/**
 * Extract headings from rendered HTML content
 * This ensures IDs match what rehype-slug generated
 */
export function extractHeadingsFromHtml(htmlContent: string): Heading[] {
  const headings: Heading[] = [];
  // Match h2 and h3 tags with id attributes
  const headingRegex = /<(h[23])\s+id="([^"]+)"[^>]*>(.*?)<\/\1>/gs;
  let match;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1].charAt(1));
    const id = match[2];
    // Strip HTML tags from heading text
    const text = match[3].replace(/<[^>]+>/g, '').trim();

    headings.push({
      id,
      text,
      level,
    });
  }

  return headings;
}

export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const coversDirectory = path.join(process.cwd(), 'public/images/covers');

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx') || fileName.endsWith('.ipynb'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx?|ipynb)$/, '');
      const fullPath = path.join(postsDirectory, fileName);

      let data, content;

      if (fileName.endsWith('.ipynb')) {
        // Handle Jupyter Notebook
        const notebook = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        const cells = notebook.cells || [];

        // Extract frontmatter from first markdown cell
        let firstMdCell = '';
        let firstMdCellIndex = -1;
        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          if (cell.cell_type === 'markdown') {
            const cellSource = Array.isArray(cell.source) ? cell.source.join('') : (cell.source || '');
            if (cellSource.includes('---')) {
              firstMdCell = cellSource;
              firstMdCellIndex = i;
              break;
            }
          }
        }

        const { data: frontmatterData, content: cellContent } = matter(firstMdCell);
        data = frontmatterData;

        // Convert notebook to markdown for content, excluding frontmatter
        let markdownContent = '';
        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          const cellSource = Array.isArray(cell.source) ? cell.source.join('') : (cell.source || '');

          if (cell.cell_type === 'markdown') {
            // Skip frontmatter in the first markdown cell
            if (i === firstMdCellIndex && cellSource.includes('---')) {
              const { content: cellOnlyContent } = matter(cellSource);
              // Only add content after the frontmatter, skip the title line
              const lines = cellOnlyContent.split('\n').filter(line => line.trim() && !line.startsWith('# '));
              markdownContent += lines.join('\n') + '\n\n';
            } else {
              markdownContent += cellSource + '\n\n';
            }
          } else if (cell.cell_type === 'code') {
            markdownContent += '```python\n' + cellSource + '\n```\n\n';

            // Add cell outputs if available
            if (cell.outputs && cell.outputs.length > 0) {
              let outputContent = '';
              for (const output of cell.outputs) {
                if (output.output_type === 'stream' && output.text) {
                  const text = Array.isArray(output.text) ? output.text.join('') : output.text;
                  outputContent += text;
                } else if ((output.output_type === 'execute_result' || output.output_type === 'display_data') && output.data) {
                  if (output.data['text/plain']) {
                    const plainText = Array.isArray(output.data['text/plain']) ? output.data['text/plain'].join('') : output.data['text/plain'];
                    outputContent += plainText;
                  }
                  if (output.data['text/html']) {
                    const htmlText = Array.isArray(output.data['text/html']) ? output.data['text/html'].join('') : output.data['text/html'];
                    outputContent += htmlText;
                  }
                  if (output.data['text/markdown']) {
                    const mdText = Array.isArray(output.data['text/markdown']) ? output.data['text/markdown'].join('') : output.data['text/markdown'];
                    outputContent += mdText;
                  }
                }
              }
              if (outputContent) {
                // Use pre tag to preserve formatting for code output
                // Escape any HTML in the output to prevent XSS
                const escapedOutput = outputContent
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;');
                markdownContent += '<div class="code-output"><pre>' + escapedOutput + '</pre></div>\n\n';
              }
            }
          }
        }
        content = markdownContent;
      } else {
        // Handle regular markdown
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data: fileData, content: fileContent } = matter(fileContents);
        data = fileData;
        content = fileContent;
      }

      // Check if cover image exists for this post
      let coverImage: string | undefined;
      if (data.cover) {
        coverImage = data.cover;
      } else if (data['hx-cover']) {
        coverImage = data['hx-cover'];
      } else {
        // Check for cover file named after the slug
        const pngPath = path.join(coversDirectory, `${slug}.png`);
        const jpegPath = path.join(coversDirectory, `${slug}.jpeg`);
        const jpgPath = path.join(coversDirectory, `${slug}.jpg`);
        if (fs.existsSync(pngPath)) {
          coverImage = `/images/covers/${slug}.png`;
        } else if (fs.existsSync(jpegPath)) {
          coverImage = `/images/covers/${slug}.jpeg`;
        } else if (fs.existsSync(jpgPath)) {
          coverImage = `/images/covers/${slug}.jpg`;
        }
      }

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || content.slice(0, 150) + '...',
        tags: data.tags || [],
        category: data.category || 'general',
        readingTime: calculateReadingTime(content),
        language: data.language || 'zh',
        firstImage: extractFirstImage(content),
        cover: coverImage,
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  // Decode URL-encoded slug (e.g., "%E7%88%AC%E8%99%AB" -> "爬虫")
  const decodedSlug = decodeURIComponent(slug);
  const fullPath = path.join(postsDirectory, `${decodedSlug}.md`);
  const mdxPath = path.join(postsDirectory, `${decodedSlug}.mdx`);
  const ipynbPath = path.join(postsDirectory, `${decodedSlug}.ipynb`);

  let filePath = '';
  if (fs.existsSync(fullPath)) {
    filePath = fullPath;
  } else if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(ipynbPath)) {
    filePath = ipynbPath;
  } else {
    return null;
  }

  let data, content;

  if (filePath.endsWith('.ipynb')) {
    // Handle Jupyter Notebook
    const notebook = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const cells = notebook.cells || [];

    // Extract frontmatter from first markdown cell
    let firstMdCell = '';
    let firstMdCellIndex = -1;
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      if (cell.cell_type === 'markdown') {
        const cellSource = Array.isArray(cell.source) ? cell.source.join('') : (cell.source || '');
        if (cellSource.includes('---')) {
          firstMdCell = cellSource;
          firstMdCellIndex = i;
          break;
        }
      }
    }

    const { data: frontmatterData } = matter(firstMdCell);
    data = frontmatterData;

    // Convert notebook to markdown for content, excluding frontmatter
    let markdownContent = '';
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const cellSource = Array.isArray(cell.source) ? cell.source.join('') : (cell.source || '');

      if (cell.cell_type === 'markdown') {
        // Skip frontmatter in the first markdown cell
        if (i === firstMdCellIndex && cellSource.includes('---')) {
          const { content: cellOnlyContent } = matter(cellSource);
          // Only add content after the frontmatter, skip the title line
          const lines = cellOnlyContent.split('\n').filter(line => line.trim() && !line.startsWith('# '));
          markdownContent += lines.join('\n') + '\n\n';
        } else {
          markdownContent += cellSource + '\n\n';
        }
      } else if (cell.cell_type === 'code') {
        markdownContent += '```python\n' + cellSource + '\n```\n\n';

        // Add cell outputs if available with special wrapper
        if (cell.outputs && cell.outputs.length > 0) {
          let outputContent = '';
          for (const output of cell.outputs) {
            if (output.output_type === 'stream' && output.text) {
              const text = Array.isArray(output.text) ? output.text.join('') : output.text;
              outputContent += text;
            } else if ((output.output_type === 'execute_result' || output.output_type === 'display_data') && output.data) {
              if (output.data['text/plain']) {
                const plainText = Array.isArray(output.data['text/plain']) ? output.data['text/plain'].join('') : output.data['text/plain'];
                outputContent += plainText;
              }
              if (output.data['text/html']) {
                const htmlText = Array.isArray(output.data['text/html']) ? output.data['text/html'].join('') : output.data['text/html'];
                outputContent += htmlText;
              }
              if (output.data['text/markdown']) {
                const mdText = Array.isArray(output.data['text/markdown']) ? output.data['text/markdown'].join('') : output.data['text/markdown'];
                outputContent += mdText;
              }
            }
          }
          if (outputContent) {
            // Use pre tag to preserve formatting for code output
            // Escape any HTML in the output to prevent XSS
            const escapedOutput = outputContent
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;');
            markdownContent += '<div class="not-prose code-output"><pre>' + escapedOutput + '</pre></div>\n\n';
          }
        }
      }
    }
    content = markdownContent;
  } else {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: fileData, content: fileContent } = matter(fileContents);
    data = fileData;
    content = fileContent;
  }

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || content.slice(0, 150) + '...',
    tags: data.tags || [],
    category: data.category || 'general',
    readingTime: calculateReadingTime(content),
    language: data.language || 'zh',
    firstImage: extractFirstImage(content),
    content,
  };
}

export async function getPostHtml(slug: string): Promise<Post | null> {
  // Decode URL-encoded slug (e.g., "%E7%88%AC%E8%99%AB" -> "爬虫")
  const decodedSlug = decodeURIComponent(slug);
  const post = getPostBySlug(decodedSlug);
  if (!post) return null;

  const processedContent = await remark()
    .use(gfm)
    .use(math)
    // @ts-ignore - remark-rehype options type issue
    .use(remark2rehype, {
      hand: {
        // Custom handler for math nodes
        math: (h: any, node: any) => {
          return h(node, 'div', { className: ['katex-display'] }, [
            h(node, 'span', {}, node.value)
          ]);
        },
        inlineMath: (h: any, node: any) => {
          return h(node, 'span', { className: ['katex-inline'] }, node.value);
        }
      },
      allowDangerousHtml: true,
    })
    .use(rehypeKatex)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(post.content);

  const htmlContent = processedContent.toString();

  // Validate firstImage to ensure it's a valid path
  let validFirstImage = post.firstImage;
  if (validFirstImage && !validFirstImage.startsWith('/') && !validFirstImage.startsWith('http')) {
    validFirstImage = undefined;
  }

  return {
    ...post,
    content: htmlContent,
    headings: extractHeadingsFromHtml(htmlContent),
    firstImage: validFirstImage,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): PostMetadata[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}