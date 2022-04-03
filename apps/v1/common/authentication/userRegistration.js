const appRoot =require('app-root-path');
const Usermodel = require(appRoot+'/models/userModel');
const {genPassword,validPassword,issueJWT} =require(appRoot+"/apps/v1/common/utils/passwordandtokenutils");
const {validation} = require(appRoot+'/apps/v1/common/utils/userSchema_validation');
const { ids } = require(appRoot+"/models/idsModel")

createEmployee=async(req,res)=>{
    try {
        if (req.jwt.role==="superuser"||req.jwt.role==="admin") {
            if (req.body.username) {
                userUsernamecheck =await Usermodel.findOne({"username":req.body.username})    
            } else {
                  res.status(422).send({success:false,"message":"Please enter all fields"})
            }
            if (!userUsernamecheck) {
                userEmailcheck =await Usermodel.findOne({"email":req.body.email})
                if (!userEmailcheck) {
                    userData={
                        "username":req.body["username"],
                        "email":req.body["email"],
                        "role_ids":req.body["role_ids"],
                        "firstName":req.body["firstName"],
                        "lastName":req.body["lastName"],
                        "mobile":req.body["mobile"],
                        "gender":req.body["gender"],
                        "dob":req.body["dob"],
                        "password":req.body["password"],
                        "conformPassword":req.body["conformPassword"],
                        "parent_name":req.body["parent_name"],
                        "parent_contact_no":req.body["parent_contact_no"],
                        "address":{
                            "city":req.body["city"],
                            "pincode":req.body["pincode"],
                            "state":req.body["state"]
                        },
                        "is_active":req.body["is_active"],
                        "aadhar_number":req.body["aadhar_number"]
                    }
                    validate =validation(userData)
                    if (!validate.error) {
                        const {salt,hash}=genPassword(userData.password)
                        delete userData.conformPassword
                        delete userData.password
                        userData.salt=salt
                        userData.hash=hash
                        userData.created_by=req.jwt.username
                        id= await ids.findOne({id:"employeeid"})
                        id.count=id.count+1
                        userData.id = 'EMP00'+id.count
                        userData.created_date = Date.now()
                        const user = new Usermodel(userData)
                        const userSave =await user.save()
                        id.save()
                         res.status(201).send({success:true,"message":"Employee successfully created"})
                    }
                     else {
                         res.status(422).send({success:false,"message":validate.error.message})
                        
                    }
                } else {
                     res.status(422).send({success:false,"message":"Email Already exists"})
                }
            } else {
                 res.status(422).send({success:false,"message":"username Already exists"})
            }
        } else {
             res.status(401).send({success:false,message:"You are not authorized to visit this route"})
        }  
    } catch (error) {
         res.status(400).json({success:false,"message":"something went wrong please try again"})
    }
}

login = async(req, res, next)=>{
    try {
        Usermodel.findOne({ email:req.body.email,is_active:true},{_id:1,email:1,username:1,hash:1,salt:1,role_ids:1})
                .then((user) => {
                    if (!user) {
                         res.status(401).json({ 
                            success: false,  "message": "email is invalid" });
                    }
                    const isValid = validPassword(req.body.password, user.hash, user.salt);
                    if (isValid) {
                        const tokenObject = issueJWT(user);
                         res.status(200).json({ success: true, data:{token: tokenObject.token, expiresIn: tokenObject.expires,username:user.username,role:user.role_ids}});

                    } else {
                         res.status(401).json({ success: false,  "message": "you entered the wrong password" });
                    }
                })
                .catch((err) => {
                     res.status(401).json({ success: false,  "message": "you entered the wrong Email Id" });
                });
    }catch (error) {
         res.status(401).json({ success: false,  "message": "Something when wrong please try again" });
    }}
    


module.exports.createEmployee = createEmployee
module.exports.login = login


