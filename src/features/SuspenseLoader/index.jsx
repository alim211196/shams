import React from "react";
import "./Loader.css";

const SuspenseLoader = () => {
  return (
    <div
      style={{
        textAlign: "center",
        color: "red",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span className="loader"></span>
    </div>
  );
};

export default SuspenseLoader;
