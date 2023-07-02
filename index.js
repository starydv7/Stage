// server.js

const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

app.post("/api/outlet", (req, res) => {
  const customerLocation = req.body.location;
  const outletIdentifier = getOutletIdentifier(customerLocation);

  res.json({ outletIdentifier });
});

function getOutletIdentifier(customerLocation) {
 
  if (customerLocation.latitude >= 40.0 && customerLocation.latitude <= 41.0) {
    return "Outlet 1";
  } else if (
    customerLocation.latitude >= 42.0 &&
    customerLocation.latitude <= 43.0
  ) {
    return "Outlet 2";
  }

  return "Unknown";
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
