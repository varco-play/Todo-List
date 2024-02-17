import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    timeFrom: "",
    timeUntil: "",
    date: "",
    task: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5555/allTasks");
        const data = response.data;
        setTasks(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5555/createTask",
        formData
      );
      console.log(response.data); // Log the response data if needed
      // Handle successful response here
    } catch (error) {
      if (error.response.status === 400 && error.response.data === "Repeated") {
        alert("Task is repeated. Please enter a unique task.");
      } else {
        console.error(error);
        // Handle other errors if needed
      }
    }
  };
  const doneTask = async (id) => {
    const changeStatus = await axios.put(
      `http://localhost:5555/updateStatus/${id}`
    );
    window.location.reload();
    console.log(changeStatus.data);
  };
  const deleteTask = async (id) => {
    const deleteTask = await axios.delete(
      `http://localhost:5555/deleteTask/${id}`
    );
    window.location.reload();
    console.log(deleteTask.data);
  };

  const collection = {
    OddDays: () => {
      return (
        <div>
          {tasks
            .filter((task) => task.date === "odd-days")
            .map((task) => {
              return (
                <div
                  key={task._id}
                  className={task.status === "done" ? "taskDone" : "task"}
                >
                  Task: {task.task} <br />
                  Time: {task.timeFrom} - {task.timeUntil} <br />
                  Status: {task.status}
                  {task.status === "done" ? (
                    <button onClick={() => deleteTask(task._id)}>
                      Delete task
                    </button>
                  ) : (
                    <button onClick={() => doneTask(task._id)}>
                      Finish it
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      );
    },
    EvenDays: () => {
      return (
        <div>
          {tasks
            .filter((task) => task.date === "even-days")
            .map((task) => {
              return (
                <div
                  key={task._id}
                  className={task.status === "done" ? "taskDone" : "task"}
                >
                  Task: {task.task} <br />
                  Time: {task.timeFrom} - {task.timeUntil} <br />
                  Status: {task.status}
                  {task.status === "done" ? (
                    <button onClick={() => deleteTask(task._id)}>
                      Delete task
                    </button>
                  ) : (
                    <button onClick={() => doneTask(task._id)}>
                      Finish it
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      );
    },
    Sunday: () => {
      return (
        <div>
          {tasks
            .filter((task) => task.date === "sunday")
            .map((task) => {
              return (
                <div
                  key={task._id}
                  className={task.status === "done" ? "taskDone" : "task"}
                >
                  Task: {task.task} <br />
                  Time: {task.timeFrom} - {task.timeUntil} <br />
                  Status :{task.status}
                  {task.status === "done" ? (
                    <button onClick={() => deleteTask(task._id)}>
                      Delete task
                    </button>
                  ) : (
                    <button onClick={() => doneTask(task._id)}>
                      Finish it
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      );
    },
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>CREATE A TASK</h2>
        <label>
          From:
          <input
            type="time"
            name="timeFrom"
            value={formData.timeFrom}
            onChange={handleChange}
          />
        </label>

        <label>
          Until:
          <input
            type="time"
            name="timeUntil"
            value={formData.timeUntil}
            onChange={handleChange}
          />
        </label>

        <label>
          Date:
          <select
            name="date"
            value={formData.selectedData}
            onChange={handleChange}
          >
            <option value="even-days">Even Days</option>
            <option value="odd-days">Odd Days</option>
            <option value="sunday">Sunday</option>
          </select>
        </label>

        <label>
          Task:
          <input
            type="text"
            name="task"
            className="taskInput"
            value={formData.task}
            onChange={handleChange}
          />
        </label>

        <button type="submit" onClick={() => window.location.reload()}>
          Submit
        </button>
      </form>
      <div className="section">
        <div className="container">
          <div className="oddDays">
            <h1>Odd Days Tasks:</h1>
            <div className="tasks">
              <collection.OddDays />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="evenDays">
            <h1>Even Days Tasks:</h1>
            <div className="tasks">
              <collection.EvenDays />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="Sun">
            <h1>Sunday's Tasks:</h1>
            <div className="tasks">
              <collection.Sunday />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
