import mongoose from 'mongoose'

const UserLoginHistorySchema = new mongoose.Schema({
    userId: 
         {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    browser: String,
    os: String,
    device: String,
    ipAddress: String,
    Timestamp: {type: Date, default: Date.now}
});


const UserLoginHistory = mongoose.model('LoginHistory', UserLoginHistorySchema);

export {UserLoginHistory}