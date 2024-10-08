import { ConnectKitButton } from "connectkit";
import Icons from "./icons";
import localFont from "next/font/local";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const fiftiesFont = localFont({ src: "../lib/fonts/fifties.ttf" });

export default function NoWallet() {
  return (
    <div className="h-[calc(100vh-180px)] md:h-[calc(100vh-150px)] grid place-items-center">
      <Card className="text-center w-full h-full flex flex-col justify-center items-center">
        <CardHeader>
          <CardTitle>Please, connect your wallet</CardTitle>
          <CardDescription>
            Please connect your wallet to see your supplies, health factor, open
            positions and balance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center flex-row items-center space-x-2">
            <Icons.bs
              width={120}
              height={120}
              className="w-16 md:w-[120px] h-16 md:h-[120px]"
            />
            <span
              className={`${fiftiesFont.className} text-3xl sm:text-5xl text-lime-400 font-bold`}
            >
              BOBC
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-center items-center">
            <ConnectKitButton />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
