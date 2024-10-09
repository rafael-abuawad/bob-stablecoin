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
