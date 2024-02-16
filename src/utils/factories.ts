import Article from "../types/Article";

// This is to make testing easier
function createArticle(article?: Partial<Article>): Article {
  return {
    id: 0,
    title: "Test title",
    internal_title: "Test internal title",
    url: "https://www.blackbullion.com/",
    intro: "This is a test introduction to an article card",
    duration: "10 min",
    image:
      "https://as2.ftcdn.net/v2/jpg/00/97/58/97/1000_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg",
    type: "pathway",
    has_summative_assessment: false,
    ...article,
  };
}

export { createArticle };
