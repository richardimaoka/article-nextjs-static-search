"use client";

import { useState } from "react";
import styles from "./DetailedSearch.module.css";

export default function DetailedSearch() {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "政治",
    "経済",
    "外交",
    "社会",
    "文化",
    "科学",
    "テクノロジー",
    "環境",
    "医療",
    "教育",
    "スポーツ",
    "エンタメ",
    "地域",
    "国際",
    "ビジネス",
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
              <label key={cat} className={styles.categoryLabel}>
                <input type="checkbox" name={`category-${cat}`} value={cat} />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
