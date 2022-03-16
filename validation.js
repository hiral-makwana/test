const { celebrate, Joi, errors, Segments } = require('celebrate');
const express = require('express');
const app = express();

 module.exports = {
    validate : () =>  celebrate({
        [Segments.BODY]:Joi.object().keys({
             name:Joi.string().min(3).required(),
             city:Joi.string().min(3).required(),
             email:Joi.string().required().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
             contact:Joi.number().min(10).required(),
             password:Joi.string().required()
    
         })
    }),
  }

   
