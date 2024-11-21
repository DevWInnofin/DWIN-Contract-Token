const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config();

const TokenModule = buildModule("TokenModule", (m) => {
  const token = m.contract("Token", ["DWIN Stablecoin", "DWIN"]);
  
  m.call(token, "updateReserveAndMint",  [process.env.TOKEN_SUPPLY]);

  return { token };
});

module.exports = TokenModule;