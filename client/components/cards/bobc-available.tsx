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

export default function BOBCAvailable({ address }: { address: `0x${string}` }) {
  const { data: available } = useReadContract({
    ...engineContractConfig,
    functionName: "get_bobc_available",
    args: [address],
  });

  const getColor = (value: bigint | number) => {
    value = Number(value);
    if (value <= 1) {
      return `rgb(255, 0, 0)`;
    } else if (value >= 2) {
      return `rgb(0, 255, 0)`;
    } else {
      const ratio = value - 1;
      const red = Math.round(255 * (1 - ratio));
      const green = Math.round(255 * ratio);
      return `rgb(${red}, ${green}, 0)`;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-0">
        <CardDescription>Available to mint</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          {formatNumber(available)}{" "}
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
