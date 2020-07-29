const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    dossierNumber: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    language: {
        type: String,
    },
    married: {
        type: String,
        default: 'Нет'
    },
    partner: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    imageSrc: {
        type: String,
        default: ''
    },
    haveChildren: {
        type: String,
        default: 'Нет'
    },
    listChild: {
        type: String,
    },
    user: {
        ref: 'user',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('clients', clientSchema);