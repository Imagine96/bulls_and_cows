import { EventTypes, PayloadType, IntentEvaluatedPayloadType } from "../utils/types"

class Player {

    id: string;
    private secret: number[];
    private dispatchEvent: (type: EventTypes, payload: PayloadType) => void;

    constructor(id: string, secret: string, dispatchEvent: (type: EventTypes, payload: PayloadType) => void){
        this.id = id
        this.dispatchEvent = dispatchEvent
        this.secret = this.convertToArry(secret)
    }

    evaluateIntent(intent: string): void {
        const result = this.evaluate(this.convertToArry(intent))
        this.dispatchEvent("intentEvaluated", result)
    }

    triggerIntent(intent: string): void {
        this.dispatchEvent("intent", {intent})
    }

    private evaluate(intent: number[]): IntentEvaluatedPayloadType {
        let bulls = 0
        let cows = 0

        this.secret.forEach((digit, index) => {
            if(intent.indexOf(digit) === index) bulls++;
            else if(intent.indexOf(digit) !== -1 ) cows++;
        })

        return {
            bulls,
            cows
        }
    }

    private convertToArry (string: string): number[] {
        const numberArry = [...string].map(digit => Number(digit))
        return numberArry
    }
}

export default Player