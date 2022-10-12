import express from "express";
import fileFilter from "./fileFilter.js";

const app = express(); 

const PUBLIC_DIR = "public"; 
app.use(express.static(PUBLIC_DIR));

app.post("/create", fileFilter, (req, res) => { 
  if (!req.body?.name || !req.files[0]?.path) {
    let error = {
      status: "error",
      message: "Не хватает данных",
    };
    res.statusCode = 400;
    res.send(error);
    return;
  }

  let model = {
    name: req.body.name, 
    description: req.body.description,
    image: req.files[0].path
  };

  let answer = {
    status: "ok",
    data: model,
  };
  res.statusCode = 200;
  res.send(answer);
});

const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Server started at port http://localhost:3000/`));