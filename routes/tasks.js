const express = require("express")
const router = express.Router();
const { createTask, getTask, getTasks } = require("../controllers/tasks")


router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);


module.exports = router;