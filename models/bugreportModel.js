const mongoose = require('mongoose')
const schema  = mongoose.Schema


const bugreport_schema = new schema({
    "title":{
        type : String,
        required:true,
        unique: [true,'title is exist'],
        trim:true,
    },
    id:{
        type : String,
        required:true,
        unique:true,
        trim:true
    },
    "description":{
        type : String,
        required:true,
        trim:true,
        minLength:3,
    },
    "testerName":{
        type : String,
        required:true,
        trim:true,
    },
    "developerName":{
        type : String,
        required:true,
        trim:true,
    },
    "projectName":{
        type : String,
        required:true,
        trim:true,
    },
    "details":{
        type : String,
        required :true,
        trim : true   
    },
    "status":{
        type: String,
        enum: ['In Progress','Completed','Fixed'],
        required:true
    },
    "priority":{
        type: String,
        enum: ['Low','High','Very High'],
        required:true
    },
    "discussions":{
        type : Array 
    },
    "created_at":{
        type :Date
    },
    "updated_at":{
        type : Date
    }
})

bugreport=mongoose.model('Bugreport',bugreport_schema)
module.exports.Bugreport = bugreport