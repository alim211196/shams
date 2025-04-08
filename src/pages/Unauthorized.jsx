import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>403 - Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default Unauthorized;
