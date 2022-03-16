module.exports = (sequelize,DataTypes) => {
    const Student = sequelize.define('students',
    {
        name:{type:DataTypes.STRING},
        city:{type:DataTypes.STRING},
        email:{type:DataTypes.STRING},
        contact:{type:DataTypes.INTEGER},
        password:{type:DataTypes.STRING}
    });
    return Student;
};