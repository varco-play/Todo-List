import express from "express";
import cors from "cors";
import dbConnect from "./db.js";
import bodyParser from "body-parser";
 import {
  allTasks,
  changeStatus,
  createTask,
  deleteTask,
} from "./controller.js";

const app = express();
const PORT = 5555;

dbConnect();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
 

app.get("/allTasks", allTasks);
app.post("/createTask", createTask);
app.delete("/deleteTask/:id", deleteTask);
app.put("/updateStatus/:id", changeStatus);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
