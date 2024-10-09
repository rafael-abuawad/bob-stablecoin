import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/icons";
import { bobcContractConfig } from "@/lib/contracts/bobc.config";
import { useReadContract } from "wagmi";
import { formatNumber } from "@/lib/utils";

export default function BOBCBalance({ address }: { address: `0x${string}` }) {
  const { data: balance } = useReadContract({
    ...bobcContractConfig,
    functionName: "balanceOf",
    args: [address],
  });

  console.log(balance);

  return (
    <Card className="w-full">
      <CardHeader className="space-y-0">
        <CardDescription>Balance</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          {formatNumber(balance)}{" "}
          <div className={`flex flex-row space-x-2 items-center`}>
            <Icons.bs width={25} height={25} />
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              BOBC
            </span>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
