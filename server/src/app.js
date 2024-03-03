const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(morgan("combine"));
app.use(bodyParser.json());
app.use(cors());

var listener = app.listen(process.env.PORT || 8081, function () {
  console.log("Listening on port " + listener.address().port);
});

app.get("/status", (req, res) => {
  res.send({
    message: "hellko",
  });
});
