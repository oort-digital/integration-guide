# integration-guide
This repository have a differet examples of using Oort Rent solution.
All examples use [Mumbai](https://mumbai.polygonscan.com) test network.



## How to run exmaples

### Prepare wallets
Lender wallet.  
This wallet must own some ERC721 and ERC1155 NFTs, to provide theme for rent.  
You can see lender NFTs here (https://rent-test.oort.digital/lend/my-nfts)

Borrower wallet.  
This wallet must have enought DAI to pay for NFTs rent.<br/>
In exmaples we use [test DAI token](https://mumbai.polygonscan.com/address/0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F)  
To get it - go by [link](https://mumbai.polygonscan.com/address/0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F#writeContract), connect borrower wallet and execute **mint** method


### Fill secrets.json
Fill all fields in a [secrets.json](secrets.json) 

**rpc** - fill any mumbai rpc url. You may use [INFURA](https://www.infura.io) or some [free rpc](https://chainlist.org/chain/80001)<br/>
**lenderPK** - fill lender wallet private key.<br/>
**borrowerPK**: fill borrower wallet private key.<br/>
