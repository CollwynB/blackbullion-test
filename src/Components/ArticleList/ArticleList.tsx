import { useEffect, useState } from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import Article from "../../types/Article";

import "./ArticleList.css";
import { paginate } from "../../utils/array";
import ListControls from "../ListControls/ListControls";
import { SortValue } from "./types/SortValue";
import { numberFromDuration } from "../../utils/text";
import ListPager from "../ListPager/ListPager";

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesToShow, setArticlesToShow] = useState<Article[][]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        "https://www.blackbullion.com/api/_dev/pathways"
      );
      const newArticles = await response.json();
      setArticles(newArticles);
      setArticlesToShow(paginate(newArticles));
    } catch (e) {
      if (typeof e === "string") {
        setErrorMessage(e);
      } else if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  };

  const filterAndSortArticles = (term: string, sortValue: SortValue) => {
    const sortedAndFilteredArticles = sortArticles(sortValue).filter(
      (article) =>
        article.title.toLowerCase().includes(term) ||
        article.intro.toLowerCase().includes(term)
    );
    setArticlesToShow(paginate(sortedAndFilteredArticles));
  };

  const sortArticles = (sortValue: SortValue) => {
    const sortedArticles = [...articles];
    switch (sortValue) {
      case "ascending":
        return sortedArticles.sort(
          (a, b) =>
            numberFromDuration(a.duration) - numberFromDuration(b.duration)
        );
      case "descending":
        return sortedArticles.sort(
          (a, b) =>
            numberFromDuration(b.duration) - numberFromDuration(a.duration)
        );
      default:
        return sortedArticles;
    }
  };

  if (errorMessage.length > 0)
    return <p data-testid="article-list__error">{errorMessage}</p>;

  if (articles.length === 0)
    return (
      <div
        className="article-list__loader"
        data-testid="article-list-loader"
      ></div>
    );

  return (
    <section className="article-list">
      <ListControls
        onSubmit={({ searchTerm, sortValue }) =>
          filterAndSortArticles(searchTerm, sortValue)
        }
      />

      {articlesToShow[currentPage].map((article) => (
        <ArticleCard {...article} key={article.id} />
      ))}

      <ListPager
        pageCount={articlesToShow.length}
        currentPage={currentPage}
        onChange={(page) => setCurrentPage(page)}
      ></ListPager>
    </section>
  );
}
