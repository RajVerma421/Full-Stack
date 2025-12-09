import Card from "./card";

function ProductList() {
  const products = [
    {
      image: "https://picsum.photos/300?1",
      title: "Wireless Headphones",
      description: "High-quality sound with noise cancellation."
    },
    {
      image: "https://picsum.photos/300?2",
      title: "Smart Watch",
      description: "Track your fitness and notifications."
    },
    {
      image: "https://picsum.photos/300?3",
      title: "Bluetooth Speaker",
      description: "Portable speaker with deep bass."
    }
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
      {products.map((item, index) => (
        <Card
          key={index}
          image={item.image}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}

export default ProductList;
