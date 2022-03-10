export type EventTypes = "intent" | "intentEvaluated"

export type IntentPayloadType = {
    intent: string
}

export type IntentEvaluatedPayloadType = {
    bulls: number,
    cows: number
}

export type PlayerData = { id: string, secret: string }

export type PayloadType =  IntentPayloadType | IntentEvaluatedPayloadType

export type Log = {
    from: string
    to: string
    intent: string
    result?: IntentEvaluatedPayloadType
}