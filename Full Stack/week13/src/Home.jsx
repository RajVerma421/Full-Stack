export default function Home() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>Welcome to MiniBlog</h1>
      <p>
        This is the Home page. Use the navigation links to switch between pages.
      </p>
      <p>
        Routing is handled by <strong>react-router-dom (v6)</strong>. The app has three pages:
        Home, About and Blog.
      </p>
    </div>
  );
}
