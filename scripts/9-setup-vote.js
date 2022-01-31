import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// transfer governance tokens to Treasury represented as a voting contract 
// tokens will now all be contained in this contract instead of previously with me (creator of DAO/token)

// This is our governance contract.
const voteModule = sdk.getVoteModule(
  "0xd55f47C73795FB6775d5F9e3384572666F53dCF6",
);

// This is our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0x4444a130b72Fc53f041D9d290061C3C2EC21AC8b",
);

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await tokenModule.balanceOf(
      // The wallet address stored in your env file or Secrets section of Repl
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    // Transfer 90% of the supply to our voting contract.
    await tokenModule.transfer(
      voteModule.address,
      percent90
    );

    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();
