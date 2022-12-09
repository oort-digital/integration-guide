const { ethers, BigNumber } = require("ethers");
const { privateKey, rpc } = require('../secrets.json');
const poolAbi = require('../abi/collateral.json').abi;
const erc1155Abi = require('../abi/erc1155.json').abi;

const provider = new ethers.providers.JsonRpcProvider(rpc)

const wallet = new ethers.Wallet(privateKey, provider)

// mumbai collateral address
const poolAddress = '0xD6dE6Ca4dcc9Bf3e8BbC4130725A7D795B40c812'
const poolContract = new ethers.Contract(poolAddress, poolAbi, wallet)

// some NFT contract address, that you want to add to rent pool
const erc1155Address = '0x4F58CF0FE470562C8738323BA927E6c2EBed1CD0'
const erc1155Contract = new ethers.Contract(erc1155Address, erc1155Abi, wallet)

const asset = {
    contractAddress: erc1155Address,
    // 0 - ERC 721, 1 - ERC 1155
    assetType: 1,
    projectName: 'Test Asset'
}

const pricePerHour = 1 // 1 DAI
const durationHours = 2 // 2 hours
const earningGoal = `${pricePerHour * durationHours}`
const collateral = '20'

const assetItem = {
    name: 'Test asset item',
    earningGoal: ethers.utils.parseUnits(earningGoal, 18).toString(),
    durationHours: BigNumber.from(durationHours).toString(),
    initialWorth: ethers.utils.parseUnits(collateral, 18).toString(),
    currency: 1 // DAI = 1, USDC = 2, OORT = 3
}

const tokenId = BigNumber.from(1)
const amount = 5

const main = async () => {

    // check if need approve
    if(!await erc1155Contract.isApprovedForAll(wallet.address, poolAddress)) {
        // set approve to pool
        const approveTransaction = await erc1155Contract.setApprovalForAll(poolAddress, true);
        console.log(`Approve in process. ${approveTransaction.hash}`)
        await approveTransaction.wait();
    }
    
    const tx = await poolContract.setLendSettings(asset, [tokenId], [amount], [assetItem])

    console.log(`Transaction in process. ${tx.hash}`)
    await tx.wait()
    console.log(`Transaction success. ${tx.hash}`)
}

main()