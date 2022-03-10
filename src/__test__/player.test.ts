import Player from "../game/player"
import { PayloadType, EventTypes } from "@types"

let dispatch: jest.Mock<any, any>

describe("player class", () => {

    let expectedId: string
    let player: Player
    let expectedArgs: [type: EventTypes, payload: PayloadType]

    beforeAll(() => {
        expectedId = "playerId"
    })

    beforeEach(() => {
        dispatch = jest.fn()
        player = new Player("playerId", "1234", dispatch)
    })

    afterEach(() => {
        dispatch.mockClear()
    })

    it("should start wiht correct state", () => {
        expect(player.id).toEqual(expectedId)
    })

    describe("triggerIntent", () => {

        beforeEach(() => {
            expectedArgs = ["intent", { intent: "1234" }]
        })

        it("should dispatch the event with correct args", () => {
            player.triggerIntent("1234")
            expect(dispatch).toBeCalled()
            expect(dispatch).toBeCalledWith(...expectedArgs)
        })
    })

    describe("evaluateIntent", () => {
        beforeEach(() => {
            expectedArgs = ["intentEvaluated", {
                bulls: 4,
                cows: 0
            }]
        })

        it("should dispatch the event with correct args", () => {
            player.evaluateIntent("1234")
            expect(dispatch).toBeCalled()
            expect(dispatch).toBeCalledWith(...expectedArgs)
        })
    })
})