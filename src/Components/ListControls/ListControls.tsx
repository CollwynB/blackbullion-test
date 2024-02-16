import { FormEvent, useEffect, useState } from "react";
import { SortValue } from "../ArticleList/types/SortValue";

import "./ListControls.css";

type ListControlProps = {
  onSubmit: ({ searchTerm, sortValue }: ListControlFields) => void;
};

type ListControlFields = {
  searchTerm: string;
  sortValue: SortValue;
};

export default function ListControls({ onSubmit }: ListControlProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState<SortValue>("no sort");

  useEffect(() => {
    emitSearchEvent();
  }, [sortValue]);

  const emitSearchEvent = (e?: FormEvent) => {
    e?.preventDefault();
    onSubmit({ searchTerm, sortValue });
  };

  return (
    <>
      <form
        className="list-controls__form"
        onSubmit={(e) => emitSearchEvent(e)}
      >
        <input
          className="list-controls__search"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search titles and text..."
          data-testid="list-controls-search"
        />
        <button className="list-controls__search-button">Search</button>
        <select
          onChange={(e) => {
            setSortValue(e.target.value as SortValue);
          }}
          name="list-controls__sort"
          className="list-controls__select"
          data-testid="list-controls-sort-select"
        >
          <option value={"no sort"}>No sorting</option>
          <option value={"ascending"}>Ascending</option>
          <option value={"descending"}>Descending</option>
        </select>
      </form>
    </>
  );
}
