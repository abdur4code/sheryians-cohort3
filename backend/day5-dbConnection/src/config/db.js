const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://abdurrahim0101001_db_user:EDLCN7HMHFler6Oe@cohort3-cluster.2vsqbo9.mongodb.net/');
        console.log('DataBase Connected');
    } catch (error) {
        console.log('DB Connection error: ', error);
    }
}

module.exports = connectDb;