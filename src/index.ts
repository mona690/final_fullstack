// Import from package
import express, { Express } from "express";
import { connect as dbConnect, ConnectOptions } from "mongoose";
import { config } from "dotenv";

// Import from other files
import authRouter from "./routes/auth.routes";
import adminRouter from "./routes/admin.routes";
import productRouter from "./routes/products.routes";
import userRouter from "./routes/user.routes";

// Init
config();
const PORT: number = Number(process.env.PORT) || 3000;
const app: Express = express();
const CONNECTION_URL= "mongodb+srv://monakhaled071:dklPY9oQKgYoufWb@cluster0.bbp1s8z.mongodb.net/final_fullstack?retryWrites=true&w=majority";

// Middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

app.get("/hello", (_, res) => {
  res.status(200).send("Hello World");
});

// Mongoose Connection
const connectToDatabase = async () => {
  try {
    const mongooseOptions: ConnectOptions = {
      useNewUrlParser: true, // If needed, check Mongoose version
      useUnifiedTopology: true,
    } as any; // Cast to any to bypass TypeScript checks

    await dbConnect(CONNECTION_URL, mongooseOptions);
    console.log("Connected to Mongoose");
  } catch (error) {
    console.error("Error connecting to Mongoose:", error);
  }
};

// Start the server after connecting to the database
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`);
  });
};

// Connect to the database and start the server
connectToDatabase().then(startServer);
