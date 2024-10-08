import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "../icons";
import { DepositForm } from "../forms/deposit-form";

export default function DepositTab() {
  return (
    <div className="grid gap-2 grid-cols-1">
      <Card className="w-full">
        <CardHeader className="space-y-0">
          <CardDescription>Balance </CardDescription>
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
          <CardTitle>Deposit</CardTitle>
          <CardDescription>
            This is the amount of ETH that is going to get deposited into the
            protocol.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <DepositForm />
        </CardContent>
      </Card>
    </div>
  );
}
