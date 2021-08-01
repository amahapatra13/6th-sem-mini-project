const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator')
const Campaign = require('../../models/campaign');
const User = require('../../models/User')
const bcrypt = require('bcryptjs')


//@route GET api/get
//desc get all campaigns
//@access public

router.get('/', async(req,res) => {

    try{
        const campaigns = await Campaign.find();
        console.log(campaigns);
        return res.json(campaigns);
    }catch(err){
        console.log(err.message);
        res.status(400).send('Server error');
    }
});

//@route    put api/addcampaign
//desc      add a campaign   
//@access   public
router.post('/addcampaign',
    [
        auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty(),
            check('requiredAmount', 'An amount is required').not().isEmpty()
        ]
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array()})
        }

        const { name, description, requiredAmount} = req.body;
        const user = req.user.id;
        console.log(user);
        const newCampaign = new Campaign({
            user,name,description,requiredAmount
        })
        console.log(newCampaign)
        let id;
        try{

            const user1 = await User.findById(req.user.id);
            console.log(user1);
            if(user1){
                console.log(newCampaign.id)
                await newCampaign.save()
                user1.campaign.unshift(newCampaign.id)
                res.json({user : user1})
            }else{
                return res.status(400).send('error occurred')
            }

            


            
            

        }catch(err){
            console.log(err.message)
            res.status(400).json('Invalid credentials')
        }
})

module.exports = router;