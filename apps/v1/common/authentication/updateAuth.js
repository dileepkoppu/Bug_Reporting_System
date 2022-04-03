const appRoot=require("app-root-path")
const crypto = require('crypto')

const {sendMail} = require(appRoot+"/helpers/mailHandelar.js")
const Usermodel = require(appRoot+"/models/userModel.js")
const {genPassword}= require(appRoot+'/apps/v1/common/utils/passwordandtokenutils.js')

var validtionPassword = (data)=>{
    const Joi = require("joi")
    var schema= Joi.object({
        "password":Joi.string()
            .min(8)
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+[a-zA-Z0-9!@#$%^&*]{8,}$"))
            .message({'string.pattern.base':'password must be contain all'})
            .required(),
        "conformpassword": Joi.any().valid(Joi.ref('password')).required().messages({ 'any.only': 'conform password must match password' }),
    })
    .with('password', 'conformpassword');
    return schema.validate(data)
    
}


resetPassword = async (req,res)=>{
    try {
        user=await Usermodel.findOne({email:req.body.email})
        if (!user) {
            res.status(404).send({success:false,"message":"Email was not found"})
        } else {
            genToken = crypto.randomBytes(20)
            token = genToken.toString('hex')
            await Usermodel.updateOne({email:req.body.email},{$set:{'authToken':token}})            
            console.log(`http://localhost:9000/bug_tracking_system/api/v1/resetpassword/${token}/${user._id}`);
            link= `http://localhost:4200/resetpassword/${token}/${user._id}`
             sendMail(req.body.email,`http://localhost:9000/bug_tracking_system/api/v1/resetpassword/${token}/${user._id}`,`<h1>Welcome</h1><p>That was easy!</p><a href=${link}>click Here</a>`)
                                                                                .then((data)=>{
                                                                                    res.status(200).send({success:true,"message":"mail willl shortly reach  to you"})
                                                                                })
                                                                                .catch((err)=>{
                                                                                    res.status(420).send({success:false,"message":"something went wrong please try again"})}
                                                                                )
        }
    } catch (error) {
        res.status(500).send({success:false,"messsage":"something went wrong please try again"})
    }
}


resetPasswordconformation=async(req,res)=>{
    try {
    let password=req.body.password
    let cpassword=req.body.conformpassword
    let id= req.params.id
    let authToken =req.params.authToken
    user =await Usermodel.findOne({_id:id,authToken:authToken},{email:1})
    if (!user) {
        res.status(400).send({success:false,"message":"Invaild Link"})
    } else {
        validtePassword=await validtionPassword({password:password,conformpassword:cpassword})
        if (validtePassword.error){
            res.status(422).send({success:false,"message":validtePassword.error.message})
        }else{
            password=await genPassword(password)
            updated_at = Date()
            user1=await Usermodel.updateOne({'_id':req.params.id,"authToken":req.params.authToken},{$set:{authToken:null,hash:password.hash,salt:password.salt,updated_at:updated_at}})
            res.status(202).send({success:true,"message":"password successfully updated"})
        }
        
    }
        
    } catch (error) {
        res.status(400).send({success:false,"message":"something went wrong please try again"})
    }
    
}


module.exports.resetPassword =resetPassword
module.exports.resetPasswordconformation=resetPasswordconformation