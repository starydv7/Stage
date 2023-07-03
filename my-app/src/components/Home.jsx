import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [address, setAddress] = useState("");
  const [Outlet, setOutlet] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/getLocation", {
        location: address,
      });
      setOutlet(response.data.outlet_identifier);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Find Outlets</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {Outlet && <p>Outlet Location: {Outlet}</p>}
    </div>
  );
};

export default Home;
