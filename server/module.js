import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
  },
  timeFrom: {
    type: String,
  },
  timeUntil: {
    type: String,
  },
  status: {
    type: String,
    enum: ["waiting", "done"],
    default: "waiting",
  },
  date: {
    type: String,
    enum: ["odd-days", "even-days", "sunday"],
  },
});

const Todo = mongoose.model("Tasks", todoSchema);
export default Todo;
