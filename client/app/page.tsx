"use client";
import AnnouncementBanner from "@/components/announcement-banner";
import BobcBalance from "@/components/bobc-balance";
import EthDeposited from "@/components/eth-deposited";
import Footer from "@/components/footer";
import HealthFactor from "@/components/health-factor";
import NavTabs from "@/components/nav-tabs";
import Navbar from "@/components/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
        <div className="w-full grid gap-4 grid-cols-1 max-w-7xl">
          <div>
            <div className="hidden w-full md:grid gap-4 grid-cols-3">
              <BobcBalance />
              <EthDeposited />
              <HealthFactor />
            </div>
            <div className="block md:hidden">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <span className="px-4">Stats</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="w-full grid gap-4 grid-rows-3">
                      <BobcBalance />
                      <EthDeposited />
                      <HealthFactor />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <NavTabs />
        </div>
      </main>

      <Footer />
    </>
  );
}
