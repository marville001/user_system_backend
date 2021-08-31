const express = require("express")
const router = express.Router();
const { createTask, getTask, getTasks } = require("../controllers/projectTasks")


router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);


module.exports = router;