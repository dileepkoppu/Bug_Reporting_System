const appRoot = require('app-root-path')

const {project} = require(appRoot+"/models/projectModel")
const { ids } = require(appRoot+"/models/idsModel")
const { validation }=require(appRoot+"/apps/v1/common/utils/project_validation.js")


const projectList = async(req,res)=>{
    try {
        if (req.jwt.role==="admin"||req.jwt.role==="superuser") {
            query= {}
        } else {
             res.status(403).send({success: false,"message":"You are not authorized to visit this route"})
        }
                    project.find(query)
                                    .then((projects)=>{
                                        if (projects.length===0) {
                                             res.status(200).send({success: true,"message":"No projects are at present"})
                                        } else {
                                             res.status(200).send({success: true,data:projects})   
                                        }
                                    })
                                    .catch((error)=>{
                                         res.status(503).send({success: false,message:"somting went worng please try again"})
                                    })
    } catch (error) {
         res.status(500).send({success:flase,message:"somting went worng please try again"})
    }
}

const createProject = async(req,res)=>{
    try {

        if (req.jwt.role==="admin"||req.jwt.role==="superuser"){
                if (!await project.findOne({"projectName":req.body.projectName})) {
                validate = validation(req.body)
                if (!validate.error) {
                    id= await ids.findOne({id:"projectid"})
                    id.count=id.count+1
                    projectid="PROJ00"+id.count
                    req.body.id=projectid
                    req.body.created_at=Date()
                    data1 = new project(req.body)
                     data1.save()
                                .then((data)=>{
                                    id.save()
                                     res.status(201).send({success:true,"message":`project ${data.projectName} created`})
                                })
                                .catch((error)=>{
                                      res.status(400).json({success:false,"message":"something went wrong please try again"})
                                })
                } else {
                     res.status(422).send({success:false,"message":validate.error.message})
                }
            }else{
                 res.status(422).send({success:false,"message":"projectName Already exists"})
            }
            
        } else {
             res.status(422).send({success:false,"message":"You are not authorized to visit this route"})
        }

    } catch (error) {
          res.status(400).json({success:false,"message":"something went wrong please try again"})
    }
}



const projectDetails = async(req,res)=>{
    try {
        id=req.params.id
        if (req.jwt.role==="admin"||req.jwt.role==="superuser") {
            if (id) {
                query={"_id":id} 
            } else {
                 res.status(500).send({success:false,"message":"something when wrong please try again or check relogin"})
            }
            
        } else {
             res.status(403).send({success:false,"message":"You are not authorized to visit this route"})
        }
         project.findOne(query) 
                                    .then((data)=>{
                                         res.status(200).send({success:true,data:data})
                                    })
                                    .catch((error)=>{
                                         res.status(500).send({success:false,"message":"something when wrong please try again or check relogin"})
                                    })
        
    } catch (error) {

         res.status(503).send({success:false,"message":"something when wrong please try again or check relogin"})
    }
}



const updateProject = async(req,res)=>{
    try {
        if (req.jwt.role==="superuser"||req.jwt.role==="admin") {
            validate =validation(req.body)
            if (!validate.error) {
                id = req.params.id
                if (id) {
                    query={"_id":id} 
                } else {
                     res.status(500).send({success:false,"message":"something when wrong please try again or check relogin"})
                }

                user = project.updateOne({"_id":id},{$set:req.body})
                                            .then((data)=>{
                                                if (data.nModified===1) {
                                                     res.status(202).send({success:true,"message":"Project successfully updated"})
                                                } else {
                                                     res.status(200).send({success:false,"message":"Project not updated please try again"})
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


const projectNameList = async(req,res)=>{
    try {
        role = req.jwt.role
        if (role==="superuser"||role==="admin"||role==="tester") {
            project.find({},{projectName:1,_id:0})
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


module.exports.projectList = projectList
module.exports.createProject = createProject
module.exports.projectDetails = projectDetails
module.exports.updateProject = updateProject
module.exports.projectNameList = projectNameList




