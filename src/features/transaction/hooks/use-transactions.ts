import {useRawTransactions} from "@/features/transaction/hooks/use-raw-transactions.ts";
import {useEurRates} from "@/features/transaction/hooks/use-eur-rates.ts";
import {Transaction} from "@/models/transaction.ts";


export function enrichTransactions(transactions: Transaction[], eurRates: Record<string, number>): Transaction[] {
    return transactions.map((transaction) => ({
        ...transaction,
        euroAmount: eurRates[transaction.currency] !== undefined ? transaction.amount * eurRates[transaction.currency] : null,
    }));
}

function useTransactions() {
    const {
        data: transactions = [],
        isLoading: isLoadingTransactions,
        error: errorTransactions,
        refetch: reFetchRawTransactions
    } = useRawTransactions();
    const {data: eurRates = {}, isLoading: isLoadingRates, error: errorRates, refetch: reFetchEurRates} = useEurRates();

    const isLoading: boolean = isLoadingTransactions || isLoadingRates;
    const error: Error | null = errorTransactions || errorRates;

    const enrichedTransactions = enrichTransactions(transactions, eurRates);

    const refetchAll = async () => {
        await Promise.all([reFetchRawTransactions(), reFetchEurRates()]);
    };

    return {transactions: enrichedTransactions, isLoading: isLoading, error: error, refetch: refetchAll};
}

export {useTransactions};