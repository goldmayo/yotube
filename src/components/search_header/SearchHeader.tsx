import React from "react";
import styles from "./SearchHeader.module.css";

type SearchHeaderProps = {};

const SearchHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.img} src="/images/logo.png" alt="logo" />
        <h1 className={styles.title}>Yotube</h1>
      </div>
      <input className={styles.input} type="search" placeholder="검색"></input>
      <button className={styles.button} type="submit">
        <img className={styles.buttonImg} src="/images/search.png" alt="search icon" />
      </button>
    </header>
  );
};

export default SearchHeader;
