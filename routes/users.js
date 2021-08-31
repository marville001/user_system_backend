const express = require("express")
const router = express.Router();
const { getUser, getUsers, createUser, loginUser } = require("../controllers/users")
const auth = require("../middleware/auth")

router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);
router.post('/', createUser);
router.post('/login', loginUser);

module.exports = router;