import type { NextPage } from "next";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect } from "react";
import { themeChange } from "theme-change";

const Home: NextPage = ({ posts }: any) => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <main>
        <h1 className="text-3xl font-bold underline">
          Welcome to{" "}
          <a href="https://kalammallah.vercel.app/">Sami&apos;s WIP Blog!</a>
        </h1>

        <p>
          Currently this page is still work in progress, kindly visit my{" "}
          <code>github</code> to see the progress
        </p>

        <div>
          {posts.items.map((post: any, idx: any) => (
            <a key={idx} href={`/blog/${post.slug}`}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </a>
          ))}
        </div>

        <div className="flex gap-2">
          <button data-set-theme="winter" className="btn btn-primary">
            Winter
          </button>
          <button data-set-theme="night" className="btn btn-secondary">
            Night
          </button>
        </div>
      </main>

      <footer>
        <a
          href="https://github.com/SamX23"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ngoding by Sami
        </a>
      </footer>
    </>
  );
};

export async function getStaticProps() {
  const ID = process.env.SPACEID;
  const TOKEN = process.env.TOKEN;
  const URL = `https://graphql.contentful.com/content/v1/spaces/${ID}/`;

  const client = new ApolloClient({
    uri: URL,
    headers: {
      authorization: `Bearer ${TOKEN}`,
    },
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetBlogPost {
        blogPostCollection {
          items {
            title
            slug
            description
            heroImage {
              title
              contentType
              fileName
              url
            }
            body
            publishDate
          }
        }
      }
    `,
  });

  return {
    props: {
      posts: data.blogPostCollection,
    },
  };
}

export default Home;
