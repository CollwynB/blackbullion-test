import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ArticleList from "../ArticleList";
import { act } from "react-dom/test-utils";
import { createArticle } from "../../../utils/factories";

const testData = [...new Array(20)].map((_, i) =>
  createArticle({ id: i, title: `Title ${i}`, duration: `${i} min` })
);

describe("The Article List", () => {
  describe("with successful API call", () => {
    let fetchMock: jest.SpyInstance;
    beforeEach(() => {
      fetchMock = jest.spyOn(global, "fetch").mockResolvedValue({
        json: () => testData,
      } as unknown as Response);
    });

    it("should show loader when waiting for API response", async () => {
      const list = render(<ArticleList />);
      expect(list.getByTestId("article-list-loader")).toBeInTheDocument();

      // This is to stop complaints about updates happening outside of act
      await act(
        async () => await waitFor(() => expect(fetchMock).toHaveBeenCalled())
      );
    });

    it("should render cards supplied by API response", async () => {
      const list = render(<ArticleList />);
      await act(async () => {
        await waitFor(() => expect(fetchMock).toHaveBeenCalled());
      });
      testData.slice(0, 9).forEach(({ id }) => {
        expect(list.getByTestId(`article-card-${id}`)).toBeInTheDocument();
      });
    });

    it("should change displayed cards on page change", async () => {
      const list = render(<ArticleList />);
      await act(async () => {
        await waitFor(() => expect(fetchMock).toHaveBeenCalled());
      });
      await act(async () => {
        const buttonToClick = list.getByTestId("page-button-1");
        fireEvent.click(buttonToClick);
      });
      expect(list.queryByTestId("article-card-0")).toBeNull();
      expect(list.getByTestId("article-card-10")).toBeInTheDocument();
    });

    it("should only render cards that match the search term", async () => {
      const list = render(<ArticleList />);
      await act(async () => {
        await waitFor(() => expect(fetchMock).toHaveBeenCalled());
      });
      await act(async () => {
        const input = list.getByTestId("list-controls-search");
        fireEvent.change(input, { target: { value: "title 4" } });
        fireEvent.submit(input);
      });
      expect(list.queryByTestId("article-card-0")).toBeNull();
      expect(list.getByTestId("article-card-4")).toBeInTheDocument();
    });

    it("should sort articles according to sortValue selected", async () => {
      const list = render(<ArticleList />);
      await act(async () => {
        await waitFor(() => expect(fetchMock).toHaveBeenCalled());
      });
      const select = list.getByTestId("list-controls-sort-select");

      expect(list.queryByText("19 min")).toBeNull();
      await act(async () =>
        fireEvent.change(select, { target: { value: "descending" } })
      );
      expect(screen.getByText("Pathway 19 min")).toBeInTheDocument();

      await act(async () =>
        fireEvent.change(select, { target: { value: "ascending" } })
      );
      expect(screen.queryByText("Pathway 19 min")).toBeNull();
      expect(screen.queryByText("Pathway 1 min")).toBeInTheDocument();
    });
  });

  describe("with failed API call", () => {
    let fetchMock: jest.SpyInstance;
    beforeEach(() => {
      fetchMock = jest
        .spyOn(global, "fetch")
        .mockRejectedValue("error message");
    });

    it("should show an error message when API request fails", async () => {
      const list = render(<ArticleList />);
      await act(async () => {
        await waitFor(() => expect(fetchMock).toHaveBeenCalled());
      });
      expect(list.getByTestId("article-list__error")).toBeInTheDocument();
    });
  });
});
