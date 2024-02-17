import Todo from "./module.js";
// import { isRepeated } from "./errorHandler.js";

const allTasks = async (req, res) => {
  try {
    const tasks = await Todo.find();
    if (!tasks) res.status(404).json({ message: "No Tasks Found" });
    res.status(201).json(tasks);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const createTask = async (req, res) => {
  try {
    const { task, status, timeFrom, timeUntil, date } = req.body;

    const tasks = await Todo.create({
      task,
      status,
      timeFrom,
      timeUntil,
      date,
    });

    if (!tasks) return res.status(400).json("Error while posting task");

    res.status(201).json({
      task: tasks.task,
      status: tasks.status,
      timeUntil: tasks.timeUntil,
      timeFrom: tasks.timeFrom,
      date: tasks.date,
      id: tasks._id,
    });
  } catch (error) {
    res.status(500).json("Server error");
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await Todo.findByIdAndDelete(id);

    if (!deleteTask) res.status(400).json("Error while deleting the task");

    res.status(200).json("Task was deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const changeStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTask = await Todo.findByIdAndUpdate(
      id,
      { status: "done" },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(400).json("Error while updating task status");
    }

    return res.status(200).json("Status was changed");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};

export { allTasks, createTask, deleteTask, changeStatus };
