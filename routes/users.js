const express = require("express")
const router = express.Router();
const {getUser, getUsers, createUser, loginUser} = require("../controllers/users")


router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.post('/login', loginUser);

module.exports = router;