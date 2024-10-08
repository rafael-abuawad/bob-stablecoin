import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "../icons";
import { WithdrawForm } from "../forms/withdraw-form";

export default function WithdrawTab() {
  return (
    <div className="grid gap-2 grid-cols-1">
      <Card className="w-full">
        <CardHeader className="space-y-0">
          <CardDescription>Deposited </CardDescription>
          <CardTitle className="text-4xl tabular-nums">
            12,584{" "}
            <div className="flex flex-row space-x-2 items-center">
              <Icons.eth width={25} height={25} />
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                ETH
              </span>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Withdraw</CardTitle>
          <CardDescription>
            This allows you to withdraw your deposited ETH.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <WithdrawForm />
        </CardContent>
      </Card>
    </div>
  );
}
