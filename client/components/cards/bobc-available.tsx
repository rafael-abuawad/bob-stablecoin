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
import { bobcContractConfig } from "@/lib/contracts/bobc.config";

export default function BOBCAvailable({ address }: { address: `0x${string}` }) {
  const { data: available } = useReadContract({
    ...engineContractConfig,
    functionName: "get_bobc_avialable",
    args: [address],
  });

  const { data: balance } = useReadContract({
    ...bobcContractConfig,
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <Card className="w-full">
      <CardHeader className="space-y-0">
        <CardDescription>Available to mint</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          {formatNumber(available! - balance!)}{" "}
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
