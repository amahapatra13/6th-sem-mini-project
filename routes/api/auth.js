const express = require("express")
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User')
const jwt = require("jsonwebtoken");
const config = require('config')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')


//@route    GET api/auth
//@desc     Test route
//@access   Public 
router.get('/',auth, async(req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.log(err.message)
        res.status(400).send("server error")
    }
})

//@route    POST api/auth
//@desc     Authenticate user
//@access   Public 
router.post('/',[
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
] ,async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body

    try{
    //check user email is there or not
        let user = await User.findOne({ email });
        if(!user) {
           return  res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }

    //authentication
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return  res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }

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
