// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address public owner;
    uint256 public reserveBalance;
    bool public isMinted;

    event ReserveUpdated(uint256 newReserve);
    event Minted(address indexed minter, uint256 amount);

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC20(name_, symbol_) {
        owner = msg.sender;
        isMinted = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function updateReserveAndMint(uint256 newReserve) external onlyOwner {
        require(!isMinted, "Already minted");
        require(newReserve > 0, "Invalid reserve amount");

        reserveBalance = newReserve;
        emit ReserveUpdated(newReserve);

        _mint(msg.sender, reserveBalance);
        isMinted = true;
        emit Minted(msg.sender, reserveBalance);
    }

    function getReserve() external view returns (uint256) {
        return reserveBalance;
    }
}
