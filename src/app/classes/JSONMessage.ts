export interface JSONMessage {
    success: boolean,
    timestamp: number,
    base: string,
    date: string,
    rates: Rates;
}

export interface Rates {
    EUR: number,
    USD: number,
    GBP: number,
    CNY: number,
    JPY: number,
    TRY: number
}