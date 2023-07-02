const express = require("express");
const app = express();
const fs = require("fs");
const xml2js = require("xml2js");
const parser = new xml2js.Parser();

app.use(express.json());

const kmlData = fs.readFileSync("outlets.kml", "utf-8");
let outlets;

parser.parseString(kmlData, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    outlets = result.kml.Document[0].Placemark;
  }const express = require("express");
  const app = express();
  const fs = require("fs");
  const xml2js = require("xml2js");
  const parser = new xml2js.Parser();

  app.use(express.json());

  fs.readFile("outlets.kml", "utf-8", (err, kmlData) => {
    if (err) {
      console.error(err);
    } else {
      parser.parseString(kmlData, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          const outlets = result.kml.Document[0].Placemark;
          startServer(outlets);
        }
      });
    }
  });

  function startServer(outlets) {
    app.post("/getLocation", (req, res) => {
      const { location } = req.body;

      const outlet = findOutlet(location, outlets);

      if (outlet) {
        res.json({ outlet_identifier: outlet.name[0] });
      } else {
        res.status(404).json({ error: "Outlet not found" });
      }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }

  function findOutlet(location, outlets) {
    for (let i = 0; i < outlets.length; i++) {
      const outlet = outlets[i];
      if (outlet.name[0] === location) {
        return outlet;
      }
    }
    return null;
  }

});

app.post("/getLocation", (req, res) => {
  const { location } = req.body;

 
  const outlet = findOutlet(location);

  if (outlet) {
    res.json({ outlet_identifier: outlet.name[0] });
  } else {
    res.status(404).json({ error: "Outlet not found" });
  }
});
function findOutlet(location) {
 
  for (let i = 0; i < outlets.length; i++) {
    const outlet = outlets[i];
    if (outlet.name[0] === location) {
      return outlet;
    }
  }
  return null;
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
