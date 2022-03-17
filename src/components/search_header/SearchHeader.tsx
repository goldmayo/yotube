import React, { useRef } from "react";
import styles from "./SearchHeader.module.css";

type SearchHeaderProps = {
  onSearch: (query: string) => void;
};

const SearchHeader = ({ onSearch }: SearchHeaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (inputRef.current) {
      const value: string = inputRef.current.value;
      onSearch(value);
    }
  };
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleSearch();
    console.log("click");
  };
  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
      console.log("keypress");
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.img} src="/images/logo.png" alt="logo" />
        <h1 className={styles.title}>Yotube</h1>
      </div>
      <input ref={inputRef} className={styles.input} type="search" placeholder="검색" onKeyPress={onKeyPress}></input>
      <button className={styles.button} type="submit" onClick={onClick}>
        <img className={styles.buttonImg} src="/images/search.png" alt="search icon" />
      </button>
    </header>
  );
};

export default SearchHeader;
