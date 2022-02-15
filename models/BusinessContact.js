var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var BusinessContactSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    number:{type:String, unique:true,required: [true, "can't be blank"]}
}, { timestamps: true });

BusinessContactSchema.plugin(uniqueValidator, { message: 'is already taken.' });
module.exports = mongoose.model('BusinessContact', UserSchema);
