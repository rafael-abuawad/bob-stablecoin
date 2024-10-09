import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/icons";
import { useAccount } from "wagmi";
import BOBCBalance from "../cards/bobc-balance";
import { BurnForm } from "../forms/burn-form";

export default function BurnTab() {
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
      <BOBCBalance address={address} />
      <Card>
        <CardHeader>
          <CardTitle>Burn</CardTitle>
          <CardDescription>
            The amount of BOBC that your are going to burn.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <BurnForm address={address} />
        </CardContent>
      </Card>
    </div>
  );
}
