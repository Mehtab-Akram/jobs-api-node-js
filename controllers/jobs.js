const { StatusCodes } = require("http-status-codes")
const Job = require("../models/Job")
const { BadRequestError, NotFoundError } = require("../errors")

const GetAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.Id }).sort('-createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}
const GetJob = async (req, res) => {

    const { user: { Id }, params: { id: jobId } } = req
    const job = await Job.findOne({ _id: jobId, createdBy: Id })
    res.status(StatusCodes.OK).json({ job })
}
const CreateJob = async (req, res) => {
    console.log(req.user)
    req.body.createdBy = req.user.Id;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}
const UpdateJob = async (req, res) => {
    const {
        user: { Id },
        params: { id: jobId },
        body: { company, position }
    } = req
    if (company === "" || position === "") {
        throw new BadRequestError("Company and Position are required.")
    }
    const existingJob = await Job.findOne({ _id: jobId })
    if (!existingJob) {
        throw new NotFoundError("Job not found.")
    }
    const updatedJob = await Job.findByIdAndUpdate(
        { _id: jobId, createdBy: Id },
        req.body,
        { runValidators: true, new: true }
    )
    console.log(updatedJob)

    res.status(StatusCodes.OK).json({ updatedJob })
}
const DeleteJob = async (req, res) => {
    const { user: { Id }, params: { id: jobId } } = req
    const job = await Job.deleteOne({ _id: jobId, createdBy: Id })
    res.status(StatusCodes.OK).json({ job })
}



module.exports = { GetAllJobs, GetJob, CreateJob, UpdateJob, DeleteJob }