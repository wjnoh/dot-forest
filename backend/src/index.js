const express = require("express");
const app = express();

app.get("/api/board", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/board/:id", (req, res) => {
  res.send(req.params.id);
});
  
app.listen(4000, () => console.log("Listening on port 3000!"));