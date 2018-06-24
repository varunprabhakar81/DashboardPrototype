var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var titlize  = require('mongoose-title-case');
var validate = require('mongoose-validator')

var nameValidator = [
  validate({
    validator: 'matches',
    arguments: /^(([a-zA-Z]{3,30})+[ ]+([a-zA-Z]{3,30}))+$/,
    message: 'Name must be at least 3 character, max 30, no special characters or numbers, must have space in between first and last name'
  }),
  validate({
    validator: 'isLength',
    arguments: [3, 30],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var emailValidator = [
  validate({
    validator: 'isEmail',
    arguments: /^(([a-zA-Z]{3,30})+[ ]+([a-zA-Z]{3,30}))+$/,
    message: 'Is not a valid e-mail'
  }),
  validate({
    validator: 'isLength',
    arguments: [3, 40],
    message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];


var EmployeeSchema = new Schema({
  name: {type: String, required: true, validate: nameValidator},
  position: {type: String, required: true},
  email: {type: String, lowercase: true, required: true, unique: true, validate: emailValidator},
  hourlycost: {type: Number, required: true},
});

module.exports = mongoose.model('Employee', EmployeeSchema);


