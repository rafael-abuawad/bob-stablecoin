"use client";
import Footer from "@/components/footer";
import FaucetForm from "@/components/forms/faucet-form";
import Loading from "@/components/loading";
import NoWallet from "@/components/no-wallet";
import { Separator } from "@/components/ui/separator";
import { useAccount } from "wagmi";

export default function Faucet() {
  const { isConnected, address } = useAccount();

  if (!isConnected) {
    return (
      <>
        <main className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
          <div className="w-full grid gap-4 grid-cols-1 max-w-7xl">
            <NoWallet />
          </div>
        </main>
      </>
    );
  }

  if (!address) {
    return <Loading />;
  }

  return (
    <>
      <main className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
        <div className="w-full grid gap-3 grid-cols-1 max-w-7xl">
          <hgroup className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight">Faucet</h1>
            <h2 className="text-muted-foreground">
              To request funds, connect your wallet address, and hit “Send Me
              WETH”. Note this is fake WETH.
            </h2>
          </hgroup>

          <Separator />

          <div>
            <FaucetForm address={address} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
