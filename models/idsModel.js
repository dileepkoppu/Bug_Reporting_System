// const { string } = require('joi')
const mongoose = require('mongoose')
const schema =mongoose.Schema

const id_schema= new schema({
    "id":{
        type:String,
        required:true
    },
    "count":{
        type:Number,
        required:true
    }

})


ids=mongoose.model('ids',id_schema)
module.exports.ids = ids