import React, { useEffect, useState } from "react";

const Entries = () => {
  const [entry, setEntry] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => setEntry(data.entries));
  }, []);
  return (
    <div>
      {entry.map((item, index) => (
        <h5 key={index}>
          {item.API},{item.Description},{item.Link},{item.Category}
        </h5>
      ))}
    </div>
  );
};

export default Entries;
