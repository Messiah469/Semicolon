export default function Home() {
  return (
    <main
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "60px" }}>
        AI Bank Statement Analyzer
      </h1>

      <p style={{ color: "gray", fontSize: "20px" }}>
        Hackathon Project
      </p>

      <button
        style={{
          marginTop: "20px",
          padding: "15px 30px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Upload Statement
      </button>
    </main>
  );
}