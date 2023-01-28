import { NextSeo } from "next-seo";

const ArticlePage = ({ article }) => {
  return (
    <>
      <NextSeo title={article.title} description={article.description} />
      {/* Add JSON-LD */}
      <div>ArticlePage of {article.slug}</div>
    </>
  );
};

export const getServerSideProps = async ({ res, query }) => {
  const slug = query.slug;

  return {
    props: {
      article: {
        title: "Sami's Article",
        description: "Description of sami article",
        slug: slug,
      },
    },
  };
};

export default ArticlePage;
