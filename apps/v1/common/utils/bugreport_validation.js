var validation = (data)=>{
    const Joi = require("joi")
    var schema=Joi.object({
        'title': Joi.string().min(3).required(),
        "description": Joi.string().min(3).required(),
        "testerName": Joi.string().required(),
        "developerName": Joi.string().required(),
        "projectName": Joi.string().required(),
        "details": Joi.string(),
        'status':Joi.any().valid('In Progress','Fixed','Completed').required(),
        'priority':Joi.any().valid('Low','High','Very High').required(),
    })
    return schema.validate(data)
    
}
module.exports.validation = validation