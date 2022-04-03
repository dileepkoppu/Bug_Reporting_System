const appRoot = require('app-root-path')

const Usermodel = require(appRoot+"/models/userModel")
const { validation } = require(appRoot+"/apps/v1/common/utils/updateEmployee_validation.js")

const employeeList = async(req,res)=>{
    try {
        if (req.jwt.role==='superuser'){
            query = {_id:{$ne:req.jwt.sub}}
        }else if (req.jwt.role==="admin") {
            query = {_id:{$ne:req.jwt.sub},role_ids:{$ne:'superuser'}}
        } else {
             res.status(403).send({success: false,"message":"You are not authorized to visit this route"})
        }
           Usermodel.find(query)
                            .then((user)=>{
                                if (user.length===0) {
                                     res.status(423).send({success: true,"message":"No Employees are at present"})
                                } else {
                                     res.status(200).send({success: true,data:user})   
                                }
                            })
                            .catch((error)=>{
                                 res.status(503).send({success: false,message:"somting went worng please try again"})
                            })
    } catch (error) {
         res.status(500).send({success:flase,message:"somting went worng please try again"})
    }
    
}

const employeeDetails = async(req,res)=>{
    try {
        id=req.params.id
        if (req.jwt.role==="admin"||req.jwt.role==="superuser") {
            if (id) {
                query={"_id":id} 
            } else {
                 res.status(400).send({success:false,"message":"something when wrong please try again or check relogin"})
            }
            
        } else {
             res.status(403).send({success:flase,"message":"permission denied"})
        }
                Usermodel.findOne(query) 
                                    .then((user)=>{
                                         res.status(200).send({success:true,data:user})
                                    })
                                    .catch((error)=>{
                                         res.code(500).send({success:false,"message":"something when wrong please try again or check relogin"})
                                    })
        
    } catch (error) {
         res.status(503).send({success:false,"message":"something when wrong please try again or check relogin"})
    }
}

const updateEmployee = async(req,res)=>{
    try {
        if (req.jwt.role==="superuser"||req.jwt.role==="admin") {
            validate =validation(req.body)
            if (!validate.error) {
                id = req.params.id
                user = Usermodel.updateOne({"_id":id},{$set:req.body})
                                            .then((user)=>{
                                                if (user.nModified===1) {
                                                     res.status(202).send({success:true,"message":"Employee successfully updated"})
                                                } else {
                                                     res.status(200).send({success:false,"message":"Employee not updated please try again"})
                                                }
                                            })
                                            .catch((error)=>{
                                                 res.status(500).send({success:false,"message":"something when wrong please try again or check relogin"})
                                            })
        
                
            } else {
                 res.status(422).send({success:false,"message":validate.error.message})
            }
            
            
        } else {
             res.status(401).send({success:false,message:"You are not authorized to visit this route"})
        }
        
    } catch (error) {
         res.status(503).send({success:false,"message":"something when wrong please try again or check relogin"})
    }
    
}

const deleteEmployee = async(req,res)=>{
    try {
        id= req.params.id
        if (id) {
              Usermodel.deleteOne({"_id":id})
                                .then((user)=>{
                                    if (user.deletedCount===1) {
                                         res.status(203).send({success:true,"message":"Employee scccessfully deleted"})
                                    } else {
                                         res.code(304).send({success:flase,"message":"Employee not deleted please try again"})
                                    }
                                })
                                .catch((error)=>{
                                     res.code().send({success:false,"message":"something when wrong please try again or check relogin"})
                                })
        } else {
             res.status(422).send({success:false,"message":"something when wrong please try again or check relogin"})
        }
        
    } catch (error) {
         res.status(503).send({success:false,"message":"something when wrong please try again or check relogin"})
    }
}

const developersUsernameList = async(req,res)=>{
    try {
        id=req.params.id
        role = req.jwt.role
        if (role==="superuser"||role==="admin"||role==="tester") {
            Usermodel.find({role_ids:"developer"},{username:1,_id:0})
                        .then((data)=>{
                             res.status(200).send({success:true,data:data})
                        })
                        .catch((error)=>{
                             res.status(400).send({success:false,message:"something when wrong please try again or check relogin"})
                        })
                                    
        } else {
             res.status(401).send({success:false,message:"You are not authorized to visit this route"})
        }


    } catch (error) {
         res.status(400).send({success:false,message:"something when wrong please try again or check relogin"})
    }
}



const testersUsernameList = async(req,res)=>{
    try {
        role = req.jwt.role
        if (role==="superuser"||role==="admin") {
            Usermodel.find({role_ids:"tester"},{username:1,_id:0})
                        .then((data)=>{
                             res.status(200).send({success:true,data:data})
                        })
                        .catch((error)=>{
                             res.status(400).send({success:false,message:"something when wrong please try again or check relogin"})
                        })
                                    
        } else {
             res.status(401).send({success:false,message:"You are not authorized to visit this route"})
        }


    } catch (error) {
         res.status(400).send({success:false,message:"something when wrong please try again or check relogin"})
    }
}


module.exports.employeeList = employeeList
module.exports.employeeDetails = employeeDetails
module.exports.updateEmployee = updateEmployee
module.exports.deleteEmployee = deleteEmployee
module.exports.developersUsernameList =developersUsernameList
module.exports.testersUsernameList = testersUsernameList



