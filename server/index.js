import express from "express";
import cors from "cors";

// routes
import UserRoutes from "./routes/UserRoutes.js";

const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use(UserRoutes);

// run the fuckin' server
app.listen(port, () => {
  console.log(`This fuckin' server running on port ${port}`);
});
