const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {
    let Token, token, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        Token = await ethers.getContractFactory("Token");
        token = await Token.deploy("DWIN Stablecoin", "DWIN");
    });

    it("Should deploy with the correct name and symbol", async function () {
        expect(await token.name()).to.equal("DWIN Stablecoin");
        expect(await token.symbol()).to.equal("DWIN");
    });

    it("Should set the owner correctly", async function () {
        expect(await token.owner()).to.equal(owner.address);
    });

    it("Should allow the owner to update reserve and mint tokens", async function () {
        const reserveAmount = 10000000000000000000n;

        await expect(token.updateReserveAndMint(reserveAmount))
            .to.emit(token, "ReserveUpdated")
            .withArgs(reserveAmount)
            .and.to.emit(token, "Minted")
            .withArgs(owner.address, reserveAmount);

        expect(await token.getReserve()).to.equal(reserveAmount);
        expect(await token.balanceOf(owner.address)).to.equal(reserveAmount);
        expect(await token.isMinted()).to.equal(true);
    });

    it("Should not allow non-owner to update reserve and mint tokens", async function () {
        const reserveAmount = 10000000000000000000n;

        await expect(
            token.connect(addr1).updateReserveAndMint(reserveAmount)
        ).to.be.revertedWith("Not the owner");
    });

    it("Should not allow minting more than once", async function () {
        const reserveAmount = 10000000000000000000n;

        await token.updateReserveAndMint(reserveAmount);

        await expect(token.updateReserveAndMint(reserveAmount)).to.be.revertedWith(
            "Already minted"
        );
    });

    it("Should revert when updating reserve with zero value", async function () {
        await expect(token.updateReserveAndMint(0)).to.be.revertedWith(
            "Invalid reserve amount"
        );
    });
});
