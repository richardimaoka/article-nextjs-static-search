import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search articles..."
          className={styles.searchInput}
        />
      </div>
    </main>
  );
}