const express = require("express");
const cors = require("cors");
require("dotenv").config();
const medicinesRoutes = require("./routes/medicines");
const salesRoutes = require("./routes/salesRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/medicines", medicinesRoutes);
app.use("/api/sales", salesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

