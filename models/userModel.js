const mongoose = require('mongoose')
const schema =mongoose.Schema

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var validateusername = function(username) {
    var re = /^[\w_]*$/;
    return re.test(username)
};

const AddressSchema = {
    "city": String,
    "state": String,
    "pincode":String,
  };

const user_schema = new schema({
    "id":{
        type:String,
        required:true,
        trim: true,
        unique:true,
    },
    "username": {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        validate: [validateusername, 'Please fill a valid Username address'],
    },
    "email": {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true,'email is exist'],
        required:true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    "role_ids": {
        type: String,
        enum: ["superuser", "admin","tester","developer"],
        required:true
     },
    "firstName":{
        type:String,
        required:true,
        trim: true,
        minLength:3
    },
    "lastName":{
        type:String,
        required:true,
        trim: true,
        minLength:3
    },
    "mobile": {
        type:String,
        trim:true,
        Length:10,
    },
    "gender":{
        type: String,
        enum: ['male','female','others'],
        required:true
    },
    "dob": {
        type :Date,
        required:true
    },
    "salt": {
        type : String,
        required:true,
        trim: true,
    },
    "hash": {
        type : String,
        required:true,
        trim: true,
    },
    "parent_name":{
        type:String,
        required:true,
        trim: true,
    },
    "parent_contact_no": {
        type:String,
        trim:true,
        Length:10,
    },
    "address":{
        type: AddressSchema,
        required:true,
    },
    "authToken":String,
    "is_active": Boolean,
    "aadhar_number": {
        type:String,
        trim:true,
        Length:10,
    },
    "created_by": {
        type : String,
        required:true,
    },
    "aadhar_number": {
        type : String,
        required:true,
    },

    "created_date": Date,
    "updated_at":Date
})

user=mongoose.model('User',user_schema)
module.exports = user