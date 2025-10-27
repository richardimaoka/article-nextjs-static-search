"use client";

import { useState } from "react";
import styles from "./DetailedSearch.module.css";

interface CategoryItem {
  name: string;
  category: string;
}

type Props = {
  categories: string[];
  allCategoriesData: CategoryItem[];
};

export default function DetailedSearch(props: Props) {
  const defaultOpen = props.categories.length > 0;
  const [isOpen, setIsOpen] = useState(defaultOpen);

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
            {props.allCategoriesData.map((cat) => (
              <label key={cat.category} className={styles.categoryLabel}>
                <input
                  type="checkbox"
                  name="category"
                  value={cat.category}
                  defaultChecked={props.categories.includes(cat.category)}
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
