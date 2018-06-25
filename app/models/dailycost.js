var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');


var dailycostSchema = new Schema({
 // date: { type: Date, lowercase: true, required: true},
  date: { type: String, lowercase: true, required: true, unique: true},
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee'}],
  laborcost:{ type: Number, required: true},
  materialcost:{ type: Number, required: true},
  totalcost:{ type: Number, required: true}
});


module.exports = mongoose.model('DailyCost', dailycostSchema);

