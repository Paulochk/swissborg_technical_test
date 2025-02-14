import {TotalAmountByCurrency} from "@/models/total-amount-by-currency.ts";
import {useTransactions} from "@/features/transaction/hooks/use-transactions.ts";
import {TransactionTypeEnum} from "@/models/transaction-type-enum.ts";
import {TransactionStatusEnum} from "@/models/transaction-status-enum.ts";
import {Transaction} from "@/models/transaction.ts";


export function calculateTotalsByCurrency(transactions: Transaction[]): TotalAmountByCurrency[] {
    const totalsByCurrency: Record<string, TotalAmountByCurrency> = {};

    transactions.forEach((transaction) => {
        const {currency, amount, euroAmount, type, status} = transaction;

        if (!totalsByCurrency[currency]) {
            totalsByCurrency[currency] = {
                id: currency,
                currency,
                completedWithdrawals: 0,
                completedDeposits: 0,
                pendingWithdrawals: 0,
                pendingDeposits: 0,
                balance: 0,
                eurBalance: 0,
                // boolean to be sure not to display wrong total values when lacking rates
                hasRates: !!euroAmount,
            };
        }

        if (type === TransactionTypeEnum.WITHDRAWAL) {
            if (status === TransactionStatusEnum.COMPLETED) {
                totalsByCurrency[currency].completedWithdrawals += amount;
                totalsByCurrency[currency].balance -= amount;
                totalsByCurrency[currency].eurBalance -= euroAmount || 0;
            } else if (status === TransactionStatusEnum.PENDING) {
                totalsByCurrency[currency].pendingWithdrawals += amount;
            }
        } else if (type === TransactionTypeEnum.DEPOSIT) {
            if (status === TransactionStatusEnum.COMPLETED) {
                totalsByCurrency[currency].completedDeposits += amount;
                totalsByCurrency[currency].balance += amount;
                totalsByCurrency[currency].eurBalance += euroAmount || 0;
            } else if (status === TransactionStatusEnum.PENDING) {
                totalsByCurrency[currency].pendingDeposits += amount;
            }
        }
    });

    return Object.values(totalsByCurrency);
}


function useTotalAmount() {
    const {transactions, isLoading, error, refetch} = useTransactions();

    const totalsByCurrency = calculateTotalsByCurrency(transactions);

    return {totalsByCurrency: totalsByCurrency, isLoading: isLoading, error: error, refetch: refetch};
}

export {useTotalAmount};