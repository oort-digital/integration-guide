// Preparation
// 1. go to https://rent-test.oort.digital
// 2. As lender - you must own NFT with address=erc1155Address and tokenId=erc1155TokenId
// 3. As lender - add this NFT to rent pool
// 4. As borrower - borrow this nft
// 5. Wait until rent time is up
// 6. do this example

import { collateralPollAddress, erc1155Address, erc1155TokenId } from "../addresses";
import { Collateral__factory } from "../generated";
import { lenderWallet } from "../wallets";

// mumbai collateral address
const poolContract = Collateral__factory.connect(collateralPollAddress, lenderWallet)

const main = async () => {

    const nftForLend = await poolContract.lentNFTList(erc1155Address, erc1155TokenId, lenderWallet.address)
    const lendingData = nftForLend.lendingData
    const borrowedAtTimestamp = lendingData.borrowedAtTimestamp.toNumber() * 1000
    if(borrowedAtTimestamp === 0) {
        throw new Error(`Token was not borrowed. TokenAddress: ${erc1155Address} TokenId: ${erc1155TokenId.toString()}`)
    }

    const borrowedAt = new Date(borrowedAtTimestamp)

    const timeLeftMin = (Date.now() - borrowedAtTimestamp) / 60000
    const durationMin = lendingData.durationHours.toNumber() * 60

    console.log('BorrowedAt: ', borrowedAt)
    console.log('TimeLeftMin: ', Math.round(timeLeftMin))
    console.log('DurationMin: ', durationMin)

    if(timeLeftMin <= durationMin) {
        console.warn("You can claim collateral when lending time is up")
        console.warn(`Wait ${Math.round(durationMin - timeLeftMin)} min and repeat`)
        return 
    }

    const tx = await poolContract.claimBorrowerCollateral(erc1155Address, erc1155TokenId)
    console.log(`ClaimBorrowerCollateral in process. ${tx.hash}`)
    await tx.wait()
    console.log(`ClaimBorrowerCollateral success. ${tx.hash}`)
}

main()