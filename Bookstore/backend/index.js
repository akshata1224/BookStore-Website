import express from 'express'
import {PORT, mongoURL} from './config.js';
import mongoose from "mongoose";
import booksRoute from './routes/bookRoutes.js';
import cors from 'cors';
import bodyParser from "body-parser";

// let bodyParser = require('body-parser');

const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req, res)=>{
    console.log('hello world');
    res.send("Hello world mern stack");
})

app.use('/books/', booksRoute)

mongoose
.connect(mongoURL)
.then(() =>{
    app.listen(PORT, ()=>{
        console.log(`Server is fiuf, on port ${PORT}`);  // eslint-disable-line no-console
    })
    console.log("app connected success")
})
.catch((err)=>{
    console.log(err)
})