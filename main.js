// library of crypto standards
const sha256 = require('crypto-js/sha256');
// each block has to have a timestamp,data, and a hash
class Block{
    constructor(timestamp,data,previousHash =""){
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();

    }
    calculateHash(){
        return sha256(this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}

// blockchain class that gets the latest block, makes the first block of the chain
// and can add a new block
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    // returns: the beginning block
    createGenesisBlock(){
        return new Block("04/01/2022", "Genesis Block", "0");
    }
    // returns: the latest block
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    // adds a new block to the chain
    // returns: void
    addNewBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    // checks if the chain is valid
    isValidChain(){
        for(let i = 1; i < this.chain.length;i++){
            var currBlock = this.chain[i];
            var prevBlock = this.chain[i-1];
            // making sure the hash of the previous block is the same as the previous hash of the current block
            if (currBlock.previousHash !== prevBlock.hash){
                return false;
            }
            // making sure the hash is equal
            if(currBlock.hash !== currBlock.calculateHash()){
                return false;
            }
        }
        return true;
    }
}

let vanCoin = new Blockchain();
vanCoin.addNewBlock(new Block("05/05/2022",{amount:50}));
vanCoin.addNewBlock(new Block("05/06/2022",{amount:500}));

console.log(JSON.stringify(vanCoin, null, 5))
console.log(vanCoin.isValidChain());
