const express = require("express");
const ruta = express.Router();
const dataManager = require("../app"); //EmulationDB
const memoryTask = require("../models/task/method");
ruta.get("/", async function (_req, res) {
  try {
    const task = await memoryTask.getAllTasks();
    res.json(task);
  } catch (err) {
    next();
  }
});

ruta.post("/", async function (req, res, next) {
  try {
    const { title, description } = req.body;
    const task = await memoryTask.addTask(title, description);
    res.json(task);
  } catch (err) {
    next();
  }
});

ruta.put("/", async function (req, res, next) {
  try {
    const { id, task } = req.body;
    await memoryTask.updateTask(id, task);
    res.status(200).json();
  } catch (err) {
    next();
  }
});

ruta.delete("/", async function (req, res, next) {
  try {
    const { id } = req.body;
    await memoryTask.deleteTask(id);
    res.status(200).json();
  } catch (err) {
    next();
  }
});
module.exports = ruta;
