import {Transaction} from "@/models/transaction";
import {describe, expect, test} from "vitest";
import {TransactionTypeEnum} from "@/models/transaction-type-enum.ts";
import {TransactionStatusEnum} from "@/models/transaction-status-enum.ts";
import {enrichTransactions} from "@/features/transaction/hooks/use-transactions.ts";


describe("enrichTransactions", () => {

    test("calculates euroAmount correctly when rate is available", () => {
        const transactions: Transaction[] = [
            { id: "1", currency: "USD", amount: 100, euroAmount: null, type: TransactionTypeEnum.DEPOSIT, status: TransactionStatusEnum.COMPLETED, timestamp: "" },
            { id: "2", currency: "EUR", amount: 50, euroAmount: null, type: TransactionTypeEnum.WITHDRAWAL, status: TransactionStatusEnum.PENDING, timestamp: "" },
        ];
        const eurRates: Record<string, number> = { USD: 0.9, EUR: 1 };

        const result = enrichTransactions(transactions, eurRates);

        expect(result[0].euroAmount).toBe(90);
        expect(result[1].euroAmount).toBe(50);
    });

    test("sets euroAmount to null when no rate is available", () => {
        const transactions: Transaction[] = [
            { id: "1", currency: "BTC", amount: 1, euroAmount: null, type: TransactionTypeEnum.DEPOSIT, status: TransactionStatusEnum.COMPLETED, timestamp: "" }
        ];
        const eurRates: Record<string, number> = {};

        const result = enrichTransactions(transactions, eurRates);

        expect(result[0].euroAmount).toBeNull();
    });

    test("handles BTC rate correctly", () => {
        const transactions: Transaction[] = [
            { id: "1", currency: "BTC", amount: 2, euroAmount: null, type: TransactionTypeEnum.DEPOSIT, status: TransactionStatusEnum.COMPLETED, timestamp: "" }
        ];
        const eurRates: Record<string, number> = { BTC: 92033.20167586711 };

        const result = enrichTransactions(transactions, eurRates);

        expect(result[0].euroAmount).toBe(2 * 92033.20167586711);
    });

    test("ignores CHF rate if it is missing", () => {
        const transactions: Transaction[] = [
            { id: "2", currency: "CHF", amount: 100, euroAmount: null, type: TransactionTypeEnum.WITHDRAWAL, status: TransactionStatusEnum.COMPLETED, timestamp: "" }
        ];
        const eurRates: Record<string, number> = { BTC: 92033.20167586711 };

        const result = enrichTransactions(transactions, eurRates);

        expect(result[0].euroAmount).toBeNull();
    });

    test("handles CHF rate correctly", () => {
        const transactions: Transaction[] = [
            { id: "4", currency: "CHF", amount: 50, euroAmount: null, type: TransactionTypeEnum.DEPOSIT, status: TransactionStatusEnum.COMPLETED, timestamp: "" }
        ];
        const eurRates: Record<string, number> = { CHF: 1.0692801993546321 };

        const result = enrichTransactions(transactions, eurRates);

        expect(result[0].euroAmount).toBe(50 * 1.0692801993546321);
    });
});