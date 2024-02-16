import "./ArticleCard.css";
import Article from "../../types/Article";
import Book from "../../assets/book.svg";

import { capitaliseFirstLetter } from "../../utils/text";

export default function ArticleCard({
  id,
  duration,
  image,
  url,
  type,
  intro,
  title,
}: Article) {
  const capitalisedType = capitaliseFirstLetter(type);

  return (
    <article className="article-card" data-testid={`article-card-${id}`}>
      <img
        className="article-card__image"
        src={image}
        data-testid={`article-card-${id}-image`}
      />

      <span className="article-card__subtitle">
        <img className="article-card__book-icon" src={Book} />
        {capitalisedType} {duration}
      </span>

      <h1 className="article-card__title">{title}</h1>
      <p className="article-card__intro">{intro}</p>
      <a
        href={url}
        className="article-card__link"
        data-testid={`article-card-${id}-link`}
      >
        View {capitalisedType} →
      </a>
    </article>
  );
}
