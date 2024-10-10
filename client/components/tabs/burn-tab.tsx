import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAccount } from "wagmi";
import BOBCBalance from "@/components/cards/bobc-balance";
import BurnForm from "@/components/forms/burn-form";
import Loading from "@/components/loading";

export default function BurnTab() {
  const { address } = useAccount();

  if (!address) {
    return <Loading />;
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
