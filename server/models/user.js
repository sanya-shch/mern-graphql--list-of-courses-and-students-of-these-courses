const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    courseId: String,
    status: Boolean,
});

module.exports = mongoose.model('User', userSchema);