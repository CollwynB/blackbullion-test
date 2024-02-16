type Article = {
  id: number;
  title: string;
  internal_title: string;
  url: string;
  intro: string;
  duration: string;
  image: string;
  type: "pathway";
  has_summative_assessment: boolean;
};

export default Article;
