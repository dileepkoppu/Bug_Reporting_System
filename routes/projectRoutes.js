const appRoot = require("app-root-path")
const router = require('express').Router()

const {projectList,createProject,projectDetails,updateProject,projectNameList} =require(appRoot+"/apps/v1/common/project.js")

const {checkauth} = require(appRoot+"/routes/middleware.js")


router.get("/projects-list",checkauth,projectList)

router.post("/project-create",checkauth,createProject)

router.get("/project-detail/:id",checkauth,projectDetails)

router.patch("/project-detail/:id/update",checkauth,updateProject)

router.get("/projectNameList",checkauth,projectNameList)

module.exports.router = router