import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

// Set up NFT data (when members mint new NFT)
const bundleDrop = sdk.getBundleDropModule(
  "0xF0222Db89f1ad94696eab5171C6c0870722cee31",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Proof of Brocc",
        description: "This NFT will give you access to BroccDAO!",
        image: readFileSync("scripts/assets/brocc.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new BROCC in the drop!");
  } catch (error) {
    console.error("failed to create the new BROCC", error);
  }
})()
