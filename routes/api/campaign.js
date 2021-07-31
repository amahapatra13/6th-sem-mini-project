const express = require("express");
const router = express.Router();

const Campaign = require('../../models/campaign');
const User = require('../../models/User')
const bcrypt = require('bcryptjs')


//@route GET api/get
//desc get all campaigns
//@access public

router.get('/campaigns', async(req,res) => {

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
router.put('/addcampaign',
    [
        auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty(),
            check('requiredAmount', 'An amount is required').not().iSEmpty()
        ]
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array()})
        }

        const { name, description, requiredAmount} = req.body;
        const userId = req.user.id;
        newCampaign = new Campaign({
            userId,name,description,requiredAmount
        })
        let id;
        try{
            await newCampaign.save((err,room) => {
                id = room.id;
            })
            const user = await User.findOne({user : req.user.id});

            user.campaign.unshift(id)
            

        }catch(err){
            console.log(err.message)
            res.status(400).json('Invalid credentials')
        }
})
