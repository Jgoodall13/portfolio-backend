import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // to parse JSON bodies

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
  secure: false,
  port: 587,
  host: "live.smtp.mailtrap.io",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", (req: Request, res: Response) => {
  const { to, subject, text } = req.body;

  console.log(to, subject, text);
  //   const mailOptions = {
  //     from: process.env.EMAIL_USER,
  //     to,
  //     subject,
  //     text,
  //   };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.log(error);
  //       res.status(500).send("Failed to send email");
  //     } else {
  //       console.log("Email sent: " + info.response);
  //       res.status(200).send("Email sent successfully");
  //     }
  //   });
  let returnData = [
    {
      from: "Jacob Goodall",
      status: 200,
    },
  ];
  res.status(200).send(returnData);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
