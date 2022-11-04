const mongoose = require("mongoose");

function CreateConnectAddDB(uri, collection, addDbSchema) {
  const db = mongoose.createConnection(uri);
  const AddDB = db.model(collection, addDbSchema);
  return AddDB;
}

exports.CreateConnectAddDB = CreateConnectAddDB;
