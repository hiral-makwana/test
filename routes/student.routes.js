const verifyToken = require('../token');

module.exports = app => {
    const validate = require('../validation')
    const { celebrate, Joi, errors, Segments } = require('celebrate');
    const students = require('../controllers/student.controller');
    var router = require("express").Router( );

    router.post("/insert", validate.validate(), students.create);
    router.post("/login", students.login);
    router.get("/findall", students.findAll);
    router.get("/findbyid/:id",verifyToken, students.getById);
    router.put("/update/:id", students.update);
    router.delete("/delete/:id", students.delete);
    app.use('/', router);
    app.use(errors());
}