"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
    }
}
Block.calBlockHash = (index, previousHash, timestamp, data) => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
};
Block.validStructure = (selectedBlock) => (typeof selectedBlock.index === "number" &&
    typeof selectedBlock.hash === "string" &&
    typeof selectedBlock.previousHash === "string" &&
    typeof selectedBlock.timestamp === "number" &&
    typeof selectedBlock.data === "string");
const genesisBlock = new Block(0, "202020202", "", "hi", 123456);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLastBlock = () => blockchain[blockchain.length - 1];
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const createBlock = (data) => {
    const previousBlock = getLastBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimestamp();
    const newHash = Block.calBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getBlockHash = (selectedBlock) => Block.calBlockHash(selectedBlock.index, selectedBlock.previousHash, selectedBlock.timestamp, selectedBlock.data);
const blockValidation = (candidateBlock, previousBlock) => {
    if (!Block.validStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getBlockHash(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (blockValidation(candidateBlock, getLastBlock())) {
        blockchain.push(candidateBlock);
    }
};
createBlock("secondBlock");
createBlock("thirdBlock");
createBlock("fourthBlock");
console.log(blockchain);
//# sourceMappingURL=index.js.map