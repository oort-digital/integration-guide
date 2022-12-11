# integration-guide
This repository have a differet examples of using Oort Rent solution.<br/>
All examples use [Mumbai](https://mumbai.polygonscan.com) test network.



## How to run exmaples

### Install packages
```
npm i
```
or</br>
```
yarn install
```

### Edit secrets.ts
Fill [secrets.ts](src/secrets.ts) 

**rpc** - fill any mumbai rpc url. You may use [INFURA](https://www.infura.io) or some [free rpc](https://chainlist.org/chain/80001)<br/>
**menomic** - seed phrase.<br/>

### Prepare wallets
Use [Metamask](https://metamask.io/) or other wallet to generate two accounts from seed phares.<br/>

1) Lender account.  
This wallet must own some ERC721 and ERC1155 NFTs, to provide theme for rent.  
You can see lender NFTs here (https://rent-test.oort.digital/lend/my-nfts)

2) Borrower account.  
This wallet must have enought DAI to pay for NFTs rent.<br/>
In examples we use [test DAI token](https://mumbai.polygonscan.com/address/0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F)  
To get it - go by [link](https://mumbai.polygonscan.com/address/0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F#writeContract), connect borrower wallet and execute **mint** method


### Run example
Chose file with example (see use cases bellow) and run it, like this one<br/>
```
yarn ts-node .\src\collateral\1_addAndRemoveFromLendPool.ts
```

### Collateral use cases
1. [Lender add and remove ERC1155 asset from rent pool](src/collateral/1_addAndRemoveFromLendPool.ts)
2. [Borrower start and stop rent](src/collateral/2_startAndStopBorrowing.ts)
3. [Claim borrower collateral](src/collateral/3_claimBorrowerCollateral.ts)

### Low collateral use cases
1. [Lender add and remove ERC721 asset from rent pool](src/lowCollateral/1_addAndRemoveFromLendPool.ts)
2. [Borrower start and stop rent](src/lowCollateral/2_startAndStopBorrowing.ts)
