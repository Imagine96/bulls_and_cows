import Player from "./player";
import { EventTypes, PayloadType, IntentPayloadType, IntentEvaluatedPayloadType, Log, PlayerData } from "../utils/types"

class Game {

    private players: Player[];
    private currentPlayer: Player;
    max_index: number;
    turn: number = 0;
    rounds: number = 1;
    ended: boolean = false;
    private log: Log[] = [];
    private winner: Player | null = null;

    constructor(playersData: PlayerData[]) {
        this.players = playersData.map(data => new Player(data.id, data.secret, this.dispathcEvent))
        this.max_index = playersData.length - 1
        this.currentPlayer = this.players[0]
    }

    play = (intent: string): void => {
        this.currentPlayer.triggerIntent(intent)
    }
    
    getCurrentPlayer = (): string => {
        return this.currentPlayer.id  
    }
    
    getWinner = (): Player | null => {
        return this.winner
    }
    
    getLog = (): Log[] => {
        return this.log
    }
    
    private dispathcEvent = (type: EventTypes, payload: PayloadType): void => {

        if(this.ended) return
        
        switch (type) {
            case "intent": {
                this.turn ++
                const intent = (payload as IntentPayloadType).intent
                const nextPlayer = this.getNextPlayer()
                this.addIntentToLog(this.currentPlayer ,intent)
                nextPlayer.evaluateIntent(intent)
                break
            }
            case "intentEvaluated": {
                const result = { ...(payload as IntentEvaluatedPayloadType) }
                this.setIntentResultToLog(result)
                if (result.bulls === 4) {
                    this.onGameEnded()
                    return
                }
                this.setNextPlayer()
                break
            }
            default: {
                return
            }
        }
    }

    private addIntentToLog = (currentplayer: Player, intent: string): void => {
        this.log.push({
            from: currentplayer.id,
            to: this.getNextPlayer().id,
            intent: intent
        })
    }

    private setIntentResultToLog = (result: IntentEvaluatedPayloadType): void => {
        const updatedLog: Log = {...this.log[this.log.length - 1], result: result}
        this.log[this.log.length - 1] = updatedLog
    }

    private setNextPlayer = (): void => { 
        if ((this.turn % this.players.length) === 0) {
            this.rounds++
        }
        const nextPlayerIndex = this.turn <= this.max_index ? this.players.indexOf(this.currentPlayer) + 1 : this.turn - (this.rounds * this.max_index) 
        this.currentPlayer = this.players[nextPlayerIndex]
    }

    private getNextPlayer = (): Player => {
        let rounds = this.rounds
        if ((this.turn % this.players.length) === 0) {
            rounds++
        }
        const nextPlayerIndex = this.turn <= this.max_index ? this.players.indexOf(this.currentPlayer) + 1 : this.turn - (rounds * this.max_index) 
        return this.players[nextPlayerIndex]
    }

    private onGameEnded = (): void => {
        this.winner = this.currentPlayer
        this.ended = true
    }

}

export default Game