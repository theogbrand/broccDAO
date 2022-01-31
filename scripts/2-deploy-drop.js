import { ethers } from 'ethers';
import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

// creating Module (contract) using Thirdweb, deploy to ThirdWeb dashboard (where address can be found) and NFT hosted on IPFS
const app = sdk.getAppModule('0xD00E991fD51BE1F211905D28fBadfB655FBC2EDd');

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      // The collection's name, ex. CryptoPunks
      name: 'BrocDAO Membership',
      
      // A description for the collection.
      description: 'A DAO for fans of Broccoli.',

      // The image for the collection that will show up on OpenSea.
      image: readFileSync('scripts/assets/brocc.jpg'),

      
      // pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
      // Not charging people for the drop, so we'll pass in the 0x0 address (AddressZero)
      // set this to your own wallet address if you want to charge for the drop.
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log(
      '✅ Successfully deployed bundleDrop module, address:',
      bundleDropModule.address
    );
    console.log(
      '✅ bundleDrop metadata:',
      await bundleDropModule.getMetadata()
    );
  } catch (error) {
    console.log('failed to deploy bundleDrop module', error);
  }
})();
