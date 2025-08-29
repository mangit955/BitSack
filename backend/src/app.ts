import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import contentRoutes from "./routes/contentRoutes";
import cookieParser from "cookie-parser";

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || "").split(",");


app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Bitsack Backend is running ");
});

//routes declaration

app.use("/api/v1", userRoutes);
app.use("/api/v1", contentRoutes);

export default app;
