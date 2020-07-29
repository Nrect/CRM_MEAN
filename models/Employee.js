const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    oraganization:{
        ref: 'organization',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('employees', employeeSchema);