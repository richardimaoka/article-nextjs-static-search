"use client";

import { useState } from "react";
import styles from "./DetailedSearch.module.css";

export default function DetailedSearch() {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { name: "政治", category: "politics" },
    { name: "経済", category: "economy" },
    { name: "外交", category: "diplomacy" },
    { name: "社会", category: "society" },
    { name: "文化", category: "culture" },
    { name: "科学", category: "science" },
    { name: "テクノロジー", category: "technology" },
    { name: "環境", category: "environment" },
    { name: "医療", category: "healthcare" },
    { name: "教育", category: "education" },
    { name: "スポーツ", category: "sports" },
    { name: "エンタメ", category: "entertainment" },
    { name: "地域", category: "local" },
    { name: "国際", category: "international" },
    { name: "ビジネス", category: "business" },
  ];

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div>
        <button
          type="button"
          className={
            isOpen
              ? styles.detailedSearchButtonToClose
              : styles.detailedSearchButtonToOpen
          }
          onClick={toggleOpen}
        >
          {isOpen ? "閉じる" : "詳細検索"}
        </button>
      </div>
      <div
        className={
          isOpen
            ? styles.animatedRectangleContainerOpen
            : styles.animatedRectangleContainerClosed
        }
      >
        <div className={styles.animatedRectangle}>
          <div className={styles.categoryGrid}>
            {categories.map((cat) => (
              <label key={cat.category} className={styles.categoryLabel}>
                <input
                  type="checkbox"
                  name={"categories"}
                  value={cat.category}
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
