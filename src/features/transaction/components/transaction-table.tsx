import {Transaction} from "@/models/transaction.ts";
import {useTransactions} from "@/features/transaction/hooks/use-transactions.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {formatDateDDMMMYYYY} from "@/lib/date-utils.ts";
import {TransactionStatusEnum} from "@/models/transaction-status-enum.ts";
import RefreshButton from "@/features/transaction/components/refresh-button.tsx";

function TransactionTable() {

    const {transactions, isLoading, error, refetch} = useTransactions();

    if (isLoading) {
        return <div>Loading transactions...</div>;
    }

    if (error) {
        return <div>Error loading transactions: {error.message}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Transactions Table</h1>
            <Table className="border border-neutral-200 dark:border-neutral-700">
                <TableHeader>
                    <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Eur equiv</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((t: Transaction) => (
                        <TableRow key={t.id}>
                            <TableCell>{formatDateDDMMMYYYY(t.timestamp)}</TableCell>
                            <TableCell>{t.currency}</TableCell>
                            <TableCell>{t.amount}</TableCell>
                            <TableCell>{t.euroAmount ? t.euroAmount : "N/A"}</TableCell>
                            <TableCell className="font-medium">{t.type.toUpperCase()}</TableCell>
                            <TableCell>
                <span
                    className={`px-2 py-1 rounded text-white ${
                        t.status === TransactionStatusEnum.PENDING ? "bg-yellow-500" : t.status === TransactionStatusEnum.COMPLETED ? "bg-green-500" : "bg-red-500"
                    }`}
                >
                  {t.status}
                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <RefreshButton onClick={refetch}></RefreshButton>
        </div>
    );
}


export default TransactionTable;
