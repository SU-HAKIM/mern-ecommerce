//?external modules
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

//?internal modules
import clientRouter from "./routes/clientRoute";
import adminRouter from "./routes/adminRoute";
import productRouter from "./routes/productRoute";

dotenv.config();

//?app
const app = express();

//?constance
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//?routes
app.get("/", (req: Request, res: Response) => {
  res.send("hakim");
});
app.use("/client", clientRouter);
app.use("/admin", adminRouter);
app.use("/products", productRouter);

mongoose
  .connect("mongodb://localhost:27017/mern-ecommerce")
  .then(() => {
    app.listen(PORT, () => {
      console.log("listening to port http://localhost:" + PORT);
    });
  })
  .catch((error) => console.log(error));
