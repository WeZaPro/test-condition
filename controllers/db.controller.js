const {
  databaseSchema,
  productSchema,
  itemSchema,
} = require("../models/dbSchema.model");
const User = require("../models/user.model");
const connectionAddDb = require("../connection/connections");

// Save Addition DB
exports.createAdditionalDB = async (req, res) => {
  // Create Connection
  const ADDdb1 = connectionAddDb.CreateConnectAddDB(
    req.body.Addition_DB,
    req.body.Addition_Collection1,
    databaseSchema
  );

  const _DB1 = await ADDdb1.create({
    log: req.body.log,
  });

  return res.send(_DB1);
};

//------------------------->>>>> STEP1
// Main DB
exports.createMainUser = async (req, res) => {
  // Create Connection
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    dbAddress: req.body.dbAddress,
  });
  user.save((err, user) => {
    try {
      if (err) {
        res.send(err);
      } else {
        console.log("successed... ", user);
        res.send(user);
      }
    } catch (err) {
      res.send(err);
    }
  });
};

//------------------------->>>>> STEP2
// Addition DB
exports.createCompany = async (req, res) => {
  // Find User -> get dbAddress

  //--------------
  const insertData = req.body.insert;
  const db = await User.find().then((data) => {
    data.forEach((result) => {
      //console.log("result.dbAddress---> ", result.dbAddress);
      getDataFromAddress(result.dbAddress, insertData);

      //console.log("result.dbAddress--->[0] ", result.dbAddress);
      return;
    });
    //res.send("successed....");
    for (let i = 0; i < data.length; i++) {
      console.log(`data ${i}`, data[i].dbAddress);
    }

    res.send(data);
  });
};

async function getDataFromAddress(databaseAddress, inputValue) {
  //console.log("------------->", message);
  const ADDdb1 = connectionAddDb.CreateConnectAddDB(
    databaseAddress,
    "products",
    productSchema
  );
  const _DB1 = await ADDdb1.find({}).then((data) => {
    //console.log("inputValue-----------> ", inputValue);
    data.forEach((result) => {
      //console.log("result.values-----------> ", result.values);

      // เดี๋ยวเอามาคำนวณ**********
      return result;
    });
  });
}
//
//
//------------------------->>>>> STEP

// Create Collection / Additional DB
exports.createCollectionProduct = async (req, res) => {
  // Create Connection
  console.log("req.body---> ", req.body);
  const ADDdb1 = connectionAddDb.CreateConnectAddDB(
    req.body.Addition_DB,
    req.body.collection,
    productSchema
  );

  const _DB1 = await ADDdb1.create({
    values: req.body.values,
  });

  return res.send(_DB1);
};

exports.createCollectionItem = async (req, res) => {
  // Create Connection
  console.log("req.body---> ", req.body);
  const ADDdb1 = connectionAddDb.CreateConnectAddDB(
    req.body.Addition_DB,
    req.body.collection,
    itemSchema
  );

  const _DB1 = await ADDdb1.create({
    values: req.body.values,
  });

  return res.send(_DB1);
};

// insert ค่าแล้วเอาไคำนวนทั้ง 2 item แล้วแสดงค่าออกมาของแต่ละ item
exports.estimateItem = async (req, res) => {
  console.log("req.body---> ", req.body);
  //1 รับค่าเข้ามา ทดสอบรับ 1 ค่า
  const getValue = req.body.value;
  //2 connect Addition DB --> find value จาก item1
  const ADDdb1 = connectionAddDb.CreateConnectAddDB(
    req.body.Addition_DB,
    req.body.collection_product,
    productSchema
  );
  const product_value = await ADDdb1.find({});
  console.log("Value product_value--> ", product_value[0].values);

  //3 connect Addition DB --> find value จาก item2
  const ADDdb2 = connectionAddDb.CreateConnectAddDB(
    req.body.Addition_DB, // ต้องทำวนloop เช็คทุกบริษัท หรือ DB -> ทำ DB list บริษัท เพื่อเอามาวน loop
    req.body.collection_item,
    itemSchema
  );
  const item_value = await ADDdb2.find({});
  console.log("Value item_value--> ", item_value);

  //res.send("data");
  res.json({
    companyA: product_value[0].values + parseInt(getValue),
    companyB: item_value[0].values + parseInt(getValue),
  });
};

// Main DB -> Create List Schema
exports.saveListDbAddress = async (req, res) => {};
// Main DB -> Create List Schema
exports.findAndLoopData = async (req, res) => {};
