import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.searchBox}>
        <form action="/search" method="GET" className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search articles..."
            className={styles.searchInput}
            name="query"
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      </div>
    </main>
  );
}
