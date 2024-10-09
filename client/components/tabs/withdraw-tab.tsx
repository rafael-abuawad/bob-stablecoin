import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "../icons";
import { WithdrawForm } from "../forms/withdraw-form";
import WETHDeposited from "../cards/weth-deposited";
import { useAccount } from "wagmi";

export default function WithdrawTab() {
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
      <WETHDeposited description="Deposited" address={address} />
      <Card>
        <CardHeader>
          <CardTitle>Withdraw</CardTitle>
          <CardDescription>
            This allows you to withdraw your deposited WETH.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <WithdrawForm address={address} />
        </CardContent>
      </Card>
    </div>
  );
}
