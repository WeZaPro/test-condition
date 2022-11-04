const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const databaseSchema = new Schema({
  log: String,
});

const itemSchema = new Schema({
  values: Number,
});

const productSchema = new Schema({
  values: Number,
});

exports.productSchema = productSchema;
exports.itemSchema = itemSchema;
exports.databaseSchema = databaseSchema;
