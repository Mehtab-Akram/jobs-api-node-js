const express = require('express')
const { CreateJob, UpdateJob, GetAllJobs, DeleteJob, GetJob } = require('../controllers/jobs');
const authenticationMiddleWare = require('../middleware/authentication');


const router = express.Router()


router.route('/').get(authenticationMiddleWare, GetAllJobs).post(CreateJob)
router.route('/:id').put(UpdateJob).delete(DeleteJob).get(GetJob);



module.exports = router