import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/icons";
import Loading from "@/components/loading";
import { useReadContract } from "wagmi";
import { formatNumber } from "@/lib/utils";
import { engineContractConfig } from "@/lib/contracts/engine.config";
import { ReadContractErrorType } from "viem";

export default function BOBCAvailable({ address }: { address: `0x${string}` }) {
  const {
    data: available,
    error,
    isPending,
  } = useReadContract({
    ...engineContractConfig,
    functionName: "get_bobc_available",
    args: [address],
  });

  if (isPending) {
    return (
      <Card className="w-full">
        <CardHeader className="space-y-0 flex flex-col justify-center">
          <CardDescription>
            <Loading />
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader className="space-y-0 flex flex-col justify-center text-center">
          <CardTitle>🚨 Error</CardTitle>
          <CardDescription>
            {(error as ReadContractErrorType).shortMessage || error.message}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

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
