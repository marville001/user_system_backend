const express = require("express")
const router = express.Router();
const { getUser, getUsers, createUser, loginUser, deleteUser } = require("../controllers/users")
const auth = require("../middleware/auth")

router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);
router.post('/',auth, createUser);
router.post('/login', loginUser);
router.delete('/', auth, deleteUser);

module.exports = router;