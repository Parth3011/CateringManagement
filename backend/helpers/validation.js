const {check} = require("express-validator");

exports.signupvalidation = [
    check('uname','Name is required').not().isEmpty(),
    check('email','Please enter a valid mail').isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('pwd','Password is required').isLength({min:5})
]



exports.menuvalidation = [
    check('image').custom((value,{req}) => {

        if(req.file.mimetype == 'image/jpeg'|| req.file.mimetype == 'image/png'){
            return true;
        }
        else{
            return false;
        }

    }).withMessage("Please upload an image type PNG, JPG")
]


exports.loginvalidation = [
    check('email','Please enter a valid mail').isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('pass','Password minimum 5 length').isLength({min:5})
]

