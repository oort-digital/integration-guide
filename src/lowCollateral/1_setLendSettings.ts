import { ethers, BigNumber } from "ethers"
import { erc721Address, lowCollateralPollAddress } from "../addresses";
import { Erc721__factory, LowCollateral__factory } from "../generated";
import { lenderWallet } from "../wallets";

const poolContract = LowCollateral__factory.connect(lowCollateralPollAddress, lenderWallet)

// some NFT contract address, that you want to add to rent pool
const erc721Contract = Erc721__factory.connect(erc721Address, lenderWallet)

const asset = {
    contractAddress: erc721Address,
    // 0 - ERC 721, 1 - ERC 1155
    assetType: 0,
    projectName: 'Test Asset'
}

const pricePerHour = 1 // 1 DAI
const durationHours = 2 // 2 hours
const earningGoal = `${pricePerHour * durationHours}`

const assetItem = {
    name: 'Test asset item',
    earningGoal: ethers.utils.parseUnits(earningGoal, 18).toString(),
    durationHours: BigNumber.from(durationHours).toString(),
    currency: 1 // DAI = 1, USDC = 2, OORT = 3
}

const tokenId = BigNumber.from(7)
const amount = 5

const main = async () => {

    // lender - add his asset to rent pool
    
    // check if need approve
    const approvedAddress = await erc721Contract.getApproved(tokenId)
    if(!approvedAddress || approvedAddress.toLowerCase() === lenderWallet.address.toLowerCase()) {
        // set approve to pool
        const approveTransaction = await erc721Contract.approve(lowCollateralPollAddress, tokenId)
        console.log(`Approve in process. ${approveTransaction.hash}`)
        await approveTransaction.wait();
    }
    
    const tx = await poolContract.setLendSettings(asset, [tokenId], [amount], [assetItem])

    console.log(`setLendSettings in process. ${tx.hash}`)
    await tx.wait()
    console.log(`setLendSettings success. ${tx.hash}`)
}

main()