import sdk from "./1-initialize-sdk.js";

// Deploying contract - i.e. xfer 1K tokens for redesigning landing page and deciding conditions of vote (who can vote, how long to vote, min # tokens to vote)

// Grab the app module address.
const appModule = sdk.getAppModule(
  "0xD00E991fD51BE1F211905D28fBadfB655FBC2EDd",
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      // Give your governance contract a name.
      name: "BroccDAO's Epic Proposal",

      // This is the location of our governance token, our ERC-20 contract!
      // which token to accept
      votingTokenAddress: "0x4444a130b72Fc53f041D9d290061C3C2EC21AC8b",

      // After a proposal is created, when can members start voting?
      // For now, we set this to immediately.
      proposalStartWaitTimeInSeconds: 0,

      // How long do members have to vote on a proposal when it's created?
      // Here, we set it to 24 hours (86400 seconds)
      proposalVotingTimeInSeconds: 24 * 60 * 60,

      // Will explain more below.
    // min % of tokens must be used to vote (prevent case when token holders on vacation, single vote will be 100%)
      votingQuorumFraction: 0,

      // What's the minimum # of tokens a user needs to be allowed to create a proposal?
      // I set it to 0. Meaning no tokens are required for a user to be allowed to
      // create a proposal.
      minimumNumberOfTokensNeededToPropose: "0",
    });

    console.log(
      "✅ Successfully deployed vote module, address:",
      voteModule.address,
    );
  } catch (err) {
    console.error("Failed to deploy vote module", err);
  }
})();