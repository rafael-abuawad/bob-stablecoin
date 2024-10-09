import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "../icons";
import { useBalance } from "wagmi";
import { formatNumber } from "@/lib/utils";

export default function ETHBalance({ address }: { address: `0x${string}` }) {
  const { data: balance } = useBalance({ address });

  return (
    <Card className="w-full">
      <CardHeader className="space-y-0">
        <CardDescription>Balance</CardDescription>
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
