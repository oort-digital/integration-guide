const { ethers } = require("ethers");
const { privateKey, rpc } = require('../secrets.json');
const { abi } = require('../abi/collateral.json');

const provider = new ethers.providers.JsonRpcProvider(rpc)

const wallet = new ethers.Wallet(privateKey, provider)

const contract = new ethers.Contract('0x1475880E1a9C3fb741698Cd448f67dE8eD210F3F', abi, wallet)

const asset = {
    // some NFT contract address, that you want to add to rent pool
    contractAddress: '0x3063F204BeA3B55A688a5043299F57d0cBcDac0B',
    // 0 - ERC 721, 1 - ERC 1155
    assetType: 1,
    projectName: 'Test Asset'
}

const pricePerHour = 1 // 1 DAI
const durationHours = 2 // 2 hours

const assetItem = {
    name: 'Test asset item',
    earningGoal: ethers.utils.parseUnits(pricePerHour * durationHours, 18),
    durationHours: durationHours,
    currency: 1 //  DAI = 1, USDC = 2, OORT = 3
}

const tokenId = 1
const amount = 5

const main = async () => {

    const tx = await contract.setLendSettings(asset, [tokenId], [amount], [assetItem])

    console.log(`Transaction in process. ${tx.hash}`)
    await tx.wait()
    console.log(`Transaction success. ${tx.hash}`)
}

main()