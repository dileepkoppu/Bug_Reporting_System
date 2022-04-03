const appRoot=require("app-root-path")
const express = require('express')
const cors = require("cors")


const userRoutes = require(appRoot+'/routes/userRoutes')
const projectRoutes =require(appRoot+"/routes/projectRoutes")
const employeeRoutes =require(appRoot+"/routes/employeeRoutes")
const bugreportRoutes =require(appRoot+"/routes/bugreportRoutes")


require('dotenv').config()

const uri = process.env.DB_URL||'mongodb://localhost/Bug_tracking_system'


const Port = process.env.PORT||9000
const app = express()


// db
// ----------------------------------------------------------------------

require(appRoot+"/helpers/mongodbHelper.js").database(uri)


// ---------------------------------------------------


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(appRoot+'/public'));
app.use('',express.static(appRoot+"/static"))
app.use('/upload',express.static(appRoot+'/uploads'));



// routes
app.use('',userRoutes.router)
app.use('',projectRoutes.router)
app.use('',employeeRoutes.router)
app.use('',bugreportRoutes.router)

// // List the all routes TEMP
// const all_routes = require('express-list-endpoints');
// console.log(all_routes(app))


// server
app.listen(Port,() => {
    console.log(`Server started on localhost:${Port}`)
}) 
