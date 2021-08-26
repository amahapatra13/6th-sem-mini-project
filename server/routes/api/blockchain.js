const express= require('express')
const router = express.Router()
const User  = require('../../models/User')
const auth = require('../../middleware/auth');


//Block chain class----------------------------------------------------------
const SHA256 = require('crypto-js/sha256');
// const router = require('./auth');

class Block {
        constructor(index, data, prevHash) {
        this.index = index;
        this.timestamp = Date.now;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}



class Blockchain {
    constructor(chain){
        this.chain = chain;
    }

    createGenesisBlock(){
        let response = new Block(0,"02/08/2021", "Genesis Block", "0");
        this.chain.push(response);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    getLength(){
        return this.chain.length;
    }

    // calculateHash(i) {
    //     return SHA256(this.chain[i].index + this.chain[i].prevHash + this.chain[i].timestamp + JSON.stringify(this.chain[i].data)).toString();
    // }

    isChainValid() {
        for(let i=1;i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            // if(currentBlock.hash !== this.calculateHash(i)){
            //     console.log(i, " currentblock hash : ",currentBlock.hash, " calculate ", this.calculateHash(i))
            //     return false;
            // }
            if(currentBlock.prevHash !== previousBlock.hash){
                return false;
            }
            return true;
        }
    }
}

//-------------------------------------------------------------------------------------

//@route    post /blockchain
//desc      add a block to blockchain  
//@access   public
router.post('/', auth, async(req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        // console.log(user)
        // console.log(user['valid'])
        if(!user['valid']){
            return res.status(500).send('You are prohibited to make a transaction')
        }
        const chain = user['ledger'];
        // console.log(chain)
        const coin = new Blockchain(chain);
        // console.log("coin", coin)
        if(chain.length <= 0){
            coin.createGenesisBlock();
        } 
        const valid = coin.isChainValid()
        console.log(valid)
        if(!valid) {
            return res.status(500).send('You are prohibited to make a tansaction');
        }
        const {sender, recipient, amount } = req.body;
        const data = {sender, recipient, amount};



        let index = coin.getLength();
        console.log(index)
        coin.addBlock(new Block( index, data ));

        // console.log(coin['chain'])
        console.log("chain", coin.chain)
        const users = await User.find();
        console.log("length", users.length)
        for(let i=0;i<users.length;i++){
            console.log("user ledger", users[i].ledger);
            let temp = new Blockchain(coin.chain);
            // console.log("temp" , temp)
            let check = temp.isChainValid();
            console.log("check",check)
            if(!check) {
                users[i]['valid'] = false;
                await users[i].save();
                return res.status(500).send('You are prohibited to make a tansaction');    
            }else{
                // console.log("coin chain", coin.chain)
                users[i].ledger = coin.chain;
                // console.log("user leadger", users[i].ledger)
                await users[i].save();
                return res.status(200).send("Successfull entry")
            }
        }
        const user1 = await User.find();
        res.json(user1)
    }catch(err){
        console.log(err.message)
        res.status(400).send("server error")
    }
});

router.get('/showtransaction',auth, async(req,res) => {

    try{
        const user = await User.findById(req.user.id);
        const chain = user['ledger'];
        const coin = new Blockchain(chain);
        const valid = coin.isChainValid();
        if(!valid){
            return res.status(500).send('You are prohibited to use the platform')
        }
        
        res.status(200).send({ user : user});
    }catch(err){
        console.log(err.message)
        res.status(400).send('server error')
    }

})

module.exports = router