import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatUnits } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value?: bigint): string {
  if (!value) {
    return "0";
  }
  const float = parseFloat(formatUnits(value, 18));
  return float.toFixed(2);
}
