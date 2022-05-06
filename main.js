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
}
