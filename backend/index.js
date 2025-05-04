const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models");


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 5000;

db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
