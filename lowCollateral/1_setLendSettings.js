const { ethers } = require("ethers");
const {privateKey, infuraId} = require('../secrets.json');
const abi = require('../abi/collateral.json');

const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${infuraId}`)

const wallet = new ethers.Wallet(privateKey, provider)

const contract = new ethers.Contract('0x1475880E1a9C3fb741698Cd448f67dE8eD210F3F', abi, wallet)

const asset = {
    // some NFT contract address, that you want to add to rent pool
    contractAddress: '0x3063F204BeA3B55A688a5043299F57d0cBcDac0B',
    // 0 - ERC 721, 1 - ERC 1155
    assetType: 1,
    projectName: 'Test NFT'
}

const tokenId = 1
const amount = 5

const main = async () => {

    const tx = await contract.setLendSettings(asset, [tokenId], [amount], assetItems)

    await tx.wait()
    console.log(tx)
}

main()