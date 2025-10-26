import styles from "./page.module.css";
import fs from "fs/promises";
import path from "path";

interface Article {
  title: string;
  article: string;
  category: string;
  date: string;
  views: number;
  tags: string[];
}

async function getSearchResults(): Promise<Article[]> {
  const filePath = path.join(process.cwd(), "app", "search", "data.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents) as Article[];
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
