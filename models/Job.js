const mongoose = require('mongoose');

const Job = new mongoose.Schema({
    company:{
        type:String,
        required:[true , 'Please provide the company name'],
        maxlength:50,
    },
    position:{
        type:String,
        required:[true , 'Please provide the position'],
        maxlength:100,
    },
    status:{
        type:String,
        enum:['interview' , 'declined' , 'pending'] ,
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true , 'Please provide user'],
    },
    },{timestamps : true}
)

module.exports = mongoose.model('Job' , Job);