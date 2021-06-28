const { expect } = require("chai");
const { tomorrowUnix } = require('./helpers.ts');

describe("SportsOracle", function () {

    let contract;
    let owner;
    let addr1;
    let addr2;

    before(async function () {
        ArrayLib = await ethers.getContractFactory("ArrayLib");
        arrayLib = await ArrayLib.deploy();

        SportsOracle = await ethers.getContractFactory(
            "SportsOracle",
            {
                libraries: { ArrayLib: arrayLib.address }
            }
        );

        [owner, addr1, addr2] = await ethers.getSigners();

        contract = await SportsOracle.deploy();
    });

    // Test ownership and deployment.
    describe("Deployment", function () {

        it("Should set the right owner", async function () {
            expect(await contract.owner()).to.equal(owner.address);
        })
    });

    // Add a game successfully and retrieve is
    describe("add Game and retrieve data", function () {
        let gameId;

        before(async function() {
            const tx = await contract.addGame("Boca vs River", ["Boca", "River"], tomorrowUnix());
            const res = await tx.wait();

            gameId =  res.events[0].args[1];
        })

        it("addGame creates a Game with valid data", async function () {
            expect(await contract.gameExists(gameId)).to.equal(true);
        })

        it("addGame fails if game already exists", async function() {
            await expect(contract.addGame("Boca vs River", ["Boca", "River"], tomorrowUnix()))
                        .to.be.revertedWith("Game already exists");
        })

        it("getGame retrieves data from a single Game", async function() {
            const game = await contract.getGame(gameId);
            expect(game.name).to.equal("Boca vs River");
        })

        it("data is properly set", async function() {
            const game = await contract.getGame(gameId);
            expect(game.participants.length).to.equal(3);
        })

        describe("update Game status", function() {
            let completedGameId;

            before(async function() {
                const tx = await contract.addGame("Inter vs Milan", ["Inter", "Milan"], tomorrowUnix());
                const res = await tx.wait();

                completedGameId =  res.events[0].args[1];
            })

            it("setGameCompleted sets status as Completed", async function() {
                await contract.setGameCompleted(completedGameId);
                const game = await contract.getGame(completedGameId);
                expect(game.status).to.equal(2);
            })

            it("getAllGames retrieves data from all Games", async function() {
                const games = await contract.getAllGames();
                expect(games.length).to.equal(2);
            })

            it("getPendingGames retrieves data from games with pending status", async function() {
                const games = await contract.getPendingGames();
                expect(games.length).to.equal(1);
            })

            it("setGameWinner sets winner and updates status", async function() {
                // participant[1] set as the winner
                await contract.setGameWinner(gameId, 1);
                const game = await contract.getGame(gameId);
                expect(game.winner).to.equal(1);
                expect(game.status).to.equal(2);
            })

            it("setGameWinner throws error if winner is out of bounds of participants", async function() {
                // participant[3] set as the winner
                await expect(contract.setGameWinner(gameId, 3))
                            .to.be.revertedWith("Winner is not among Game's participants");
            })
        })
    });
})
