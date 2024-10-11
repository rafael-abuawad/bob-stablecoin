import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/icons";
import Loading from "@/components/loading";
import { useBalance } from "wagmi";
import { formatNumber } from "@/lib/utils";
import { GetBalanceErrorType } from "viem";
import { SymbolIcon } from "@radix-ui/react-icons";

export default function ETHBalance({ address }: { address: `0x${string}` }) {
  const { data: balance, isPending, error, refetch } = useBalance({ address });

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
            {(error as GetBalanceErrorType).message}
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
          {formatNumber(balance?.value)}{" "}
          <div className="flex flex-row space-x-2 items-center">
            <Icons.eth width={25} height={25} />
            <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
              ETH
            </span>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
