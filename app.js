const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

// routes
app.get("/customers", (req, res) => {
  res.send({res: "customer details"});
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});