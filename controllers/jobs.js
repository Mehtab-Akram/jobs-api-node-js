const { StatusCodes } = require("http-status-codes")

const GetAllJobs = (req, res) => {
    
    res.status(StatusCodes.OK).json(req.body)
}
const GetJob = (req,res)=>{
    res.send("Get One job.")
}
const CreateJob = (req,res)=>{
    res.send("create job")
}
const UpdateJob = (req,res)=>{
    res.send("update Job")
}
const DeleteJob = (req,res)=>{
    res.send("delete job.")
}



module.exports = {GetAllJobs,GetJob,CreateJob,UpdateJob,DeleteJob}