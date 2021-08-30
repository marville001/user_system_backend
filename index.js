require('dotenv').config()
const express = require("express")
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const usersRoute = require('./routes/users')
const projectsRoute = require('./routes/projects')
const tasksRoute = require('./routes/tasks')


app.get('/', (req, res) => {
    res.send({ status: "Ok", message: "Welcome to API" });
})

app.use("/api/users", usersRoute);
app.use("/api/projects", projectsRoute);
app.use("/api/tasks", tasksRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`))