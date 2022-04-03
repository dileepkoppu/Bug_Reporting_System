const mongoose = require('mongoose')
const schema =mongoose.Schema


const project_schema = new schema({
    id:{
        type:String,
        required:true
    },
    projectName:{
        type:String,
        required:true,
        trim:true
    },
    clientName:{
        type:String,
        required:true,
        trim:true
    },
    repoLink:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type: String,
        enum: ['In Progress','Completed'],
        required:true
    },
    created_at:{
        type :Date
    },
    updated_at:{
        type : Date
    }
})


project=mongoose.model('project',project_schema)
module.exports.project = project