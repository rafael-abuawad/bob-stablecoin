import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WithdrawForm from "@/components/forms/withdraw-form";
import WETHDeposited from "@/components/cards/weth-deposited";
import Loading from "@/components/loading";
import { useAccount } from "wagmi";

export default function WithdrawTab() {
  const { address } = useAccount();

  if (!address) {
    return <Loading />;
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
