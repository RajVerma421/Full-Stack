import { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({ name, email, message });

    // optional: clear inputs
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Contact Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", margin: "8px 0", padding: "10px" }}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", margin: "8px 0", padding: "10px" }}
        />

        <textarea
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", margin: "8px 0", padding: "10px", height: "100px" }}
        ></textarea>

        <button type="submit"
          style={{
            padding: "10px 15px",
            marginTop: "10px",
            background: "blue",
            color: "white",
            border: "none",
            width: "100%",
            cursor: "pointer"
          }}
        >
          Submit
        </button>
      </form>

      {submittedData && (
        <div style={{ marginTop: "20px", background: "#f5f5f5", padding: "15px" }}>
          <h3>Submitted Data:</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Message:</strong> {submittedData.message}</p>
        </div>
      )}
    </div>
  );
}

export default ContactForm;
