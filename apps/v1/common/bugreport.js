const appRoot = require("app-root-path")
const fs =require('fs')

const { validation } =require(appRoot+"/apps/v1/common/utils/bugreport_validation.js")
const { Bugreport } = require(appRoot+"/models/bugreportModel")
const { ids } = require(appRoot+"/models/idsModel")


bugreportList = async(req,res)=>{
    try {
        if (req.jwt.role==="admin"||req.jwt.role==="superuser") {
            query= {}
        } else if (req.jwt.role ==="tester") {
            query = {"testerName":req.jwt.username}
        } else if (req.jwt.role==="developer") {
            query = {"developerName":req.jwt.username}   
        } else {
             res.status(403).send({success: false,"message":"You are not authorized to visit this route"})
        }
        Bugreport.find(query)
                    .then((reports)=>{
                                if (reports.length===0) {
                                    res.status(200).send({success: true,"message":"No Bug reports are at present"})
                                } else {
                                     res.status(200).send({success: true,data:reports})   
                                }
                            })
                            .catch((error)=>{
                                 res.status(503).send({success: false,message:"somting went worng please try again"})
                            })
    } catch (error) {
         res.status(500).send({success:flase,message:"somting went worng please try again"})
    }
}

createBugreport = async (req,res)=>{
    try {
        if (req.file){
            if (! await Bugreport.findOne({title:req.body.title})) {
                bugreport ={
                    "title" : req.body.title,
                    "description":req.body.description,
                    "testerName" : req.body.testerName||req.jwt.username,
                    "developerName" : req.body.developerName,
                    "projectName" : req.body.projectName,
                    "details" : req.file.filename,
                    "status" : req.body.status,
                    "priority":req.body.priority
                }
                validate = validation(bugreport)
                if (!validate.error) {
                    id= await ids.findOne({id:"bugreportid"})
                    id.count=id.count+1
                    bugreport.id="BUG00"+id.count
                    bugreport.created_at=Date()
                    data1 = new Bugreport(bugreport)
                      data1.save()
                                .then((data)=>{
                                    id.save()
                                     res.status(201).send({success:true,"message":`Bugreport ${data.title} created`})
                                })
                                .catch((error)=>{

                                      res.status(400).json({success:false,"message":"something went wrong please try again"})
                                })
                } else {
                     res.status(422).send({success:false,"message":validate.error.message})
                }
                
            } else {
                filepath=appRoot+"/uploads/"+req.file.filename
                fs.unlink(filepath,(err)=>{
                    console.log(err);
                })
                 res.status(422).send({success:false,"message":"Title Already exists"})   
            }
            
        }else{
             res.status(422).send({success:false,"message":"please provide a valid file"})
        }

    } catch (error) {

          res.status(400).json({success:false,"message":"something went wrong please try again"})
    }
}

const bugreportDetails = async(req,res)=>{
    try {
        id=req.params.id
             Bugreport.findOne({_id:id}) 
                                    .then((report)=>{
                                    report.discussions=report.discussions.reverse()
                                     res.status(200).send({success:true,data:report})
                                    })
                                    .catch((error)=>{
                                         res.status(500).send({success:false,"message":"something when wrong please try again or check relogin"})
                                    })
        
    } catch (error) {
         res.status(503).send({success:false,"message":"something when wrong please try again or check relogin"})
    }
}

const updateBugreport = async(req,res)=>{
    try {
        id = req.params.id
        validate = validation(req.body)
        if (!validate.error) {
            report = Bugreport.updateOne({"_id":id},{$set:req.body})
                                            .then((report)=>{
                                                if (report.nModified===1) {
                                                     res.status(202).send({success:true,"message":"Bugreport successfully updated"})
                                                } else {
                                                     res.status(200).send({success:false,"message":"Bugreport not updated please try again"})
                                                }
                                            })
                                            .catch((error)=>{
                                                 res.status(400).send({success:false,"message":"something when wrong please try again or check relogin"})
                                            })
            
        } else {
             res.status(422).send({success:false,"message":validate.error.message})            
        }
        
        
    } catch (error) {
         res.status(503).send({success:false,"message":"something when wrong please try again or check relogin"})
    }
    
}

const deleteBugreport = async(req,res)=>{
    try {
        id= req.params.id
        role = req.jwt.role
        filename = await Bugreport.findOne({_id:id})
        if (role==="superuser"||role==="admin"||role==="tester") {
            Bugreport.deleteOne({"_id":id})
                                .then((report)=>{
                                    if (report.deletedCount===1) {
                                        filepath=appRoot+"/uploads/"+filename.details
                                        fs.unlink(filepath,(err)=>{
                                            console.log(err);
                                        })
                                         res.status(203).send({success:true,"message":"Bugreport scccessfully deleted"})
                                    } else {
                                         res.status(304).send({success:flase,"message":"Bugreport not deleted please try again"})
                                    }
                                })
                                .catch((error)=>{
                                     res.status(500).send({success:false,"message":"something when wrong please try again or check relogin"})
                                })
        } else {
             res.status(403).send({success: false,"message":"You are not authorized to visit this route"})
        }
        
    } catch (error) {
         res.status(503).send({success:false,"message":"something when wrong please try again or check relogin"})
    }
}


discussions = async(req,res)=>{
    try {
        id = req.params.id
        comment = req.body.comment
        username = req.jwt.username
        timestamp = Date()
         Bugreport.findOne({_id:id})
                            .then((report)=>{
                                if (report) {
                                    if (report.discussions) {
                                        report.discussions.push({comment:comment,username:username,time:timestamp})
                                    } else {
                                        report.discussions=[]
                                        report.discussions.push({comment:comment,username:username,time:timestamp})
                                    }
                                    report.save()
                                    res.status(202).send({success:true,data:{comment:comment,username:username,time:timestamp}})
                                } else {
                                    res.status(400).send({success:false,"message":"Report not found"})
                                }
                            })
                            .catch((error)=>{
                                res.status(500).send({success:false,"message":"some thing when wrong try again"})
                            })
        
    } catch (error) {
        res.status(500).send({success:flase,"message":"some thing when wrong try again"})
    }
    
}


module.exports.bugreportList = bugreportList
module.exports.createBugreport = createBugreport
module.exports.bugreportDetails = bugreportDetails
module.exports.updateBugreport = updateBugreport
module.exports.deleteBugreport = deleteBugreport

module.exports.discussions = discussions







