
import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/database"


dotenv.config({ path: ".env"});

const PORT = process.env.PORT || 3000;
connectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
})
.catch((error) => {
  console.log("MongoDB connection failed!\n", error);
  process.exit(1);
});







