require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const OPTIMISM_PRIVATE_KEY = process.env.OPTIMISM_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    opt_sepolia: {
      url: `https://opt-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [OPTIMISM_PRIVATE_KEY],
      ignition: {
        gasPrice: 50_000_000_000n,
        gas: 2_000_000n
      },
    },
    optimism: {
      url: `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [OPTIMISM_PRIVATE_KEY],
      ignition: {
        gasPrice: 50_000_000_000n,
        gas: 2_000_000n
      },
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [OPTIMISM_PRIVATE_KEY],
      ignition: {
        gasPrice: 50_000_000_000n,
        gas: 2_000_000n
      },
    },
  },
  etherscan: {
    apiKey: {
      'optimism': 'abc',
    },
    customChains: [
      {
        network: 'optimism',
        chainId: 10,
        urls: {
          apiURL: 'https://optimism.blockscout.com/api',
          browserURL: 'https://optimism.blockscout.com/',
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};
