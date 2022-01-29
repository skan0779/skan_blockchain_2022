import * as CryptoJS from "crypto-js";

class Block{
    public index:number;
    public hash:string;
    public previousHash:string;
    public data:string;
    public timestamp:number;

    static calBlockHash = (
        index:number, 
        previousHash:string, 
        timestamp:number, 
        data:string
        ):string =>{
            return CryptoJS.SHA256(index + previousHash + timestamp + data).toString()
        }
    
    static validStructure = (selectedBlock:Block):boolean => (
        typeof selectedBlock.index === "number" &&
        typeof selectedBlock.hash === "string" &&
        typeof selectedBlock.previousHash === "string" &&
        typeof selectedBlock.timestamp === "number" &&
        typeof selectedBlock.data === "string"
    )

    constructor(
        index:number,
        hash:string,
        previousHash:string,
        data:string,
        timestamp:number
        ){
            this.index=index;
            this.hash=hash;
            this.previousHash=previousHash;
            this.timestamp=timestamp;
            this.data=data;
        }
}

const genesisBlock:Block = new Block(0,"202020202","","hi",123456)

let blockchain:Block[] = [genesisBlock]

const getBlockchain = ():Block[] => blockchain
const getLastBlock = ():Block => blockchain[blockchain.length - 1]
const getNewTimestamp = ():number => Math.round(new Date().getTime()/1000)
const createBlock = (data:string):Block => {
    const previousBlock:Block = getLastBlock();
    const newIndex:number = previousBlock.index + 1
    const newTimestamp:number = getNewTimestamp()
    const newHash:string = Block.calBlockHash(newIndex, previousBlock.hash, newTimestamp, data) 
    const newBlock:Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp)

    addBlock(newBlock)

    return newBlock
}

const getBlockHash = (selectedBlock:Block):string => Block.calBlockHash(selectedBlock.index, selectedBlock.previousHash, selectedBlock.timestamp, selectedBlock.data)
const blockValidation = (candidateBlock:Block, previousBlock:Block):boolean =>{
    if (!Block.validStructure(candidateBlock)){
        return false
    } else if (previousBlock.index +1 !== candidateBlock.index){
        return false
    } else if (previousBlock.hash !== candidateBlock.previousHash){
        return false
    } else if (getBlockHash(candidateBlock) !== candidateBlock.hash){
        return false
    } else {
        return true
    }
}

const addBlock = (candidateBlock:Block):void => {
    if (blockValidation(candidateBlock, getLastBlock())){
        blockchain.push(candidateBlock)
    }
}


createBlock("secondBlock")
createBlock("thirdBlock")
createBlock("fourthBlock")

console.log(blockchain)

export {};

