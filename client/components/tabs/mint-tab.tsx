import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/icons";
import BOBCAvailable from "../cards/bobc-available";
import { useAccount } from "wagmi";
import { MintForm } from "../forms/mint-form";

export default function MintTab() {
  const { address } = useAccount();

  if (!address) {
    return (
      <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
        <Icons.spinner
          width={24}
          height={24}
          className="mr-2 h-4 w-4 animate-spin"
        />
        Loading...
      </div>
    );
  }

  return (
    <div className="grid gap-2 grid-cols-1">
      <BOBCAvailable address={address} />
      <Card>
        <CardHeader>
          <CardTitle>Mint</CardTitle>
          <CardDescription>
            This is the amount of BOBC that you are going to mint.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <MintForm address={address} />
        </CardContent>
      </Card>
    </div>
  );
}
