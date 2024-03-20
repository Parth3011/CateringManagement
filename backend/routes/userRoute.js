let express = require("express");
const router = express.Router();
const {signupvalidation,loginvalidation} = require("../helpers/validation");

const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// const {menuvalidation} = require("../helpers/validation");
// const path = require('path');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination:function(req,file,callback){
//         callback(null,path.join(__dirname,'../public/images'));
//     },
//     filename:function(req,file,callback){
//         const name = Date.now()+"-"+file.originalname;
//         callback(null,name);
//     }
// });

// const filefilter = (req,file,callback)=>{
//     (file.mimetype=="image/jpeg"|| "image/png")?callback(null,true):callback(null,false);
// }

// const upload = multer ({
//     storage:storage,
//     fileFilter:filefilter
// });






// const { signupcustomer,login } = require("../controllers/userController");
// const menuController = require("../controllers/menuController");
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








            //post

router.post("/login",loginvalidation,userController.login);
router.post("/signupcustomer",signupvalidation,userController.signupcustomer);
router.post("/signupcaterer",signupvalidation,catererController.signupcaterer);
router.post("/signupadmin",signupvalidation,adminController.signupadmin);
// router.post("/signupcustomer",signupvalidation,customerController.signupcustomer);
// router.post("/login",loginvalidation,login.login);
router.post("/forgetpassword", Forget.forgetpassword);
router.get("/catererdetailes", catererdetailes.getCatererDetail);
router.get("/customerdetailes",customerdetailes.getCustomerDetail);

// router.post("/menu",upload.single('picture'),menuvalidation,menuController.menu);


router.delete("/deletecustomer/:id",customerdetailes.deletecustomer);
router.delete("/deletecaterer/:id",catererdetailes.deletecaterer)
router.put('/updateprofile', profile.updateDetailes)
router.put('/updatecatererprofile', profile.updateCatererDetailes)

module.exports = router;