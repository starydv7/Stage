const express = require("express");
const app = express();
const fs = require("fs");
const xml2js = require("xml2js");
const parser = new xml2js.Parser();

app.use(express.json());

fs.readFile("Outlets.kml", "utf-8", (err, kmlData) => {
  if (err) {
    console.error(err);
  } else {
    parser.parseString(kmlData, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        const outlets = result;
        startServer(outlets);
        console.log(outlets);
      }
    });
  }
});

function startServer(outlets) {
  app.post("/getLocation", (req, res) => {
    const { location, state, countryCode, area } = req.body;
    const outlet = findOutlet(location, state, countryCode, area, outlets);

    if (outlet) {
      res.status(200).json({ outlet_identifier: outlet.name[0] });
      console.log("Pawan",outlet);
    } else {
      res.status(404).json({ error: "Outlet not found in this region" });
    }
  });

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

function findOutlet(location, state, countryCode, area, outlets) {
  for (let i = 0; i < outlets.length; i++) {
    const outlet = outlets[i];
    const outletLocation = outlet.name[0];
    const outletState = outlet.state[0];
    const outletCountryCode = outlet.countryCode[0];
    const outletArea = outlet.area[0];

    if (
      outletLocation === location &&
      outletState === state &&
      outletCountryCode === countryCode &&
      outletArea === area
    ) {
      return outlet;
    }
  }
  return null;
}
