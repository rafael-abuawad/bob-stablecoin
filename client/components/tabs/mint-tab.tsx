import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BOBCAvailable from "@/components/cards/bobc-available";
import MintForm from "@/components/forms/mint-form";
import Loading from "@/components/loading";
import { useAccount } from "wagmi";

export default function MintTab() {
  const { address } = useAccount();

  if (!address) {
    return <Loading />;
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
