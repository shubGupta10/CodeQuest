import mongoose from 'mongoose'

//user login history
const UserLoginHistorySchema = new mongoose.Schema({
    userId: 
         {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    browser: String,
    os: String,
    device: String,
    ipAddress: String,
    Timestamp: {type: Date, default: Date.now}
});

//user login history
const UserLoginHistory = mongoose.model('LoginHistory', UserLoginHistorySchema);

export {UserLoginHistory}