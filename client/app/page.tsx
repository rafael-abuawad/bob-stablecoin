"use client";
import BOBCBalance from "@/components/cards/bobc-balance";
import HealthFactor from "@/components/cards/health-factor";
import WETHDeposited from "@/components/cards/weth-deposited";
import Footer from "@/components/footer";
import Icons from "@/components/icons";
import NavTabs from "@/components/nav-tabs";
import NoWallet from "@/components/no-wallet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useAccount } from "wagmi";

export default function Home() {
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
    <>
      <main className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
        <div className="w-full grid gap-6 grid-cols-1 max-w-7xl">
          <div>
            <div className="hidden w-full md:grid gap-2 grid-cols-3">
              <BOBCBalance address={address} />
              <WETHDeposited description="Collateral" address={address} />
              <HealthFactor address={address} />
            </div>
            <div className="block md:hidden">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <span className="px-4">Stats</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="w-full grid gap-4 grid-rows-3">
                      <BOBCBalance address={address} />
                      <WETHDeposited
                        description="Collateral"
                        address={address}
                      />
                      <HealthFactor address={address} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <Separator />
          <NavTabs />
        </div>
      </main>

      <Footer />
    </>
  );
}
