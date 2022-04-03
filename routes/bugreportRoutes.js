const appRoot = require("app-root-path")

const router = require("express").Router()
const multer= require("multer")
// var upload = multer({ dest: 'uploads/' })

const { bugreportList,createBugreport,bugreportDetails,updateBugreport,deleteBugreport,discussions} = require(appRoot+"/apps/v1/common/bugreport")
const {checkauth} =require(appRoot+"/routes/middleware")
const {upload} = require(appRoot+"/routes/fileHadelar.js")


router.get("/bugreport-list",checkauth,bugreportList)

router.post("/bugreport-create",checkauth,upload.single('details'),createBugreport)

router.get("/bugreport-detail/:id",checkauth,bugreportDetails)

router.patch("/bugreport-detail/:id/update",checkauth,updateBugreport)


router.delete("/bugreport-detail/:id/delete",checkauth,deleteBugreport)

router.post("/bugreport-detail/:id/discussions",checkauth,discussions)

module.exports.router = router