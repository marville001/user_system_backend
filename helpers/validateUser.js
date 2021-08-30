const Joi = require('joi')

exports.validateUsers = (user)=>{
    const schema = Joi.object().keys({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        age: Joi.number().min(18).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        gender: Joi.string().required(),
        contact: Joi.string().required(),
    })
    
    return schema.validate(user)
}