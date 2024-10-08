import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/icons";

export default function EthDeposited() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-0">
        <CardDescription>Collateral (ETH) </CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          12,584{" "}
          <div className={`flex flex-row space-x-2 items-center`}>
            <Icons.eth width={25} height={25} />
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              ETH
            </span>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
