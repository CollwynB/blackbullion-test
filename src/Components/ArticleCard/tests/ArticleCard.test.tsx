import { RenderResult, render } from "@testing-library/react";
import ArticleCard from "../ArticleCard";
import { createArticle } from "../../../utils/factories";

const testData = createArticle();

describe("Article card", () => {
  let card: RenderResult;
  beforeEach(() => {
    card = render(<ArticleCard {...testData} />);
  });

  it("renders the article image", () => {
    const image = card.getByTestId("article-card-0-image") as HTMLImageElement;
    expect(image.src).toBe(testData.image);
  });

  it("has the correct link url", () => {
    const link = card.getByTestId("article-card-0-link") as HTMLAnchorElement;
    expect(link.href).toBe(testData.url);
  });
});
