import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/icons";
import { DepositForm } from "@/components/forms/deposit-form";

export default function MintTab() {
  return (
    <div className="grid gap-2 grid-cols-1">
      <Card className="w-full">
        <CardHeader className="space-y-0">
          <CardDescription>Available to mint</CardDescription>
          <CardTitle className="text-4xl tabular-nums">
            12,584{" "}
            <div className="flex flex-row space-x-2 items-center">
              <Icons.bs width={25} height={25} />
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                BOBC
              </span>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Mint</CardTitle>
          <CardDescription>
            This is the amount of BOBC that you are going to mint.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <DepositForm />
        </CardContent>
      </Card>
    </div>
  );
}
