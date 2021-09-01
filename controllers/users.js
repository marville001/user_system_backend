const db = require("../config/db");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const generateToken = require("../helpers/generateJWT");

const { v4: uuidv4 } = require("uuid");
const { validateUsers: validate } = require("../helpers/validateUser");
const { create, getAll, getOne, login, deleteOne } = require("../services/users");

const getUser = async (req, res) => {
  const { id } = req.params;
  getOne(id, (err, result) => {
    if (err) return res.status(400).send({ success: false, err });
    res.send({ success: true, user: result });
  });
};

const getUsers = (req, res) => {
  getAll((err, results) => {
    if (err) return res.status(400).send({ success: false, err });
    res.send({ success: true, users: results });
  });
};

const deleteUser = (req, res) => {
  if (!req.body.id)
    return res
      .status(400)
      .send({ success: false, message: "No User Id provided" });

  deleteOne((err, message) => {
    if (err) return res.status(400).send({ success: false, err });
    res.send({ success: true, message});
  });
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

  create(body, (err, user) => {
    if (err) return res.status(400).send({ success: false, err });

    const token = generateToken(user.email, user._id)
    res.send({ success: true, user, token });
  });
};

const loginUser = async(req, res)=>{
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password:Joi.string().min(8).required()
  })
	const { error } = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  
  login(req.body, (err, user)=>{
    if (err) return res.status(400).send({ success: false, message: err });
    const token = generateToken(user.email, user._id)
    res.send({ success: true, user, token });
  })
  
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  loginUser,
  deleteUser
};
