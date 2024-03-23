let express = require("express");
const con = require("../config/dbConnection");
const router = express.Router();
const { signupvalidation, loginvalidation } = require("../helpers/validation");

const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// const { menuvalidation } = require("../helpers/validation");


const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images'); // directory where files will be stored
  },
  filename: function (req, file, cb) {
    // generate unique file name
    cb(null, `image-${Date.now()}.${file.originalname}`)
  }
});

const isImage = (req,file,callback)=>{
  if(file.mimetype.startsWith("image")){
    callback(null,true)
  }
  else{
    callback(null,Error("only image is allowed"))
  }
}

const upload = multer({
  storage:storage,
  fileFilter:isImage
})





// const { signupcustomer,login } = require("../controllers/userController");
const menuController = require("../controllers/menuController");
// const loginController = require("../controllers/loginController");
const userController = require("../controllers/userController");
//  const customerController= require("../controllers/customerController");
const catererController = require("../controllers/catererController");
const adminController = require("../controllers/adminController");
const login = require("../controllers/login");
const forgetpassword = require("../controllers/forgetpassword");
const Forget = require("../controllers/Forget");
const catererdetailes = require("../controllers/admin/catererdetailes");
const customerdetailes = require("../controllers/admin/customerdetailes");
const profile = require("../controllers/Profile/profile");

// const {menuvalidation} = require("../helpers/validation");






//post

router.post("/login", loginvalidation, userController.login);
router.post("/signupcustomer", signupvalidation, userController.signupcustomer);
router.post("/signupcaterer", signupvalidation, catererController.signupcaterer);
router.post("/signupadmin", signupvalidation, adminController.signupadmin);
// router.post("/signupcustomer",signupvalidation,customerController.signupcustomer);
// router.post("/login",loginvalidation,login.login);
router.post("/forgetpassword", Forget.forgetpassword);
router.get("/catererdetailes", catererdetailes.getCatererDetail);
router.get("/customerdetailes", customerdetailes.getCustomerDetail);


  // caterermenu
router.post("/menu", upload.single("picture"), menuController.menu);
router.get("/getmenu",menuController.getmenu);
router.delete("/deletemenu/:id",menuController.deletemenu);
router.put("/updatemenu/:id",upload.single("picture"),menuController.updatemenu);
router.get("/getmenu1/:id",menuController.getmenu1);


router.delete("/deletecustomer/:id", customerdetailes.deletecustomer);
router.delete("/deletecaterer/:id", catererdetailes.deletecaterer)
router.put('/updateprofile', profile.updateDetailes)
router.put('/updatecatererprofile', profile.updateCatererDetailes)

module.exports = router;