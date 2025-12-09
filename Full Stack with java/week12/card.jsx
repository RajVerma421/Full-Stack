function Card({ image, title, description }) {
  return (
    <div style={{
      width: "250px",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      margin: "15px",
      textAlign: "center",
      background: "#fff"
    }}>
      <img src={image} alt={title} style={{ width: "100%", borderRadius: "8px" }} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Card;
