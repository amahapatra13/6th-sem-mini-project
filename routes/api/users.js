const express = require("express")
const router = express.Router();
const {check, validationResult} = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const User = require('../../models/User')
const config = require('config')


//@route    POST api/users
//@desc     Register user
//@access   Public 
router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({ min:6 })
] ,async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {name, email, password} = req.body

    try{
    //check unique user or not
        let user = await User.findOne({ email });
        if(user) {
           return  res.status(400).json({ errors: [{ msg: "user already exists" }] });
        }
    //get user gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

    user = new User({
        name,
        email,
        password,
        avatar
    });
    //Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        const chain = await User.find()[0];
        user.ledger = chain['ledger'];
        await user.save();
    //return json web token
        const payload = {
            user : {
                id : user.id
            }
        }
        jwt.sign(
            payload, 
            config.get('jwtsecret'),
            { expiresIn : 3600000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token })
            }
        );
    }

    catch(err){
        console.log(err.message)
        res.status(500).send("server error")
    }
})

module.exports = router;