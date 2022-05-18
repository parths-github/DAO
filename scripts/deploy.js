const { ethers } = require("hardhat");
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constant");

async function main() {
  // Deploy the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await ethers.getContractFactory(
    "FakeNFTMarketplace"
  );
  const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
  await fakeNftMarketplace.deployed();

  console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address); //0xEebE05d0A42b2e4e8B049bdA440ACc05fc06Ed21

  // Now deploy the CryptoDevsDAO contract
  const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevDAO");
  const cryptoDevsDAO = await CryptoDevsDAO.deploy(
    fakeNftMarketplace.address,
    CRYPTODEVS_NFT_CONTRACT_ADDRESS,
    {
      // This assumes your account has at least 1 ETH in it's account
      // Change this value as you want
      value: ethers.utils.parseEther("0.001"),
    }
  );
  await cryptoDevsDAO.deployed();

  console.log("CryptoDevsDAO deployed to: ", cryptoDevsDAO.address); // 0x659756409Ff18173ddC734c34a06Bd0c1A0c0F9D
  console.log(`Verify with: \n npx hardhat verify --network goerli ${cryptoDevsDAO.address} "${fakeNftMarketplace.address}" "${CRYPTODEVS_NFT_CONTRACT_ADDRESS}"`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });