const ArticlePage = () => {};

const BLOG_URL = "https://jsonplaceholder.typicode.com/posts";

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
         <!--Set url of existing pages-->
         <url>
           <loc>https://jsonplaceholder.typicode.com</loc>
         </url>
         ${posts
           .map(({ id }) => {
             return `
           <url>
               <loc>${`${BLOG_URL}/${id}`}</loc>
           </url>
         `;
           })
           .join("")}
       </urlset>
     `;
}

export const getServerSideProps = async ({ res }) => {
  // We make an API call to gather the URLs for our site
  const request = await fetch(BLOG_URL);
  const posts = await request.json();
  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default ArticlePage;
