import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MintTab from "@/components/tabs/mint-tab";
import BurnTab from "@/components/tabs/burn-tab";
import DepositTab from "@/components/tabs/deposit-tab";
import WithdrawTab from "@/components/tabs/withdraw-tab";

export default function Navtabs() {
  return (
    <Tabs defaultValue="deposit" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="deposit" className="font-bold">
          Deposit
        </TabsTrigger>
        <TabsTrigger value="withdraw" className="font-bold">
          Withdraw
        </TabsTrigger>
        <TabsTrigger value="mint" className="font-bold">
          Mint
        </TabsTrigger>
        <TabsTrigger value="burn" className="font-bold">
          Burn
        </TabsTrigger>
      </TabsList>

      <TabsContent value="deposit">
        <DepositTab />
      </TabsContent>
      <TabsContent value="withdraw">
        <WithdrawTab />
      </TabsContent>
      <TabsContent value="mint">
        <MintTab />
      </TabsContent>
      <TabsContent value="burn">
        <BurnTab />
      </TabsContent>
    </Tabs>
  );
}
