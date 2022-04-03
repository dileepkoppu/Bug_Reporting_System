const appRoot = require("app-root-path")
const Usermodel= require(appRoot+"/models/userModel")
const usersdata= require(appRoot+"/tempUsers")

saveUsers=async()=>{
    try {
        user=await Usermodel.countDocuments()
        console.log(user);
        if (user>=1) {
            return ""
        } else {
            usersdata.forEach(user1 => {Usermodel(user1).save()});
            console.log('users created');
            return 'users created'
        }
    } catch (error) {
        return error
    }
}

module.exports = saveUsers