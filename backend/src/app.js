const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.routes");
const vesselRoutes = require("./routes/vessel.routes");
const issueRoutes = require("./routes/issue.routes");
const recRoutes = require("./routes/recommend.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/vessels", vesselRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/recommend", recRoutes);

app.use(errorMiddleware);

module.exports = app;
