const express = require('express')
const { CreateJob, UpdateJob, GetAllJobs, DeleteJob, GetJob } = require('../controllers/jobs');


const router = express.Router()


router.route('/').get(GetAllJobs).post(CreateJob)
router.route('/:id').put(UpdateJob).delete(DeleteJob).get(GetJob);



module.exports = router