const db = require("../config/db");
const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");
const { validateUsers: validate } = require("../helpers/validateUser");
const { create, getAll, getOne } = require("../services/users");

const getUser = async (req, res) => {
  const { id } = req.params;
  getOne(id, (err, result)=>{
	if (err)
	return res
	  .status(400)
	  .send({ success: false, err });
	  res.send({ success: true, user: result });
})
};

const getUsers = (req, res) => {
	getAll((err, results)=>{
		if (err)
		return res
		  .status(400)
		  .send({ success: false, err });
		  res.send({ success: true, users: results });
	})
};

const createUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  let body = req.body;

  const salt = await bcrypt.genSalt(10);
  const encPass = await bcrypt.hash(body.password, salt);
  body.password = encPass;
  body.id = uuidv4();

  create(body, (err, result) => {
    if (err)
      return res
        .status(400)
        .send({ success: false, err });

    res.send({ success: true, message: result });
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
