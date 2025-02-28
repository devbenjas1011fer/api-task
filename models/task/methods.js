const fs = require('fs');
const path = require('path');
const Task = require('./task');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../config.json');

// Leer archivo JSON
const readTasks = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data).task;
    } catch (error) {
        console.error('Error leyendo el archivo:', error);
        return [];
    }
};

// Escribir archivo JSON
const writeTasks = (tasks) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify({ task: tasks }, null, 2), 'utf8');
    } catch (error) {
        console.error('Error escribiendo el archivo:', error);
    }
};

// Agregar nueva tarea
const addTask = (titulo, descripcion) => {
    const tasks = readTasks();
    const newTask = new Task(uuidv4(), titulo, descripcion, false);
    tasks.push(newTask);
    writeTasks(tasks);
    return newTask;
};

// Obtener todas las tareas
const getAllTasks = () => readTasks();

// Actualizar tarea por ID
const updateTask = (id, newData) => {
    let tasks = readTasks();
    tasks = tasks.map(task => task.id === id ? { ...task, ...newData } : task);
    writeTasks(tasks);
    return tasks.find(task => task.id === id);
};

// Eliminar tarea por ID
const deleteTask = (id) => {
    let tasks = readTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    writeTasks(filteredTasks);
    return filteredTasks;
};

module.exports = {
    addTask,
    getAllTasks,
    updateTask,
    deleteTask
};
