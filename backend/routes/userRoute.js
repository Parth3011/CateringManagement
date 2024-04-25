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



  // Checking purpose

// const login = require("../controllers/login");
//  const customerController= require("../controllers/customerController");
// const loginController = require("../controllers/loginController");
// const forgetpassword = require("../controllers/forgetpassword");

// normally

// const { signupcustomer,login } = require("../controllers/userController");
// const {menuvalidation} = require("../helpers/validation");

// IMP

const menuController = require("../controllers/menuController");
const userController = require("../controllers/userController");
const catererController = require("../controllers/catererController");
const adminController = require("../controllers/adminController");
const Forget = require("../controllers/Forget");
const catererdetailes = require("../controllers/admin/catererdetailes");
const customerdetailes = require("../controllers/admin/customerdetailes");
const profile = require("../controllers/Profile/profile");







// customermenus
const { getcustomermenu } = require("../controllers/customer/Firstpage");
const { getcatererinfo, getmenusdetails } = require("../controllers/customer/Secondpage");
const { event } = require("../controllers/customer/ThirdPage");
const { order } = require("../controllers/customer/Fourpage");
const { orderdetails } = require("../controllers/customer/Fifthpage");
const { acceptOrder, rejectOrder } = require("../controllers/Caterer/OrderStatus");
const { StatusOrder } = require("../controllers/customer/StatusOrder");
const { payment, paymentsuccess } = require("../controllers/customer/Paymentdummy");
const { getPaymentStatus } = require("../controllers/Caterer/PaymentStatus");
const { orderrequest } = require("../controllers/customer/OrderRequest");



// checking purpose

// router.post("/signupcustomer",signupvalidation,customerController.signupcustomer);
// router.post("/login",login.login);

//post

router.post("/login", loginvalidation, userController.login);
router.post("/signupcustomer", signupvalidation, userController.signupcustomer);
router.post("/signupcaterer", signupvalidation, catererController.signupcaterer);
router.post("/signupadmin", signupvalidation, adminController.signupadmin);


// router.post("/verifypassword", Forget.verifyPasswordReset);
router.get("/resetpassword", Forget.resetpassword);


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


  // customermenu first page
  router.get("/getcustomermenu",getcustomermenu);
  // customermenu second page
  router.get('/getcatererinfo/:caterer_id',getcatererinfo);
  router.get('/getmenusdetails/:caterer_id',getmenusdetails);

  //customer ThirdPage
  router.post('/events',event);
  router.post('/order',order);

  router.get("/orders/:orderId",orderdetails);
  router.get("/order/:orderId/status",StatusOrder);

  // accept/reject
  router.get('/orders',orderrequest);
  router.post('/order/:orderId/accept', acceptOrder);
  router.post('/order/:orderId/reject', rejectOrder);

  //payment
  router.post('/payment',payment);
  router.post('/payment/success',paymentsuccess);

  router.get('/order/:orderId/payment',getPaymentStatus);



module.exports = router;