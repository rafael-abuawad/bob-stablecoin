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

  const getColor = (value: bigint | number | undefined) => {
    if (value === undefined) {
      value = 10000000000000000000000;
    }
    value = Number(value);
    if (value <= 1) {
      return `rgb(255, 38, 38)`;
    } else if (value >= 2) {
      return `rgb(22, 163, 74`;
    } else {
      const ratio = value - 1;
      const red = Math.round(255 * (1 - ratio));
      const green = Math.round(255 * ratio);
      return `rgb(${red}, ${green}, 60)`;
    }
  };

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
        <CardTitle
          className="text-4xl tabular-nums"
          style={{ color: getColor(healthFactor) }}
        >
          {!isPerfect && formatNumber(healthFactor)}
          {isPerfect && "∞"}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
