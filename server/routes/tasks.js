const express = require("express");
const {
  createTask,
  getTasks,
  getTaskByCategory,
  getTaskBySearch,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");
const router = express.Router();

router.post("/create", createTask); //
router.get("/get", getTasks); //
router.get("/getTask", getTaskByCategory);
router.post("/search", getTaskBySearch); //
router.put("/edit/:id", updateTask); //
router.delete("/delete/:id", deleteTask); //

module.exports = router;
