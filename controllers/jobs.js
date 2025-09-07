const { StatusCodes } = require('http-status-codes');
const Job = require('../models/Job');
const User = require('../models/User');
const NotFoundError = require('../errors/not-found');
const BadRequestError = require('../errors/bad-request');

const getAllJobs = async (req , res) => {
    const Jobs = await Job.find({createdBy : req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({Jobs , nbHits : Jobs.length});
}
const getJob = async (req , res) => {
    const { user : {userId} , params : {id : jobId}} = req;
    const job = await Job.findOne({
        _id:jobId , createdBy:userId
    });
    if(!job){
        throw new NotFoundError(`Job does not exist with id : ${jobId}`);
    }
    res.status(StatusCodes.OK).json(job)
}
const createJob =  async (req , res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
}
const updateJob = async (req, res) => {
    const { user : {userId} ,
        params : {id : jobId},
        body : {company , position }
    } = req;

    if(!company || !position){
        throw new BadRequestError('Company or Position not provided');
    }
    const job = await Job.findOneAndUpdate({
        _id:jobId , createdBy:userId} , 
        req.body , 
        {new : true , runValidators : true} );
    if(!job){
        throw new NotFoundError('Job does not exist');
    }
    res.status(StatusCodes.OK).json(job);
}

const deleteJob = async (req, res) => {
    const { user : {userId} , params : {id : jobId}} = req;
    const job = await Job.findOneAndDelete({
        _id:jobId , createdBy:userId
    });
    if(!job){
        throw new NotFoundError('Job does not exists');
    }
    res.status(StatusCodes.OK).json(job);
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}  