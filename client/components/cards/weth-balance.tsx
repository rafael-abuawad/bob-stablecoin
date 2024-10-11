import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/loading";
import Icons from "@/components/icons";
import { useReadContract } from "wagmi";
import { formatNumber } from "@/lib/utils";
import { ReadContractErrorType } from "viem";
import { tokenContractConfig, wethAddress } from "@/lib/contracts/token.config";
import { SymbolIcon } from "@radix-ui/react-icons";

export default function WETHBalance({ address }: { address: `0x${string}` }) {
  const {
    data: balance,
    isPending,
    error,
    refetch,
  } = useReadContract({
    ...tokenContractConfig,
    address: wethAddress,
    functionName: "balanceOf",
    args: [address],
  });

  if (isPending) {
    return (
      <Card className="w-full">
        <CardHeader className="space-y-0 flex flex-col justify-center">
          <Loading />
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
        <CardDescription className="flex items-center">
          Balance
          <SymbolIcon
            onClick={() => refetch()}
            className="ml-1 w-3 h-3 text-muted-foreground hover:text-primary cursor-pointer"
          />
        </CardDescription>
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
