import styles from "./page.module.css";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";

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

async function getSearchResults(): Promise<Article[]> {
  const filePath = path.join(process.cwd(), "app", "search", "data.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const parsedData = JSON.parse(fileContents);

  const result = z.array(ArticleSchema).safeParse(parsedData);

  if (!result.success) {
    console.error("Validation error:", result.error);
    return []; // Return empty array or throw an error based on desired behavior
  }

  return result.data;
}

export default async function SearchResults() {
  const searchResults = await getSearchResults();

  return (
    <div className={styles.container}>
      <h1>Search Results</h1>
      <div className={styles.cardGallery}>
        {searchResults.map((result, index) => (
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
        ))}
      </div>
    </div>
  );
}
