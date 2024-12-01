import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import connectDB from "./config/database";
import Email from "./models/Email";
import { setupMiddlewares } from "./middlewares/setupMiddleWares";
import logger from "./utils/logger";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

// Middlewares
setupMiddlewares(app);

// Default route for API information
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Jacob's Portfolio Page!",
    advice: "Don't forget to drink water and get some rest!",
    routes: {
      email: "/sendemail",
    },
  });
});

app.post("/sendemail", (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  logger.info(`New email received from ${email}`);
  logger.debug(`Email name: ${name}`);
  logger.debug(`Email content: ${message}`);
  try {
    const newEmail = new Email({ name, email, message });
    newEmail.save();
    res.status(200).json({
      message: "Email sent successfully",
      from: req.body.name,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Default route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: "Route not found :-(" });
});

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
connectDB();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
