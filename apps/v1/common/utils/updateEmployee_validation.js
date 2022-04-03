var validation = (data)=>{
    const Joi = require("joi")
    var schema=Joi.object({
        'username': Joi.string().max(30).alphanum().min(4).required(),
        'email':Joi.string().email().required(),
        'role_ids':Joi.any().valid('superuser','admin','tester','developer').required(),
        "firstName": Joi.string().min(3).max(10).required(),
        "lastName": Joi.string().min(3).max(10).required(),
        "mobile":Joi.string().length(10).pattern(/^[0-9]+$/).message({'string.pattern.base':'Provide a vaild data'}).required(),
        "gender":Joi.any().valid('male','female','others').required(),
        "dob":Joi.date().raw().required(),
        "parent_name":Joi.string().min(3).required(),
        "parent_contact_no":Joi.string().length(10).pattern(/^[0-9]+$/).message({'string.pattern.base':'Provide a vaild data'}).required(),
        "address":{
            "city":Joi.string().min(3).required(),
            "pincode":Joi.string().pattern(/^[0-9]+$/).message({'string.pattern':'Provide a vaild data'}).length(6).required(),
            "state":Joi.string().min(3).required()
        },
        "is_active":Joi.boolean().required(),
        "aadhar_number":Joi.string().length(12).required(),
    })
    return schema.validate(data)
    
}
module.exports.validation = validation