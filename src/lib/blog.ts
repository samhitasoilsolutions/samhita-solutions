import type { Lang } from "@/lib/i18n/LanguageContext";

export interface BlogQuickFact {
  label: string;
  value: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  readTime: string;
  image: string;
  heroImage: string;
  badges: string[];
  author: string;
  authorRole: string;
  authorBio: string;
  authorInitials: string;
  quickFacts: BlogQuickFact[];
  toc: { id: string; label: string }[];
  html: string;
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const [, frontmatter, body] = match;
  const data: Record<string, string> = {};

  for (const line of frontmatter.split("\n")) {
    const lineMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!lineMatch) continue;
    const [, key, rawValue] = lineMatch;
    data[key] = rawValue.trim().replace(/^"(.*)"$/, "$1");
  }

  return { data, body: body.trim() };
}

function parseQuickFacts(raw?: string): BlogQuickFact[] {
  if (!raw) return [];
  return raw
    .split("|")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [label, value] = entry.split(":").map((part) => part.trim());
      return { label, value: value ?? "" };
    });
}

function parseBadges(raw?: string): string[] {
  if (!raw) return [];
  return raw.split(",").map((b) => b.trim()).filter(Boolean);
}

function extractToc(html: string): { id: string; label: string }[] {
  const matches = [...html.matchAll(/<h2[^>]*id="([^"]+)"[^>]*>(.*?)<\/h2>/g)];
  return matches.map(([, id, label]) => ({ id, label: label.replace(/<[^>]+>/g, "") }));
}

function initialsFromName(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const imageAssets = import.meta.glob("/src/assets/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function resolveImage(fileName?: string): string {
  if (!fileName) return "";
  const entry = Object.entries(imageAssets).find(([path]) => path.endsWith(`/${fileName}`));
  return entry ? entry[1] : fileName;
}

const modules = import.meta.glob("/src/content/blog/*.html", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

interface RawFile {
  data: Record<string, string>;
  body: string;
}

function parseLangSections(raw: string): Partial<Record<Lang, RawFile>> {
  const sections: Partial<Record<Lang, RawFile>> = {};
  const parts = raw.replace(/\r\n/g, "\n").split(/<!--\s*lang:(en|te)\s*-->/);

  // parts[0] is anything before the first marker (ignored); then alternating [lang, content, lang, content, ...]
  for (let i = 1; i < parts.length; i += 2) {
    const lang = parts[i] as Lang;
    const content = parts[i + 1] ?? "";
    sections[lang] = parseFrontmatter(content.trim());
  }

  return sections;
}

const filesBySlug = new Map<string, Partial<Record<Lang, RawFile>>>();

for (const [path, raw] of Object.entries(modules)) {
  const fileName = path.split("/").pop()!;
  const slug = fileName.replace(/\.html$/, "");
  filesBySlug.set(slug, parseLangSections(raw));
}

function buildPost(slug: string, lang: Lang): BlogPost | undefined {
  const files = filesBySlug.get(slug);
  if (!files) return undefined;

  const file = files[lang] ?? files.en;
  if (!file) return undefined;

  const { data, body: html } = file;
  const author = data.author ?? "Samhita Soil Solutions";

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    date: data.date ?? "",
    tag: data.tag ?? "General",
    readTime: data.readTime ?? "",
    image: resolveImage(data.image),
    heroImage: resolveImage(data.heroImage),
    badges: parseBadges(data.badges),
    author,
    authorRole: data.authorRole ?? "",
    authorBio: data.authorBio ?? "",
    authorInitials: initialsFromName(author),
    quickFacts: parseQuickFacts(data.quickFacts),
    toc: extractToc(html),
    html,
  };
}

export function getAllPosts(lang: Lang = "en"): BlogPost[] {
  return [...filesBySlug.keys()]
    .map((slug) => buildPost(slug, lang))
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string, lang: Lang = "en"): BlogPost | undefined {
  return buildPost(slug, lang);
}

export function formatBlogDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString(locale === "te" ? "te-IN" : "en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
