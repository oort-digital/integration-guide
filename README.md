# Integration guide
This repository has different examples of using the Oort Rent solution.<br/>
All examples use the [Mumbai](https://mumbai.polygonscan.com) test network.


## How to run examples

### Install packages
```
npm i
```
or</br>
```
yarn install
```

### Edit secrets.ts
Fill [secrets.ts](src/secrets.json) 

**rpc** - fill in any Mumbai RPC URL. You may use [INFURA](https://www.infura.io) or some [free RPC](https://chainlist.org/chain/80001)<br/>
**menomic** - seed phrase.<br/>

### Prepare wallets
Use [Metamask](https://metamask.io/) or other wallets to generate two accounts from the seed phrase.<br/>

1) Lender account.  
This wallet must own some ERC721 and ERC1155 NFTs, to provide them for rent.  
You can see lender NFTs here (https://rent-test.oort.digital/lend/my-nfts)

2) Borrower account.  
This wallet must have enought DAI to pay for NFT rent.<br/>
For example, we use [test DAI token](https://mumbai.polygonscan.com/address/0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F)  
To get it - go by [link](https://mumbai.polygonscan.com/address/0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F#writeContract), connect the borrower wallet and execute the **mint** method


### Run example
Chose file with an example (see use cases below) and run it, like this one<br/>
```
yarn ts-node .\src\collateral\1_addAndRemoveFromLendPool.ts
```

### Collateral use cases
1. [Lender add and remove ERC1155 asset from rent pool](src/collateral/1_addAndRemoveFromLendPool.ts)
2. [Borrower starts and stop rent](src/collateral/2_startAndStopBorrowing.ts)
3. [Claim borrower collateral](src/collateral/3_claimBorrowerCollateral.ts)

### Low collateral use cases
1. [Lender add and remove ERC721 asset from rent pool](src/lowCollateral/1_addAndRemoveFromLendPool.ts)
2. [Borrower starts and stop rent](src/lowCollateral/2_startAndStopBorrowing.ts)
