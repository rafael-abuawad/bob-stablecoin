import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/icons";
import { useReadContract } from "wagmi";
import { formatNumber } from "@/lib/utils";
import { engineContractConfig } from "@/lib/contracts/engine.config";

export default function WETHDeposited({
  description,
  address,
}: {
  description: string;
  address: `0x${string}`;
}) {
  const { data: balance } = useReadContract({
    ...engineContractConfig,
    functionName: "collateralDeposited",
    args: [address],
  });

  return (
    <Card className="w-full">
      <CardHeader className="space-y-0">
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          {formatNumber(balance)}{" "}
          <div className={`flex flex-row space-x-2 items-center`}>
            <Icons.weth width={25} height={25} />
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              WETH
            </span>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
