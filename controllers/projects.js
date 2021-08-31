const bcrypt = require("bcrypt");
const generateToken = require("../helpers/generateJWT");

const { v4: uuidv4 } = require("uuid");
const { validateProject: validate } = require("../helpers/validateProject");
const { create, getAll, getOne } = require("../services/projects");

const getProject = async (req, res) => {
    const { id } = req.params;
    getOne(id, (err, result) => {
        if (err) return res.status(400).send({ success: false, message: err });
        res.send({ success: true, project: result });
    });
};

const getProjects = (req, res) => {
    getAll((err, results) => {
        if (err) return res.status(400).send({ success: false, message: err });
        res.send({ success: true, projects: results });
    });
};

const createProject = async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res
            .status(400)
            .send({ success: false, message: error.details[0].message });

    let body = req.body;

    body.id = uuidv4();

    create(body, (err, project) => {
        if (err) return res.status(400).send({ success: false, message: err });

        res.send({ success: true, project });
    });
};


module.exports = {
    getProject, getProjects, createProject
};
