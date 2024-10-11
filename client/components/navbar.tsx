"use client";

import { ConnectKitButton } from "connectkit";
import { ModeToggle } from "./mode-toggle";
import localFont from "next/font/local";
import { Button } from "./ui/button";
import Link from "next/link";

const fiftiesFont = localFont({ src: "../lib/fonts/fifties.ttf" });

export default function Navbar() {
  return (
    <>
      <header className="flex flex-wrap  md:justify-start md:flex-nowrap z-50 w-full bg-neutral-800/5 dark:bg-neutral-800">
        <nav className="relative max-w-[85rem] w-full mx-auto flex items-center justify-between gap-3 py-2 px-4 sm:px-6 lg:px-8">
          <Link
            className={`${fiftiesFont.className} flex-none font-semibold text-3xl text-black focus:outline-none focus:opacity-80 dark:text-white`}
            href="/"
            aria-label="Brand"
          >
            <span className="text-xl">B$</span>
            BOBC
          </Link>

          <div className="grow">
            <div className="flex flex-row justify-end items-center space-x-2 gap-0.5 md:gap-1">
              <Button variant="link" asChild>
                <Link href="/faucet">WETH Faucet</Link>
              </Button>
              <ConnectKitButton />
              <ModeToggle />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
