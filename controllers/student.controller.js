const db = require('../models')
const Student = db.students;
const jwt = require( 'jsonwebtoken' )
const verifyToken = require( '../token' );
const bcrypt = require( 'bcrypt' );
const res = require('express/lib/response');
require ( 'dotenv' ).config ( )
const { Op } = require('@sequelize/core');
exports.create = async (req, res) => {
    try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
   
    const data = await Student.create({
    name:req.body.name,
    city:req.body.city,
    email:req.body.email,
    contact:req.body.contact,
    password:hash
})
res.status(200).send(data)
    }catch(e){
        res.status(404).send(e)

    }
};
exports.login = async (req, res) => {
try{
    var data = req.body;
    const userData = await Student.findOne({ where:{ email:data.email } });
    if(userData === null || userData === undefined)
    {
        res.send({
            message:'email not found..'
        })
    }else if (! bcrypt.compareSync( data.password.toString(  ), userData.password.toString() ) ) {
        res.send( { 
           message: 'Invalid  Password ..' 
        } )
    }else{
        const token = jwt.sign( {id: userData.id}, process.env.TOKEN_SECRET, {
            expiresIn: '5m'
        } )
        res.status(200).send( {
            message: 'Login Successfully...',Token: token 
            } )
    }
}catch(e){
    res.status(404).send(e)

}
};
exports.findAll = async (req, res) => {
    try{
        var limit = parseInt(req.query.limit);
        var page = parseInt(req.query.page);
        var start = (page - 1 ) * limit ;
        //var end = page * limit
       // var results = {}
      
        // var results = await Student.find({}, {limit: limit ,skip: start }  )
        // console.log(limit)
        // sql.query("SELECT * FROM `tutorials`"+ limit, (err,result) => {
        //     if (err) {
        //         console.log("error: ", err);
        //       //result(null, err);
    
        //         return;
        //       }
        //       console.log(result)
        //       //result(null, res)
        // })
        let { name } = req.query;
        const data = await Student.findAll({
        offset: start,
        limit:limit,
           order:[ ['id','DESC'] ]
        })
        res.status(200).send(data)
    }catch(e){
        console.log(e)
    }
};
exports.getById = async (req, res) => {
try{
    const sdata = await Student.findOne({ where:{ id:req.params.id } })
    if(sdata.id !== undefined)
    {
    res.send({data:sdata})
    }
}
catch(e){
    res.send(e)
}
};
exports.update =async (req, res) => {
    try{
    const id = req.params.id;
    const sid = await Student.update(req.body, {
      where: { id: id }
    })
    if (sid === null || sid !== req.params.id ) {
          res.send({message:"Maybe Studentdata was not found or req.body is empty.."});
    } else {
    res.send({message:"Studentdata was updated successfully."});
    }
}catch(e){
        console.log(e)
    }
};
  
exports.delete = async (req, res) => {
    try{
      const id = req.params.id;
      const sid = await Student.destroy({
        where: { id: id }
      })
  
        if (!sid) {
            res.send({message:"Studentdata was not found.."});
      } else {
      res.send({message:"Studentdata was deleted successfully."});
      }
  }catch(e){
          console.log(e)
      }
};
