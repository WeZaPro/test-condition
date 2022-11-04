const controller = require("../controllers/db.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // test-------------------

  // Add User / Main DB
  app.post("/addUserDB", controller.createMainUser);

  // Add DB Company / Addition DB
  app.post("/addCompanyDB", controller.createCompany);

  // Add item1
  app.post("/product", controller.createCollectionProduct);

  // Add item2
  app.post("/item", controller.createCollectionItem);

  // insert ค่าเข้าไแล้วให้ไคำนวนทั้ง 2 item แล้วแจ้งค่ากลับมาทั้ง 2 ตัว
  app.post("/calculate", controller.estimateItem);

  // Fid and loop item ( test get dbAddress to loop)
  // Main DB
  app.get("/loopListDbAddress", controller.findAndLoopData);
  app.post("/saveListDbAddress", controller.saveListDbAddress);
};
