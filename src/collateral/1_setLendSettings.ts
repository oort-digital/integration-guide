import { ethers, BigNumber } from "ethers"
import { collateralPollAddress, erc1155Address } from "../addresses";
import { Collateral__factory, Erc1155__factory } from "../generated";
import { lenderWallet } from "../wallets";


// mumbai collateral address

const poolContract = Collateral__factory.connect(collateralPollAddress, lenderWallet)

// some NFT contract address, that you want to add to rent pool

const erc1155Contract = Erc1155__factory.connect(erc1155Address, lenderWallet)

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

const tokenId = BigNumber.from(7)
const amount = 5

const main = async () => {

    // lender - add his asset to rent pool
    
    // check if need approve
    if(!await erc1155Contract.isApprovedForAll(lenderWallet.address, collateralPollAddress)) {
        // set approve to pool
        const approveTransaction = await erc1155Contract.setApprovalForAll(collateralPollAddress, true);
        console.log(`Approve in process. ${approveTransaction.hash}`)
        await approveTransaction.wait();
    }
    
    const tx = await poolContract.setLendSettings(asset, [tokenId], [amount], [assetItem])

    console.log(`setLendSettings in process. ${tx.hash}`)
    await tx.wait()
    console.log(`setLendSettings success. ${tx.hash}`)
}

main()