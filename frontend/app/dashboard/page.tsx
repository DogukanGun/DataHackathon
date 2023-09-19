"use client"
import CoinSelecter from "@/components/coinselecter/CoinSelecter";
import CustomTable from "@/components/table/CustomTable";

const Dashboard = () => {
    return (
        <>
            <div className="w-full flex justify-items-stretch">
                <CoinSelecter />
                <CoinSelecter />
            </div>
            <div className="mt-10 w-full">
                <CustomTable />
            </div>
        </>
    )
}

export default Dashboard;