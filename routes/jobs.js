const express = require('express');
const jobsRouter  = express.Router();
const auth = require('../middleware/authentication');
const {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
} = require('../controllers/jobs');

jobsRouter.route('/').get(auth , getAllJobs).post(auth , createJob);
jobsRouter.route('/:id').get(auth , getJob).patch(auth , updateJob).delete(auth , deleteJob);

module.exports = jobsRouter;