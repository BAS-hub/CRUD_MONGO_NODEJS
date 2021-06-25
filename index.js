import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import morgan from 'morgan'
import path from 'path'
import { initailRoute } from "./routes/controller"

import mongoose from "mongoose"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0"

app.use(express.static(path.join(__dirname, 'views')))
app.set('view engine', 'pug')

app.use(morgan('tiny'))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initailRoute(app)

mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }, err => {
      console.log('MongoDB connected')
  });
  

app.get('/', (req, res) => {
  res.render('index', {
    title: 'This is message sent from app.js'
  })
})

app.listen(PORT, HOST,() => {
  console.log("server runing on " + HOST + " on port " + PORT);
});