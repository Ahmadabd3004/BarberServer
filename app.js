const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("uploads"));

const user = require("./routes/user");
const store = require("./routes/store");

app.use(user);
app.use(store);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
