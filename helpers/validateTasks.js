const Joi = require('joi')

exports.validateTask = (task)=>{
    const schema = Joi.object().keys({
        projectid: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required()
    })
    
    return schema.validate(task)
}