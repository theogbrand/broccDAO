import sdk from "./1-initialize-sdk.js";

// deploy governance ERC-20 token (custom token) and add to wallet

const app = sdk.getAppModule("0xD00E991fD51BE1F211905D28fBadfB655FBC2EDd");

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({


      name: "BroccDAO Governance Token",

      symbol: "BROCC",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();