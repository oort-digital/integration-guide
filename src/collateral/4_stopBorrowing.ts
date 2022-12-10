import { ethers, BigNumber } from "ethers"
import { collateralPollAddress } from "../addresses";
import { Collateral__factory, Erc1155__factory, Erc20__factory } from "../generated";
import { borrowerWallet, lenderWallet } from "../wallets";

// mumbai collateral address
const poolContract = Collateral__factory.connect(collateralPollAddress, lenderWallet)

// some NFT contract address, that you want to add to rent pool
const erc1155Address = '0x4F58CF0FE470562C8738323BA927E6c2EBed1CD0'
const erc1155Contract = Erc1155__factory.connect(erc1155Address, lenderWallet)

const daiAddress = '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F'
const daiContract = Erc20__factory.connect(daiAddress, lenderWallet)

const asset = {
    contractAddress: erc1155Address,
    // 0 - ERC 721, 1 - ERC 1155
    assetType: 1,
    projectName: 'Test Asset'
}

const pricePerHour = 1 // 1 DAI
const durationHours = 2 // 2 hours
const earningGoal = ethers.utils.parseUnits(`${pricePerHour * durationHours}`, 18) // 2 DAI
const collateral = ethers.utils.parseUnits('20', 18) // 20 DAI

const assetItem = {
    name: 'Test asset item',
    earningGoal: earningGoal.toString(),
    durationHours: BigNumber.from(durationHours).toString(),
    initialWorth: collateral.toString(),
    currency: 1 // DAI = 1, USDC = 2, OORT = 3
}

const tokenId = BigNumber.from(1)
const amount = 5

const main = async () => {

    // lender - add his asset to rent pool

    // check if need erc1155 approve
    if(!await erc1155Contract.isApprovedForAll(lenderWallet.address, collateralPollAddress)) {
        // set approve to pool
        const approveTransaction = await erc1155Contract.setApprovalForAll(collateralPollAddress, true);
        console.log(`Approve in process. ${approveTransaction.hash}`)
        await approveTransaction.wait();
    }
    
    let tx = await poolContract.setLendSettings(asset, [tokenId], [amount], [assetItem])

    console.log(`SetLendSettings in process. ${tx.hash}`)
    await tx.wait()
    console.log(`SetLendSettings success. ${tx.hash}`)

    // borrower - rent asset

    // give DAI approvement for poolContracts to get collateral and earningGoal
    const approveAmount = collateral.add(earningGoal);
    tx = await daiContract.connect(borrowerWallet).approve(collateralPollAddress, approveAmount)
    console.log(`DAI approve in process. ${tx.hash}`)
    await tx.wait()
    console.log(`DAI approve success. ${tx.hash}`)

    tx = await poolContract.connect(borrowerWallet).startBorrowing(lenderWallet.address, erc1155Address, tokenId)

    console.log(`StartBorrowing in process. ${tx.hash}`)
    await tx.wait()
    console.log(`StartBorrowing success. ${tx.hash}`)

    // borrower - stop rent

    tx = await poolContract.connect(borrowerWallet).stopBorrowing(lenderWallet.address, erc1155Address, tokenId)
    console.log(`StopBorrowing in process. ${tx.hash}`)
    await tx.wait()
    console.log(`StopBorrowing success. ${tx.hash}`)
}

main()