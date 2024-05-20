const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getTasks = async (req, res) => {
  try {
    const task = await Task.find({});
    res.status(200).json({ count: task.length, task });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getTaskByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const task = await Task.find({ category });
    res.status(200).json({ count: task.length, task });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getTaskBySearch = async (req, res) => {
  let searchTerm = req.query.searchTerm;
  try {
    const task = await Task.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.status(200).json({ count: task.length, task });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById({ _id: id });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete({ _id: id });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskByCategory,
  getTaskBySearch,
  getSingleTask,
  updateTask,
  deleteTask,
};
