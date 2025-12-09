import { Link } from "react-router-dom";

const samplePosts = [
  { id: 1, title: "Getting started with React", excerpt: "A quick intro to React components and JSX." },
  { id: 2, title: "Routing in React", excerpt: "How to use React Router v6 for multi-page apps." },
  { id: 3, title: "State & Props", excerpt: "Understanding state, props and component communication." },
];

export default function Blog() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>Blog</h1>
      <p>Below are some sample posts. Click a title to open (example uses links; you can later add dynamic routes).</p>

      <ul style={{ padding: 0, listStyle: "none" }}>
        {samplePosts.map((post) => (
          <li key={post.id} style={{ marginBottom: 16, padding: 12, background: "#fff", borderRadius: 8, border: "1px solid #eee" }}>
            <h3 style={{ margin: 0 }}>
              {/* simple link to /blog — you can extend to /blog/:id later */}
              <Link to="/blog" style={{ textDecoration: "none", color: "#0b79ff" }}>
                {post.title}
              </Link>
            </h3>
            <p style={{ marginTop: 6 }}>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
