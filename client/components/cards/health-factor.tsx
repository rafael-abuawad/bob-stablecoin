"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useReadContract } from "wagmi";
import { engineContractConfig } from "@/lib/contracts/engine.config";
import { formatNumber } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function HealthFactor({ address }: { address: `0x${string}` }) {
  const { data: healthFactor } = useReadContract({
    ...engineContractConfig,
    functionName: "health_factor",
    args: [address],
  });
  const [isPerfect, setIsPerfect] = useState(false);

  useEffect(() => {
    if (
      healthFactor?.toString() ===
      "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    ) {
      setIsPerfect(true);
    }
  }, [healthFactor]);

  return (
    <Card className="w-full">
      <CardHeader className="space-y-0">
        <CardDescription>Health Factor</CardDescription>
        <CardTitle className="text-4xl tabular-nums text-green-500">
          {!isPerfect && formatNumber(healthFactor)}
          {isPerfect && "∞"}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
