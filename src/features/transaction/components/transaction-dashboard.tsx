import TransactionTable from "@/features/transaction/components/transaction-table.tsx";
import SummaryTable from "@/features/transaction/components/summary-table.tsx";

function TransactionDashboard() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <TransactionTable/>
                <SummaryTable/>
            </div>
        </div>
    );
}

export default TransactionDashboard;