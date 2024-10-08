"use client";
import { Options } from "@/components/options";
import { ConnectKitButton } from "connectkit";

export default function Home() {
  return (
    <>
      <main className="container grid place-items-center mx-auto">
        <div className="w-full max-w-7xl">
          <ConnectKitButton />
          <Options />
        </div>
      </main>
    </>
  );
}
