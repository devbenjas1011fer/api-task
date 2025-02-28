const fs = require("fs");
const path = require("path");
const Task = require("./task");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(process.cwd(), "memory.json");
console.log(filePath);
// Leer archivo JSON
const readTasks = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data).task;
  } catch (error) {
    console.error("Error leyendo el archivo:", error);
    return [];
  }
};

// Escribir archivo JSON
const writeTasks = (tasks) => {
  try {
    fs.writeFileSync(
      filePath,
      JSON.stringify({ task: tasks }, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Error escribiendo el archivo:", error);
  }
};

// Agregar nueva tarea
const addTask = async (titulo, descripcion) => {
  try {
    if (titulo === undefined) throw "El titulo es requerido";
    if (descripcion === undefined) throw "La descripcion es requerida";
    const tasks = readTasks();
    const newTask = new Task(uuidv4(), titulo, descripcion, false);
    tasks.push(newTask);
    await writeTasks(tasks);
    return newTask;
  } catch (err) {
    throw "Error";
  }
};

// Obtener todas las tareas
const getAllTasks = async () => readTasks();

// Actualizar tarea por ID
const updateTask = async (id, newData) => {
  try {
    let tasks = readTasks();
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, ...newData } : task
    );
    await writeTasks(tasks);
    return id ;
  } catch (err) {
    throw "Error";
  }
};

// Eliminar tarea por ID
const deleteTask = async (id) => {
  try {
    let tasks = readTasks();
    const filteredTasks = tasks.filter((task) => task.id !== id);
    await writeTasks(filteredTasks);
    return filteredTasks;
  } catch (err) {
    throw "Error";
  }
};

module.exports = {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
