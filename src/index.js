import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import { logger } from "./middlewares/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use("/assets", express.static(path.join(process.cwd(), "src/assets")));

app.use("/api/users", userRoutes);

app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to My Express Backend 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
