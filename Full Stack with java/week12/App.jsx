import ProductList from "./ProductList";
import ContactForm from "./ContactForm";

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Product Catalog</h1>
      
      {/* Products using reusable Card component */}
      <ProductList />

      <hr style={{ margin: "40px 0" }} />

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
}

export default App;
