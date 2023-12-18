import express from "express";

const app = express();

const PORT = 3000;

app.listen(PORT, ()=> {
  console.log(`I am up and running on: ${PORT}`);
})

app.use("/", (req, res) => {
  res.send('Hello world')
  console.log("Heloooo i am alive");
});
