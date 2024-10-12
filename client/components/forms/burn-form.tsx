"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { formatNumber } from "@/lib/utils";
import { bobcAddress, tokenContractConfig } from "@/lib/contracts/token.config";
import { formatUnits, parseUnits } from "viem";
import {
  engineAddress,
  engineContractConfig,
} from "@/lib/contracts/engine.config";
import { useEffect } from "react";
import Overlay from "../overlay";
import SeeItOnExplorer from "../see-it-on-explorer";

const FormSchema = z.object({
  amount: z.number(),
});

export default function BurnForm({ address }: { address: `0x${string}` }) {
  const { toast } = useToast();

  const { data, refetch } = useReadContracts({
    contracts: [
      {
        ...tokenContractConfig,
        address: bobcAddress,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...tokenContractConfig,
        address: bobcAddress,
        functionName: "allowance",
        args: [address, engineAddress],
      },
    ],
  });

  const [balance, allowance] = data || [];

  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
    },
  });

  function setMax(n: bigint | undefined) {
    form.setValue("amount", Number(formatUnits(n ?? BigInt(0), 18)));
  }

  function onSubmitAllowance(data: z.infer<typeof FormSchema>) {
    const amount = data.amount;
    writeContract({
      ...tokenContractConfig,
      address: bobcAddress,
      functionName: "approve",
      args: [engineAddress, parseUnits(String(amount), 18)],
    });
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const amount = data.amount;
    writeContract({
      ...engineContractConfig,
      functionName: "burn_bobc",
      args: [parseUnits(String(amount), 18)],
    });
    form.reset();
  }

  useEffect(() => {
    if (isConfirmed) {
      const url = `https://sepolia.basescan.org/tx/${hash}`;
      toast({
        title: "✅ Transaction confirmed",
        description: SeeItOnExplorer(url),
      });
      refetch();
    }
  }, [hash, isConfirmed, refetch, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: "🚨 Error",
        description: error.message,
      });
    }
  }, [error, toast]);

  if (allowance?.result?.toString() == "0") {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitAllowance)}
          className="w-2/3 space-y-6 relative p-2"
        >
          <FormField
            control={form.control}
            name="amount"
            render={({}) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step={0.01}
                    placeholder="0"
                    {...form.register("amount", { valueAsNumber: true })}
                  />
                </FormControl>
                {balance && balance.toString() !== "0" && (
                  <FormDescription>
                    <Button
                      type="button"
                      onClick={() => setMax(balance.result)}
                      className="p-0 text-xs"
                      variant="link"
                    >
                      Max. ({formatNumber(balance.result)} BOBC)
                    </Button>
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Confirming..." : "Approve"}
          </Button>

          {isConfirming && <Overlay text="Waiting for confirmation..." />}
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 relative p-2"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({}) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step={0.01}
                  placeholder="0"
                  {...form.register("amount", { valueAsNumber: true })}
                />
              </FormControl>
              {allowance && allowance.toString() !== "0" && (
                <FormDescription>
                  <Button
                    type="button"
                    onClick={() => setMax(allowance.result)}
                    className="p-0 text-xs"
                    variant="link"
                  >
                    Max. ({formatNumber(allowance.result)} BOBC)
                  </Button>
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Confirming..." : "Burn"}
        </Button>

        {isConfirming && <Overlay text="Waiting for confirmation..." />}
      </form>
    </Form>
  );
}
