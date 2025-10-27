"use client";

import { useState } from "react";
import styles from "./DetailedSearch.module.css";

export default function DetailedSearch() {
  const [isOpen, setIsOpen] = useState(false);

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
        <div
          className={
            isOpen
              ? styles.animatedRectangleOpen
              : styles.animatedRectangleClosed
          }
        ></div>
      </div>
    </div>
  );
}
