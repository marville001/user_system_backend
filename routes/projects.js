const express = require("express")
const router = express.Router();
const { createProject, getProject, getProjects } = require("../controllers/projects")
const auth = require("../middleware/auth")

router.get('/', auth, getProjects);
router.get('/:id',auth, getProject);
router.post('/', auth, createProject);

module.exports = router;