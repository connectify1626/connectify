import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import corsOptions from "./src/config/corsOptions.js";
import credentials from "./src/config/corsCredentials.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

//#region CONFIGURATIONS
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello World!');
})
//#endregion

//#region Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
//#endregion

//#region MONGOOSE SETUP
mongoose.connect(process.env.MONGO_LOCAL_URL ?? "mongodb://0.0.0.0:27017/Connectify", {
  dbName: process.env.DATABASE_NAME
}).then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
//#endregion