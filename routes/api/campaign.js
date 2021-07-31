const express = require("express");
const router = express.Router();

const Campaign = require('../../models/campaign');
const jwt = require("jsonwebtoken");


//@route GET api/get
//desc get all campaigns
//@access public

router.get('/campaigns', async(req,res) => {
    
})