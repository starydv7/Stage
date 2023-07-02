// src/App.js

import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [address, setAddress] = useState("");
  const [outletIdentifier, setOutletIdentifier] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/outlet", { location: address });
      setOutletIdentifier(response.data.outletIdentifier);
    } catch (error) {
      console.error("Error fetching outlet identifier:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {outletIdentifier && <div>Outlet Identifier: {outletIdentifier}</div>}
    </div>
  );
};

export default Home;
