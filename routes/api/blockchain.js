const express= require('express')
const route = express.Router()
const User  = require('../../models/User')


//Block chain class----------------------------------------------------------
const SHA256 = require('crypto-js/sha256');
const router = require('./auth');

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

    isChainValid() {
        for(let i=1;i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

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
        if(!user['valid']){
            return res.status(500).send('You are prohibited to make a transaction')
        }
        const chain = user['ledger'];
        const coin = new Blockchain(chain);
        const valid = coin.isChainValid()

        if(!valid) {
            return res.status(500).send('You are prohibited to make a tansaction');
        }

        const {sender, recipient, amount } = req.body;
        const data = {sender, recipient, amount};

        if(chain.length <= 0){
            coin.createGenesisBlock();
        }

        let index = coin.getLength();
        coin.addBlock(new Block( index, data ));

        console.log(coin['chain'])

        const users = await User.find();
        for(let i=0;i<users.length;i++){
            let temp = new Blockchain(users[i]['ledgers']);
            let check = temp.isChainValid();
            if(!check) {
                users[i]['valid'] = false;    
            }else{
                users[i]['ledger'] = coin['chain'];
                await users[i].save();
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
        res.status(200).send({ ledger : chain});
    }catch(err){
        console.log(err.message)
        res.status(400).send('server error')
    }

})

module.exports = router