const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models");
const authRoutes = require("./routes/auth.routes");


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;

db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
