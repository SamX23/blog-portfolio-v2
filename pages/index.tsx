import type { NextPage } from "next";
import Head from "next/head";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";

const Home: NextPage = ({ posts }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sami Kalammallah Personal Blog</title>
        <meta
          name="description"
          content="A blog about a frontend master wannabe"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a href="https://kalammallah.vercel.app/">Sami's WIP Blog!</a>
        </h1>

        <p className={styles.description}>
          Currently this page is still work in progress, kindly visit my{" "}
          <code className={styles.code}>github</code> to see the progress
        </p>

        <div className={styles.grid}>
          {posts.items.map((post: any) => (
            <a key={post.id} href={post.slug} className={styles.card}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/SamX23"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ngoding by Sami
        </a>
      </footer>
    </div>
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
