const Joi = require('joi')

exports.validateProject = (project)=>{
    const schema = Joi.object().keys({
        userid: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        duration: Joi.number().required(),
        startdate: Joi.string().required()
    })
    
    return schema.validate(project)
}