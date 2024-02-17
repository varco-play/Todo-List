import Todo from "./module.js";

const isRepeated = async (task, status, time, day) => {
  let same = 0;

  const tasks = await Todo.find();
  console.log(tasks)
  for (let i = 0; i <= tasks.length; i++) {
    
    if (
      tasks[i].task === task &&
      tasks[i].time === time &&
      tasks[i].status === status &&
      tasks[i].day === day
    ) {
      same++;
      break;
    }
  }
  return same > 0 ? true : false;
};

export { isRepeated };
