import HelloWorld from "./HelloWorld";

function getGreeting(name) {
  return `Welcome, ${name}!`;
}

function App() {
  const studentName = "Priyam";
  const hour = new Date().getHours();

  const timeGreeting =
    hour < 12 ? "Good Morning!" :
    hour < 18 ? "Good Afternoon!" :
    "Good Evening!";

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      
      <HelloWorld />

      <h2>{getGreeting(studentName)}</h2>

      <p>Current time-based greeting: {timeGreeting}</p>

      <p>Here is a JSX expression result: <strong>{5 + 10}</strong></p>

    </div>
  );
}

export default App;
