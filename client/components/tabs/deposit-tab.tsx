import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DepositForm } from "@/components/forms/deposit-form";
import { useAccount } from "wagmi";
import WETHBalance from "@/components/cards/weth-balance";
import ETHBalance from "@/components/cards/eth-balance";
import Loading from "@/components/loading";
import Link from "next/link";

export default function DepositTab() {
  const { address } = useAccount();

  if (!address) {
    return <Loading />;
  }

  return (
    <div className="grid gap-2 grid-cols-1">
      <div className="grid gap-2 grid-cols-2">
        <WETHBalance address={address} />
        <ETHBalance address={address} />
      </div>

      <div className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">
        ⚠ if you dont have any WETH go get some free fake WETH faucet. <Link href="/faucet" className="underline underline-offset-4">WETH Faucet</Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deposit</CardTitle>
          <CardDescription>
            This is the amount of WETH that is going to get deposited into the
            protocol.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <DepositForm address={address} />
        </CardContent>
      </Card>
    </div>
  );
}
