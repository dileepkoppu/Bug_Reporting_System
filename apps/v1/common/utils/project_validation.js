var validation = (data)=>{
    const Joi = require("joi")
    var schema=Joi.object({
        'projectName': Joi.string().min(3).required(),
        "clientName": Joi.string().min(3).required(),
        "repoLink": Joi.string().uri().required(),
        'status':Joi.any().valid('In Progress','Completed').required(),
    })
    return schema.validate(data)
    
}
module.exports.validation = validation