const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: `http://localhost:5173`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const infoRoutes = require("./routes/infoRoutes");
const cmlRoutes = require("./routes/cmlRoutes");
const testPointRoutes = require("./routes/testPointRoutes");
const thicknessRoutes = require("./routes/thicknessRoutes");

app.use("/api/info", infoRoutes);
app.use("/api/cml", cmlRoutes);
app.use("/api/test-point", testPointRoutes);
app.use("/api/thickness", thicknessRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
