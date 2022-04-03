const appRoot = require("app-root-path")
const router = require('express').Router()

const {employeeList,employeeDetails,updateEmployee,deleteEmployee,developersUsernameList,testersUsernameList} =require(appRoot+"/apps/v1/common/employee.js")
const {createEmployee} = require(appRoot+"/apps/v1/common/authentication/userRegistration.js")

const {checkauth} = require(appRoot+"/routes/middleware.js")


router.get("/employees-list",checkauth,employeeList)

router.post("/employee-create",checkauth,createEmployee)

router.get("/employee-detail/:id",checkauth,employeeDetails)

router.get("/developersUsernameList",checkauth,developersUsernameList)

router.get("/testersUsernameList",checkauth,testersUsernameList)

router.patch("/employee-detail/:id/update",checkauth,updateEmployee)

router.delete("/employee-detail/:id/delete",checkauth,deleteEmployee)

module.exports.router = router