import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// creating token's supply

// This is the address of our ERC-20 contract printed out in the step before.
const tokenModule = sdk.getTokenModule(
  "0x4444a130b72Fc53f041D9d290061C3C2EC21AC8b",
);

(async () => {
  try {
    const amount = 1_000_000;
    // We use the util function from "ethers" to convert the amount
    // to have 18 decimals (which is the standard for ERC20 tokens).

    // converted from number to String datatype (Precision good, math hard)
    // ethers.js interacts w string numbers
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    // Interact with your deployed ERC-20 contract and mint the tokens!
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();
    
    // Print out how many of our token's are out there now!
    console.log(
      "✅ There now is",
      ethers.utils.formatUnits(totalSupply, 18),
      "$BROCC in circulation",
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();