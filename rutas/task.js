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

ruta.put("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    await memoryTask.updateTask(id, {titulo:title, descripcion:description});
    res.status(200).json(id);
  } catch (err) {
    next();
  }
});

ruta.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    await memoryTask.deleteTask(id);
    res.status(200).json();
  } catch (err) {
    next();
  }
});
module.exports = ruta;
