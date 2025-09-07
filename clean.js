
const connectDB = require('./db/connect');
const User = require('./models/User');
require('dotenv').config({quiet : true});


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        await User.deleteMany();
        console.log('Deleted with Success' );
        process.exit(0);
    } catch(err){
        console.log(err);
        process.exit(1); 
    }
}

start();