import express from "express";
import connectDB from "./utils/connectDb.js"

import quizRoutes from './routes/quizRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from "./middleware/errorHandler.js";

connectDB();

const app = express();
app.use(express.json());

app.use('/quiz', quizRoutes);
app.use('/user', userRoutes);

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log("I am up and running");
});
