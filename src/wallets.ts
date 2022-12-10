import { ethers, utils, Wallet } from "ethers";
import { mnemonic, rpc } from "./secrets";

const provider = new ethers.providers.JsonRpcProvider(rpc)

const hdNode = utils.HDNode.fromMnemonic(mnemonic);

const lenderWallet = new Wallet(hdNode.derivePath(`m/44'/60'/0'/0/0`), provider)
const borrowerWallet = new Wallet(hdNode.derivePath(`m/44'/60'/0'/0/1`), provider)


console.log('lender: ', lenderWallet.address)
console.log('borrower: ', borrowerWallet.address)

export { lenderWallet, borrowerWallet }