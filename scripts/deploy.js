// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");


async function main() {
    const ArrayLib = await ethers.getContractFactory("ArrayLib");
    const arrayLib = await ArrayLib.deploy();

    await arrayLib.deployed();

    const SportsOracle = await ethers.getContractFactory(
        "SportsOracle",
        {
            libraries: { ArrayLib: arrayLib.address }
        }
    );

    const contract = await SportsOracle.deploy();
    contract.deployed();

    console.log("SportsOracle deployed to:", contract.address);

    /*const SportsOracle = await hre.ethers.getContractFactory("SportsOracle");
    const oracle = await SportsOracle.deploy("Deploying SportsOracle...");

    await oracle.deployed();

    console.log("Greeter deployed to:", oracle.address);*/
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
