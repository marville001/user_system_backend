const bcrypt = require("bcrypt");
const generateToken = require("../helpers/generateJWT");

const { v4: uuidv4 } = require("uuid");
const { validateTasks: validate } = require("../helpers/validateTasks");
const { create, getAll, getOne } = require("../services/tasks");

const getTask = async (req, res) => {
    const { id } = req.params;
    getOne(id, (err, result) => {
        if (err) return res.status(400).send({ success: false, err });
        res.send({ success: true, task: result });
    });
};

const getTasks = (req, res) => {
    getAll((err, results) => {
        if (err) return res.status(400).send({ success: false, err });
        res.send({ success: true, tasks: results });
    });
};

const createTask = async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res
            .status(400)
            .send({ success: false, message: error.details[0].message });

    let body = req.body;

    body.id = uuidv4();

    create(body, (err, project) => {
        if (err) return res.status(400).send({ success: false, err });

        res.send({ success: true, task });
    });
};


module.exports = {
    getTask, getTasks, createTask
};
