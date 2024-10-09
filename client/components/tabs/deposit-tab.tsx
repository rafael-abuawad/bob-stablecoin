import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "../icons";
import { DepositForm } from "../forms/deposit-form";
import { useAccount } from "wagmi";
import WETHBalance from "../cards/weth-balance";
import ETHBalance from "../cards/eth-balance";

export default function DepositTab() {
  const { address } = useAccount();

  if (!address) {
    return (
      <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
        <Icons.spinner
          width={24}
          height={24}
          className="mr-2 h-4 w-4 animate-spin"
        />
        Loading...
      </div>
    );
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
