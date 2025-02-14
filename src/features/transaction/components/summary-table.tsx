import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {TotalAmountByCurrency} from "@/models/total-amount-by-currency.ts";
import {useTotalAmount} from "@/features/transaction/hooks/use-total-amount.ts";
import RefreshButton from "@/features/transaction/components/refresh-button.tsx";


function TransactionSummary() {

    const {totalsByCurrency, isLoading, error, refetch} = useTotalAmount();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>"Error loading totals: {error.message}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mt-8 mb-4">Total by Currency</h1>
            <Table className="border border-neutral-200 dark:border-neutral-700">
                <TableHeader>
                    <TableRow>
                        <TableHead>Currency</TableHead>
                        <TableHead>Total completed withdrawals</TableHead>
                        <TableHead>Total completed deposits</TableHead>
                        <TableHead>Total pending withdrawals</TableHead>
                        <TableHead>Total pending deposits</TableHead>
                        <TableHead>Total balance</TableHead>
                        <TableHead>Total balance eur equiv</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {totalsByCurrency.map((t: TotalAmountByCurrency) => (
                        <TableRow key={t.id}>
                            <TableCell>{t.currency}</TableCell>
                            <TableCell>{t.completedWithdrawals}</TableCell>
                            <TableCell>{t.completedDeposits}</TableCell>
                            <TableCell>{t.pendingWithdrawals}</TableCell>
                            <TableCell>{t.pendingDeposits}</TableCell>
                            <TableCell>{t.balance}</TableCell>
                            <TableCell>{t.hasRates ? t.eurBalance : "N/A"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <RefreshButton onClick={refetch}></RefreshButton>
        </div>
    );
}

export default TransactionSummary;