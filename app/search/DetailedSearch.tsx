"use client";

import { useState } from "react";
import styles from "./DetailedSearch.module.css";

export default function DetailedSearch() {
  const [showRectangle, setShowRectangle] = useState(false);

  const toggleRectangle = () => {
    setShowRectangle(!showRectangle);
  };

  return (
    <div>
      <button
        type="button"
        className={styles.detailedSearchButton}
        onClick={toggleRectangle}
      >
        詳細検索
      </button>
      {showRectangle && <div className={styles.animatedRectangle}></div>}
    </div>
  );
}
