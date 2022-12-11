import { ethers, BigNumber } from "ethers"
import { collateralPollAddress, daiAddress, erc1155Address } from "../addresses";
import { Collateral__factory, Erc1155__factory, Erc20__factory } from "../generated";
import { borrowerWallet, lenderWallet } from "../wallets";

// mumbai collateral address
const poolContract = Collateral__factory.connect(collateralPollAddress, lenderWallet)

// some NFT contract address, that you want to add to rent pool
const erc1155Contract = Erc1155__factory.connect(erc1155Address, lenderWallet)

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

    const nftForLend = await poolContract.lentNFTList(erc1155Address, tokenId, lenderWallet.address)
    const borrowedAtTimestamp = nftForLend.lendingData.borrowedAtTimestamp.toNumber()
    if(borrowedAtTimestamp === 0) {
        throw new Error('Token not found')
        // return
    }

    //console.log('BorrowedAt: ', borrowedAt)

    //poolContract.claimBorrowerCollateral()
}

main()