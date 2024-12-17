import express from "express";
const router = express.Router();

import Task from '../models/Task.js';
import sendResponse from "../helpers/sendResponse.js";

////////////////// post api ///////////
router.post("/", async(req, res) => {
    const {task} = req.body;
    let newTask = new Task({task});
    newTask = await newTask.save();
    sendResponse(res, 201, newTask, false, "Task Added Successfully") 
});
////////////////// post api ///////////


////////////////// get api ///////////
router.get("/", async(req, res) => {
    let tasks = await  Task.find();
    sendResponse(res, 201, tasks, false, "Task Fetched Successfully") 
});
////////////////// get api ///////////


////////////////// get id parms api ///////////
router.get("/:id", async(req, res) => {
    const  task = await  Task.findById(req.params.id);
   if(!task) return  sendResponse(res, 404, null, true, "Task Not Found"); 
   sendResponse(res, 200, task, false, "Task Fetched Successfully") 
});
////////////////// get id parms api ///////////



////////////////// put api ///////////
router.put("/:id", async(req, res) => {
    const { task, completed } = req.body;
    const  taskFromDB = await  Task.findById(req.params.id);
   if(!taskFromDB) return  sendResponse(res, 404, null, true, "Task Not Found"); 
   if(task) taskFromDB.task = task;
   if(completed) taskFromDB.completed = completed;
   await taskFromDB.save();
   sendResponse(res, 200, taskFromDB, false, "Task Updated Successfully") 
});
////////////////// put api ///////////

////////////////// delete api ///////////

router.delete("/:id", async(req, res) => {
    const  taskFromDB = await  Task.findById(req.params.id);
   if(!taskFromDB) return  sendResponse(res, 404, null, true, "Task Not Found"); 
   
   await Task.deleteOne({ _id: req.params.id });
   sendResponse(res, 200, null, false, "Task Deleted Successfully");
});

////////////////// delete api ///////////

export default router;