const express = require("express")
const router = express.Router();
const { createTask, getTask, getTasks } = require("../controllers/projectTasks")
const auth = require("../middleware/auth")

router.get('/', auth,  getTasks);
router.get('/:id', auth,  getTask);
router.post('/', auth,  createTask);


module.exports = router;