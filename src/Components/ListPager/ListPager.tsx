import "./ListPager.css";

type ListPagerProps = {
  pageCount: number;
  currentPage: number;
  onChange: (page: number) => any;
};

export default function ListPager({
  pageCount,
  currentPage,
  onChange,
}: ListPagerProps) {
  return (
    <nav className="list-pager">
      {[...new Array(pageCount)].map((_, i) => (
        <button
          className={`list-pager__button ${
            currentPage === i ? "list-pager__button--active" : ""
          }`}
          onClick={() => onChange(i)}
          key={`page-button-${i}`}
          data-testid={`page-button-${i}`}
        >
          {i + 1}
        </button>
      ))}
    </nav>
  );
}
