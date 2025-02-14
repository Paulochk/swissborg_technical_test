import {TransactionListApiResponse} from "@/models/transaction-list-api-response.ts";
import {useQuery} from "@tanstack/react-query";
import {Transaction} from "@/models/transaction.ts";

const WEB_SERVER_API = "http://localhost:8080/api";
const TRANSACTION_LIST_URI = "/transactions";

async function fetchRawTransactions(): Promise<Transaction[]> {
    const response = await fetch(WEB_SERVER_API + TRANSACTION_LIST_URI);

    const data: TransactionListApiResponse = await response.json();

    return data.transactions;
}

function useRawTransactions() {

    return useQuery({
        queryKey: ["rawTransactions"],
        queryFn: fetchRawTransactions,
        gcTime: 0,
        staleTime: 0,
        retry: false
    });
}

export {useRawTransactions};
