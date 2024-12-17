import express from "express";
import morgan from "morgan";
import 'dotenv/config'
import mongoose from "mongoose";
import taskRoutes from './routers/tasks.js'

const app = express();
const PORT = 4000;

app.use(morgan("tiny"));
app.use(express.json());

 

  mongoose.connect(process.env.MONGODBURI)
  .then(() => console.log("MongoDB Connected")
   ) .catch(("err", console.log("error")
   )) 

  
app.get('/', (req, res) => {
    res.send("Hello world")
} )

app.use('/task', taskRoutes)


app.listen(PORT, ()=> {
    console.log("Server us running" + PORT);
    
})