export interface TotalAmountByCurrency {
    id: string;
    currency: string;
    completedWithdrawals: number;
    completedDeposits: number;
    pendingWithdrawals: number;
    pendingDeposits: number;
    balance: number;
    eurBalance: number;
    hasRates: boolean;
}