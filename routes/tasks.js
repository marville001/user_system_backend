const express = require("express")
const router = express.Router();
const { createTask, getTask, getTasks, deleteTask } = require("../controllers/projectTasks")
const auth = require("../middleware/auth")

router.get('/', auth,  getTasks);
router.get('/:id', auth,  getTask);
router.post('/', auth,  createTask);
router.delete('/', auth,  deleteTask);


module.exports = router;