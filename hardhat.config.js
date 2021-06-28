require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
    defaultNetwork: "hardhat",
    paths: {
        artifacts: './src/artifacts',
    },
    networks: {
        hardhat: {
          chainId: 1337
        }
        /*ropsten: {
            url: "https://ropsten.infura.io/v3/f11c675224f6422a8f65b466b8ba063b",
            accounts: [`0x${process.env.PRIVATE_KEY}`]
        }*/
    },
    solidity: "0.8.4",
  };
