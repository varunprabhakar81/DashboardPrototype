var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');

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

var termsSchema = new Schema({
  name: {type: String, required: true},
  days: { type: Number, required: true}
});

var invoiceSchema = new Schema({
  amountdue: { type: Number, required: true}, 
  amountpaid: { type: Number, required: true},
  amountremaining: { type: Number, required: true},
  aracct: { type: Schema.Types.ObjectId, ref: 'GLAccount', required: true},
  billingemail: {type: String, lowercase: true, required: true, validate: emailValidator},
  office: { type: Schema.Types.ObjectId, ref: 'Office', lowercase: true, required: true},
  invoicedate: { type: Date, lowercase: true, required: true},
  invoiceduedate: { type: Date, lowercase: true, required: true},
  invoiceterms: termsSchema,
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true},
  postingperiod: { type: Schema.Types.ObjectId, ref: 'PostingPeriod', required: true},
  lines: [{ type: Schema.Types.ObjectId, ref: 'InvoiceLine'}],
  invoicetotal:{ type: Number, required: true}
});


module.exports = mongoose.model('Invoice', invoiceSchema);

