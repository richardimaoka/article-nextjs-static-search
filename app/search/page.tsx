import styles from "./page.module.css";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import DetailedSearch from "./DetailedSearch";

interface Article {
  title: string;
  article: string;
  category: string;
  date: string;
  views: number;
  tags: string[];
}

const ArticleSchema = z.object({
  title: z.string(),
  article: z.string(),
  category: z.string(),
  date: z.string(),
  views: z.number(),
  tags: z.array(z.string()),
}) satisfies z.ZodType<Article>;

async function getSearchResults(
  query: string,
  categories: string[]
): Promise<Article[]> {
  const filePath = path.join(process.cwd(), "app", "search", "data.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const parsedData = JSON.parse(fileContents);

  const result = z.array(ArticleSchema).safeParse(parsedData);

  if (!result.success) {
    console.error("Validation error:", result.error);
    return []; // Return empty array or throw an error based on desired behavior
  }

  let articlesTemp = result.data;

  if (query) {
    articlesTemp = articlesTemp.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.article.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (categories && categories.length > 0) {
    articlesTemp = articlesTemp.filter((article) =>
      categories.includes(article.category)
    );
  }

  return articlesTemp;
}

type SearchParams = { [key: string]: string | string[] | undefined };

async function extractFilterWord(
  searchParams: Promise<SearchParams>
): Promise<string> {
  const { query } = await searchParams;
  if (Array.isArray(query)) {
    return query.join(" ");
  } else if (typeof query === "string") {
    return query;
  } else {
    return "";
  }
}

async function extractCategories(
  searchParams: Promise<SearchParams>
): Promise<string[]> {
  const { category } = await searchParams;
  if (Array.isArray(category)) {
    return category;
  } else if (typeof category === "string") {
    return [category];
  } else {
    return [];
  }
}

interface CategoryItem {
  name: string;
  category: string;
}

async function getAllCategories(): Promise<CategoryItem[]> {
  const filePath = path.join(process.cwd(), "app", "search", "categories.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents) as CategoryItem[];
}

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function SearchResults({ searchParams }: Props) {
  const query = await extractFilterWord(searchParams);
  const categories = await extractCategories(searchParams);
  const searchResults = await getSearchResults(query, categories); // Pass query and categories to getSearchResults

  const allCategories = await getAllCategories();

  return (
    <div className={styles.container}>
      <h1>Search Results</h1>
      <form action="/search" method="GET" className={styles.searchFormInline}>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            name="query"
            defaultValue={query}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </div>
        <DetailedSearch
          categories={categories}
          allCategoriesData={allCategories}
        />
      </form>
      <div className={styles.cardGallery}>
        {searchResults.length === 0 ? (
          <p>No results found.</p>
        ) : (
          searchResults.map((result, index) => (
            <div key={index} className={styles.card}>
              <h2>{result.title}</h2>
              <p className={styles.category}>{result.category}</p>
              <p className={styles.date}>{result.date}</p>
              <p>{result.article.substring(0, 150)}...</p>
              <div className={styles.tags}>
                {result.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className={styles.views}>Views: {result.views}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
