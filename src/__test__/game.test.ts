import { Log, PlayerData } from "@types";
import Game from "../game/game";

describe("game class", () => {

    let game: Game
    let playersData: PlayerData[]
    let expectedTurn: number
    let expecterPlayerId: string
    let expectedRound: number
    let expectedLog: Log[]

    beforeEach(() => {
        playersData = [
            {
                id: "player_1_Id",
                secret: "1234"
            },
            {
                id: "player_2_Id",
                secret: "1234"
            },
        ]
        game = new Game(playersData)
        expectedRound = 1
        expectedLog = []
        expecterPlayerId = playersData[0].id
        expectedTurn = 0
    })

    it("should start with correct state", () => {
        expect(game.currentPlayer.id).toEqual(expecterPlayerId)
        expect(game.max_index).toEqual(1)
        expect(game.ended).toBeFalsy()
        expect(game.getWinner()).toBeFalsy()
        expect(game.getLog()).toEqual(expectedLog)
        expect(game.rounds).toEqual(expectedRound)
        expect(game.turn).toEqual(expectedTurn)
    })

    describe("play method", () => {

        beforeAll(() => {
            expectedLog = [{
                from: playersData[0].id,
                to: playersData[1].id,
                intent: "1245",
                result: {
                    bulls: 2,
                    cows: 1
                }
            }]
            expectedRound = 1
            expectedTurn = 1
            expecterPlayerId = playersData[1].id
            game.play("1245")
        })

        it("should update the log", () => {
            expect(game.getLog()).toEqual(expectedLog)
        })

        it("should pass turn", () => {
            expect(game.currentPlayer.id).toEqual(expecterPlayerId)
            expect(game.turn).toEqual(expectedTurn)
        })

        it("should not update round", () => {
            expect(game.rounds).toEqual(expectedRound)
        }) 

        describe("on round increase", () => {
            beforeAll(() => {
                expectedLog = [{
                    from: playersData[0].id,
                    to: playersData[1].id,
                    intent: "1245",
                    result: {
                        bulls: 2,
                        cows: 1
                    }
                }]
                expectedLog = [{
                    from: playersData[1].id,
                    to: playersData[0].id,
                    intent: "6789",
                    result: {
                        bulls: 0,
                        cows: 0
                    }
                }]
                expectedRound = 2
                expecterPlayerId = playersData[0].id
                game.play("6789")
            })

            it("should increase the round", () => {
                expect(game.rounds).toEqual(expectedRound)
            })
            it("should update the log", () => {
                expect(game.getLog()).toEqual(expectedLog)
            }) 
            it("should reset currentPlayer to the first player", () => {
                expect(game.currentPlayer.id).toEqual(expecterPlayerId)
            })
        })

    })
})