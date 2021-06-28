# sports-oracle

Sports Oracle is a series smart contracts developed with the goal of getting data from sports events into the blockchain, so this can later be used by other dapps.

## Requirements

It was developed using:
- solidity 0.8.4
- hardhat 2.4.1
- ethers 5.3.1

Tests use:
- chain 4.3.4

## Data structure
A struct `Game` has the following fields:

```
struct Game {
    bytes32 id;
    string name;
    string[] participants;
    uint date; 
    Status status;
    int winner; // index in participants (-1 if no winner has been declated)
}
```

Being `Status` is an enum with these possible values:
```
enum Status {
    Pending,    // game hasn't started
    InProgress, // game is underway
    Completed   // game completed and there is an outcome
}
```

## Install

Just git clone this repo and make sure you have all the required dependencies.

To compile: 
```
npx hardhat compile
```

To run tests:
```
npx hardhat test
```

To run node and deploy locally:
```
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

You should edit `scripts/deploy.js` if you want to deploy on any network.

## Usage

Games are created only by the owner (address of whoever deployed the contract). After this all changes on state and storage variables required to change `status` and set `winner` on a `Game` are also restricted to the owner.

Retrieving data regarding a single `Game` or a collection of them is public. 


## Contribute

If you want to contribute, don't hesitate to [create a new issue](https://github.com/natonnelier/sports-oracle/issues/new)!

## License

This is an open source software [licensed as MIT](https://github.com/natonnelier/sports-oracle/blob/master/LICENSE).