const express = require("express")
const router = express.Router();
const { createProject, getProject, getProjects } = require("../controllers/projects")


router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', createProject);

module.exports = router;