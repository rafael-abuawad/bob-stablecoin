import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "../icons";
import { wethContractConfig } from "@/lib/contracts/weth.config";
import { useReadContract } from "wagmi";
import { formatNumber } from "@/lib/utils";

export default function WETHBalance({ address }: { address: `0x${string}` }) {
  const { data: balance } = useReadContract({
    ...wethContractConfig,
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <Card className="w-full">
      <CardHeader className="space-y-0">
        <CardDescription>Balance</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          {formatNumber(balance)}{" "}
          <div className="flex flex-row space-x-2 items-center">
            <Icons.weth width={25} height={25} />
            <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
              WETH
            </span>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
