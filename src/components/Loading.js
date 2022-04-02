import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Loading = () => {
  return (
    <div
      style={{
        textAlign: "center",
        height: "30%",
        width: "100%",
        marginTop: "100px",
        alignItem: "center",
        marginTop: "30vh",
      }}
    >
      <ClimbingBoxLoader color="#414756" size={20} />
    </div>
  );
};

export default Loading;
